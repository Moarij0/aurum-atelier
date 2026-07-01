// Mirrors --breakpoint-* in globals.css. Used by useMediaQuery / useWindowSize
// for JS-side responsive logic (GSAP matchMedia, ScrollTrigger recalculation).

export const BREAKPOINTS = {
  xs: 390,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
  "3xl": 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
