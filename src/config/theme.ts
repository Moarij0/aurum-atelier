// Layout constants mirroring the container/spacing rules in globals.css (Ch.3).
export const LAYOUT = {
  containerMax: 1440,
  contentWidth: 1280,
  textMaxWidth: 620,
  gutter: 32,
  outerMargin: 80,
  sectionPaddingMin: 160,
  sectionPaddingMax: 240,
} as const;

export const RADIUS = {
  button: 14,
  card: 24,
  image: 24,
  modal: 28,
  nav: 20,
} as const;

export * from "./motion";
export * from "./breakpoints";
