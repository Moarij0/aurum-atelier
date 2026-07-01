"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_TIMELINE, LOADED_EVENT } from "@/config/motion";

/** Navbar fades in once PageLoader signals completion (Ch.5: nav enters at t+0.5s). */
export function useNavbarFadeIn<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.set(el, { opacity: 0 });
    const play = () => {
      gsap.to(el, { opacity: 1, duration: 0.8, delay: HERO_TIMELINE.navIn, ease: "sine.out" });
    };
    window.addEventListener(LOADED_EVENT, play, { once: true });
    return () => window.removeEventListener(LOADED_EVENT, play);
  }, []);

  return ref;
}
