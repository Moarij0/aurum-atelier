"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOADER, LOADED_EVENT } from "@/config/motion";
import { useLenis } from "@/hooks/useLenis";
import { SITE } from "@/constants/site";

/**
 * Owns t=0.0s -> LOADER.total of the load choreography (Ch.5): black screen,
 * logo fade-in, thin gold loading line, then fade out. Locks scroll for the
 * duration. On completion it fires window event LOADED_EVENT once — Hero
 * (and nothing else) listens for that to start its own reveal timeline,
 * keeping the two components' animations independently owned but in sync.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  // Lenis becomes available asynchronously (a tick after this component
  // mounts) — track it via ref so the one-shot timeline below doesn't
  // restart when the value changes.
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useLayoutEffect(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const release = () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
      // Pinned/scrubbed sections only settle once the page is actually
      // scrollable — measuring them earlier (while scroll is locked) can
      // mismeasure pin boundaries and cause a corrective scroll jump.
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event(LOADED_EVENT));
      setVisible(false);
    };

    if (reduced) {
      release();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: release });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "sine.out" },
          LOADER.logoIn
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: LOADER.lineDuration, ease: "power2.inOut" },
          LOADER.lineIn
        )
        .to(
          rootRef.current,
          { autoAlpha: 0, duration: LOADER.fadeOutDuration, ease: "sine.out" },
          LOADER.fadeOutAt
        );
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-bg"
      aria-hidden="true"
    >
      <div ref={logoRef} className="font-serif text-caption uppercase tracking-[0.4em] text-text opacity-0">
        {SITE.shortName}
      </div>
      <div className="h-px w-24 overflow-hidden bg-white/10">
        <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
      </div>
    </div>
  );
}
