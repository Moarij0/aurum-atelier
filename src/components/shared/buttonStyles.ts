export type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-gold text-bg hover:shadow-[0_0_32px_rgba(212,175,55,0.35)]",
  secondary: "border border-gold/50 text-gold hover:bg-gold hover:text-bg",
  ghost: "border border-white/15 text-text hover:border-gold/50 hover:text-gold",
};

export function buttonClasses(variant: ButtonVariant, className = "") {
  return `inline-flex min-h-[56px] items-center justify-center rounded-button px-9 font-serif text-small uppercase tracking-[0.25em] transition-colors duration-500 ease-luxury disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`;
}
