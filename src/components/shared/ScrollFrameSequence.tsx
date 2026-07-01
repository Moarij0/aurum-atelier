"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import PlaceholderSurface from "./PlaceholderSurface";

/**
 * Scroll-scrubbed image-sequence canvas — the technique behind a true
 * "cinematic, one continuous shot" hero, as opposed to a looping <video>.
 * Frame index is driven directly by scroll position (via Lenis if present,
 * else native scrollY), not by a timer, so it always feels tied to the
 * visitor's own scroll speed.
 *
 * Drop frame_0001.webp..frame_NNNN.webp into /public/frames/{name}/ and
 * this activates automatically — no code changes needed. Until then it
 * renders the standard labeled placeholder so layout never shifts.
 */
export default function ScrollFrameSequence({
  frames,
  label,
  className = "",
}: {
  frames: string[];
  label: string;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (frames.length === 0) return;

    let cancelled = false;

    async function preload() {
      const loaded = await Promise.all(
        frames.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                (img.decode ? img.decode() : Promise.resolve()).finally(() => resolve(img));
              };
              img.onerror = () => resolve(img);
            })
        )
      );
      if (!cancelled) {
        imagesRef.current = loaded;
        setReady(true);
      }
    }

    preload();
    return () => {
      cancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let drawnFrame = -1;

    const resize = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawnFrame = -1;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (idx: number) => {
      idx = Math.max(0, Math.min(imagesRef.current.length - 1, idx));
      if (idx === drawnFrame) return;
      drawnFrame = idx;
      const img = imagesRef.current[idx];
      if (!img?.naturalWidth) return;

      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    const tick = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = rect.height + window.innerHeight;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / scrollableDistance));
      drawFrame(Math.round(progress * (imagesRef.current.length - 1)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [ready, lenis]);

  if (frames.length === 0) {
    return <PlaceholderSurface label={label} className={className} />;
  }

  return (
    <div ref={wrapperRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-label={label} />
    </div>
  );
}
