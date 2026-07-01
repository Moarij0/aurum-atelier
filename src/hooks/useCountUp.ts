"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/config/motion";

gsap.registerPlugin(ScrollTrigger);

/** Animates a number from 0 to `target` when scrolled into view (Ch.9 Awards). */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.textContent = String(target);
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration: DURATION.cinematic,
        ease: EASE.large,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.value));
        },
      });
    });

    return () => ctx.revert();
  }, [target]);

  return ref;
}
