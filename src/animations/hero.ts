"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DURATION, EASE, HERO_TIMELINE, LOADED_EVENT, STAGGER } from "@/config/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Hero owns HERO_TIMELINE.* (relative to the LOADED_EVENT signal fired by
 * PageLoader) plus its own scroll-out parallax. One dedicated module per
 * Ch.6 — no GSAP code lives inside Hero.tsx itself.
 */
export function useHeroTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const primaryBtnRef = useRef<HTMLDivElement>(null);
  const secondaryBtnRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Entrance timeline, gated on the loader's completion signal.
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeEls = [
      captionRef.current,
      paragraphRef.current,
      primaryBtnRef.current,
      secondaryBtnRef.current,
    ].filter(Boolean) as HTMLElement[];

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;

    const play = () => {
      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set([videoWrapRef.current, ...fadeEls, scrollIndicatorRef.current], {
            opacity: 1,
            y: 0,
            scale: 1,
          });
          return;
        }

        if (headlineRef.current) {
          split = new SplitText(headlineRef.current, {
            type: "lines,chars",
            linesClass: "split-line",
            charsClass: "split-char",
          });
          gsap.set(split.chars, { yPercent: 110, opacity: 0, rotate: 2 });
        }

        gsap.set(videoWrapRef.current, { scale: 1.12, opacity: 0 });
        gsap.set(fadeEls, { opacity: 0, y: 16 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const tl = gsap.timeline();

        tl.to(
          videoWrapRef.current,
          { scale: 1, opacity: 1, duration: HERO_TIMELINE.videoDuration, ease: EASE.large },
          HERO_TIMELINE.videoIn
        ).to(
          captionRef.current,
          { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.reveal },
          HERO_TIMELINE.videoIn + 0.2
        );

        if (split) {
          tl.to(
            split.chars,
            { yPercent: 0, opacity: 1, rotate: 0, duration: 0.9, stagger: STAGGER.chars, ease: EASE.reveal },
            HERO_TIMELINE.headlineIn
          );
        }

        tl.to(
          paragraphRef.current,
          { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.reveal },
          HERO_TIMELINE.paragraphIn
        )
          .to(
            primaryBtnRef.current,
            { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.reveal },
            HERO_TIMELINE.primaryButtonIn
          )
          .to(
            secondaryBtnRef.current,
            { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.reveal },
            HERO_TIMELINE.secondaryButtonIn
          )
          .to(
            scrollIndicatorRef.current,
            { opacity: 1, duration: DURATION.slow, ease: EASE.opacity },
            HERO_TIMELINE.scrollIndicatorIn
          );

        const dot = scrollIndicatorRef.current?.querySelector("[data-scroll-dot]");
        if (dot) {
          gsap.to(dot, {
            y: 16,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
            delay: HERO_TIMELINE.scrollIndicatorIn + 0.3,
          });
        }
      });
    };

    window.addEventListener(LOADED_EVENT, play, { once: true });

    return () => {
      window.removeEventListener(LOADED_EVENT, play);
      ctx?.revert();
      split?.revert();
    };
  }, []);

  // Scroll-out parallax (Ch.8 Hero Scroll Animation) — independent of the entrance timeline.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      tl.to(videoWrapRef.current, { scale: 1.05, opacity: 0.85, ease: "none" }, 0)
        .to([headlineRef.current, captionRef.current], { yPercent: -22, ease: "none" }, 0)
        .to(paragraphRef.current, { yPercent: -14, ease: "none" }, 0)
        .to([primaryBtnRef.current, secondaryBtnRef.current], { opacity: 0.5, ease: "none" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    videoWrapRef,
    captionRef,
    headlineRef,
    paragraphRef,
    primaryBtnRef,
    secondaryBtnRef,
    scrollIndicatorRef,
  };
}
