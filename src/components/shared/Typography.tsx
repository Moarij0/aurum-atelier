import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
}

/** 72-110px, weight 700, fluid. The dominant element on any screen it appears in. */
export const DisplayHeading = forwardRef<HTMLHeadingElement, TextProps>(function DisplayHeading(
  { children, className },
  ref
) {
  return (
    <h1 ref={ref} className={cn("font-serif text-display text-balance text-text", className)}>
      {children}
    </h1>
  );
});

/** 56-72px, weight 700. */
export const Heading = forwardRef<HTMLHeadingElement, TextProps>(function Heading({ children, className }, ref) {
  return (
    <h2 ref={ref} className={cn("font-serif text-heading text-balance text-text", className)}>
      {children}
    </h2>
  );
});

/** 32-40px, weight 600. */
export const SubHeading = forwardRef<HTMLHeadingElement, TextProps>(function SubHeading({ children, className }, ref) {
  return (
    <h3 ref={ref} className={cn("font-serif text-subheading text-text", className)}>
      {children}
    </h3>
  );
});

/** 20-22px, weight 400, max-width 620px. */
export const BodyLarge = forwardRef<HTMLParagraphElement, TextProps>(function BodyLarge({ children, className }, ref) {
  return (
    <p ref={ref} className={cn("font-serif text-body-lg font-light text-text-secondary max-w-[620px]", className)}>
      {children}
    </p>
  );
});

/** 18px, weight 400, max-width 620px — the default paragraph. */
export const Paragraph = forwardRef<HTMLParagraphElement, TextProps>(function Paragraph({ children, className }, ref) {
  return (
    <p ref={ref} className={cn("font-serif text-body font-light text-text-secondary max-w-[620px]", className)}>
      {children}
    </p>
  );
});

/** 12px, weight 500, wide gold tracking — eyebrow labels. */
export const Caption = forwardRef<HTMLSpanElement, TextProps>(function Caption({ children, className }, ref) {
  return (
    <span ref={ref} className={cn("font-serif text-caption uppercase text-gold", className)}>
      {children}
    </span>
  );
});

/** Italic editorial statement — testimonials, philosophy lines. */
export const Quote = forwardRef<HTMLParagraphElement, TextProps>(function Quote({ children, className }, ref) {
  return (
    <p ref={ref} className={cn("font-serif text-subheading italic text-text", className)}>
      {children}
    </p>
  );
});
