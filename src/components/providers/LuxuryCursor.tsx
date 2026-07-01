"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE } from "@/config/motion";

/**
 * Global cursor: small gold dot + trailing ring, both lerped toward the
 * pointer for zero-lag smoothing. Any element in the tree can opt in via
 * `data-cursor` (ring expands) and optionally `data-cursor-label="VIEW"`
 * (ring fills solid, shows the label) — no per-button cursor logic needed.
 */
export default function LuxuryCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pointer };
    const ringPos = { ...pointer };

    gsap.set(dot, pointer);
    gsap.set(ring, pointer);

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      dotPos.x += (pointer.x - dotPos.x) * 0.35;
      dotPos.y += (pointer.y - dotPos.y) * 0.35;
      ringPos.x += (pointer.x - ringPos.x) * 0.16;
      ringPos.y += (pointer.y - ringPos.y) * 0.16;
      gsap.set(dot, { x: dotPos.x, y: dotPos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      const text = target.dataset.cursorLabel ?? "";

      gsap.to(ring, {
        width: text ? 88 : 60,
        height: text ? 88 : 60,
        borderColor: "rgba(212,175,55,0.9)",
        backgroundColor: text ? "rgba(212,175,55,0.95)" : "transparent",
        duration: 0.35,
        ease: EASE.default,
      });
      gsap.to(dot, { scale: text ? 0 : 1, duration: 0.25, ease: EASE.default });
      label.textContent = text;
      gsap.to(label, { opacity: text ? 1 : 0, duration: 0.2 });
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: "rgba(212,175,55,0.5)",
        backgroundColor: "transparent",
        duration: 0.35,
        ease: EASE.default,
      });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: EASE.default });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
