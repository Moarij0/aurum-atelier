"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className,
  cursorLabel,
  disabled,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  cursorLabel?: string;
  disabled?: boolean;
}) {
  const ref = useMagnetic<HTMLButtonElement>(0.25);

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="true"
      data-cursor-label={cursorLabel}
      className={buttonClasses(variant, className)}
    >
      {children}
    </button>
  );
}
