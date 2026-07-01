// GSAP-side motion tokens mirroring the CSS --ease-* / duration scale in globals.css.
// Never hardcode a duration or ease string in a component or animation module — import from here.

export const DURATION = {
  extraFast: 0.2,
  fast: 0.4,
  medium: 0.8,
  slow: 1.2,
  cinematic: 2.2,
  scene: 3.2,
} as const;

export const EASE = {
  default: "power3.out",
  reveal: "power4.out",
  section: "expo.out",
  large: "power2.inOut",
  opacity: "sine.out",
} as const;

export const STAGGER = {
  chars: 0.018,
  words: 0.05,
  rows: 0.12,
  cards: 0.15,
} as const;

// Page load choreography (Ch.5/8), split across the two components that own it:
// PageLoader owns 0.0s -> LOADER.total (black screen, logo, loading line, fade out).
// Hero starts its own timeline the instant PageLoader signals "app:loaded" — all
// HERO_TIMELINE offsets below are relative to that signal, not absolute page time.
export const LOADER = {
  logoIn: 0.5,
  lineIn: 1.0,
  lineDuration: 0.5,
  fadeOutAt: 1.5,
  fadeOutDuration: 0.4,
  total: 1.9,
} as const;

export const HERO_TIMELINE = {
  videoIn: 0,
  videoDuration: 2.2,
  navIn: 0.5,
  headlineIn: 0.8,
  paragraphIn: 1.3,
  primaryButtonIn: 1.7,
  secondaryButtonIn: 1.9,
  scrollIndicatorIn: 2.0,
} as const;

export const LOADED_EVENT = "aurum:loaded";

export const PARALLAX_SPEED = {
  foreground: 0.35,
  typography: 0.2,
  image: 0.12,
  background: 0.05,
} as const;
