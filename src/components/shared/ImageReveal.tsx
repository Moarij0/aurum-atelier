"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/config/motion";
import { cn } from "@/lib/cn";
import PlaceholderSurface from "./PlaceholderSurface";

gsap.registerPlugin(ScrollTrigger);

/**
 * Client half of the image-reveal pair: mask reveal on scroll-in + soft
 * hover zoom (Ch.5 Image Reveal / Ch.9 Gallery Interaction). Receives an
 * already-resolved `src` from the server component RevealImage — this file
 * never touches the filesystem, so it stays client-safe.
 */
export default function ImageReveal({
  src,
  label,
  alt,
  className,
  rounded = true,
  cursorLabel,
  sizes = "100vw",
}: {
  src: string | null;
  label: string;
  alt: string;
  className?: string;
  rounded?: boolean;
  cursorLabel?: string;
  sizes?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(inner, {
        clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        scale: reduced ? 1 : 1.08,
      });
      if (reduced) return;
      gsap.to(inner, {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: DURATION.cinematic,
        ease: EASE.reveal,
        scrollTrigger: { trigger: wrapper, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("group relative overflow-hidden", rounded && "rounded-image", className)}
      data-cursor={cursorLabel ? "true" : undefined}
      data-cursor-label={cursorLabel}
    >
      <div
        ref={innerRef}
        className="h-full w-full transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.05]"
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <PlaceholderSurface label={label} />
        )}
      </div>
    </div>
  );
}
