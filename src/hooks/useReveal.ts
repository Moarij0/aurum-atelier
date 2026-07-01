"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/config/motion";

gsap.registerPlugin(ScrollTrigger);

interface UseRevealOptions {
  delay?: number;
  y?: number;
  start?: string;
  once?: boolean;
}

/**
 * Scroll-triggered fade/rise, the default reveal for headings, paragraphs
 * and generic elements (Ch.5 Section Entry: hidden -> fade -> settle).
 * Wrap the ref'd element in a parent with class "reveal-mask" for a masked
 * (overflow-hidden) variant — the motion is identical either way.
 */
export function useReveal<T extends HTMLElement>({
  delay = 0,
  y = 32,
  start = "top 85%",
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        delay,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
