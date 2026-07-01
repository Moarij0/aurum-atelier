"use client";

import { useEffect, useRef, useState } from "react";
import PlaceholderSurface from "./PlaceholderSurface";

interface VideoSources {
  mp4: string | null;
  webm: string | null;
  poster: string | null;
}

export default function VideoPlayer({
  sources,
  label,
  className = "",
  overlay = true,
  priority = false,
}: {
  sources: VideoSources;
  label: string;
  className?: string;
  overlay?: boolean;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const hasSource = Boolean(sources.mp4 || sources.webm);

  // Pause off-screen video to protect performance (Ch.10 Video Optimization).
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasSource) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasSource]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {hasSource && !failed ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay={priority}
          preload={priority ? "auto" : "metadata"}
          poster={sources.poster ?? undefined}
          onError={() => setFailed(true)}
          aria-label={label}
        >
          {sources.webm && <source src={sources.webm} type="video/webm" />}
          {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
        </video>
      ) : (
        <PlaceholderSurface label={label} />
      )}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />
      )}
    </div>
  );
}
