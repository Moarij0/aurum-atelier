"use client";

import { useSplitReveal } from "@/hooks/useSplitText";
import { cn } from "@/lib/cn";

const SIZE_CLASSES = {
  display: "text-display",
  heading: "text-heading",
  subheading: "text-subheading",
} as const;

/** Character-by-character reveal heading (Ch.5 Heading Animation). */
export default function SplitHeading({
  children,
  as: Tag = "h2",
  size = "heading",
  className,
  delay = 0,
  trigger = "scroll",
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
  delay?: number;
  trigger?: "scroll" | "immediate";
}) {
  const ref = useSplitReveal<HTMLHeadingElement>({ delay, trigger });

  return (
    <Tag ref={ref} className={cn("font-serif text-balance text-text", SIZE_CLASSES[size], className)}>
      {children}
    </Tag>
  );
}
