"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/config/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Each service panel pins briefly while its own content settles, then the
 * next panel scrolls up to cover it (pinSpacing: false — the classic
 * stacked-panel overlap, Ch.4/9 "panels slightly overlap while scrolling").
 */
export function useServicePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "+=60%",
        pin: true,
        pinSpacing: false,
      });

      gsap.set(contentRef.current, { opacity: 0, y: 40 });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: { trigger: panel, start: "top 70%", toggleActions: "play none none reverse" },
      });

      gsap.to(videoRef.current, {
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, panel);

    return () => ctx.revert();
  }, []);

  return { panelRef, videoRef, contentRef };
}
