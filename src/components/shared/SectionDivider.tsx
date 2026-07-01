"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/config/motion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** A thin line that grows horizontally into view — used in Awards (Ch.4/9). */
export default function SectionDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: reduced ? 1 : 0 });
      if (reduced) return;
      gsap.to(el, {
        scaleX: 1,
        duration: DURATION.cinematic,
        ease: EASE.large,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, []);

  return <div ref={ref} className={cn("h-px w-full origin-left bg-divider", className)} />;
}
