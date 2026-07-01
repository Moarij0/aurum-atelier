"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

export default function LinkButton({
  children,
  href,
  variant = "primary",
  className,
  cursorLabel,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  cursorLabel?: string;
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      data-cursor="true"
      data-cursor-label={cursorLabel}
      className={buttonClasses(variant, className)}
    >
      {children}
    </a>
  );
}
