"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, STAGGER } from "@/config/motion";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface UseSplitRevealOptions {
  delay?: number;
  /** "scroll" reveals when the element enters the viewport; "immediate" plays on mount (Hero). */
  trigger?: "scroll" | "immediate";
  start?: string;
}

/**
 * Character-by-character SplitText reveal for headlines (Ch.5 Heading Animation).
 * The target element needs `overflow-hidden` ancestry per line — SplitText's
 * `linesClass` handles that automatically via the `.split-line` CSS rule.
 */
export function useSplitReveal<T extends HTMLElement>({
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
}: UseSplitRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "lines,chars",
        linesClass: "split-line",
        charsClass: "split-char",
      });

      gsap.set(split.chars, { yPercent: 110, opacity: 0, rotate: 2 });

      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.9,
        delay,
        stagger: STAGGER.chars,
        ease: EASE.reveal,
        ...(trigger === "scroll"
          ? {
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
              },
            }
          : {}),
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
