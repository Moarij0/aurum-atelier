import { cn } from "@/lib/cn";

const BG_CLASSES = {
  bg: "bg-bg",
  "bg-secondary": "bg-bg-secondary",
} as const;

/**
 * Standard content-section wrapper: background + generous vertical rhythm
 * (Ch.3: 160-240px section padding). Full-bleed 100vh scenes (Hero,
 * Philosophy, Booking) build their own <section> instead — they don't
 * share this padding model.
 */
export default function Section({
  id,
  children,
  className,
  bg = "bg",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: keyof typeof BG_CLASSES;
}) {
  return (
    <section id={id} className={cn("relative w-full py-40 md:py-60", BG_CLASSES[bg], className)}>
      {children}
    </section>
  );
}
