"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/hooks/useLenis";

/** Thin gold progress bar tracking total scroll — cheap, high-impact premium cue. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ progress }: { progress: number }) => {
      if (barRef.current) barRef.current.style.width = `${progress * 100}%`;
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] w-full">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-gold/50 via-gold to-gold/80"
      />
    </div>
  );
}
