import { forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Premium glass surface — testimonials, floating elements, modals (Ch.3). */
const GlassCard = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  function GlassCard({ children, className }, ref) {
    return (
      <div ref={ref} className={cn("glass glow-card rounded-card p-8", className)}>
        {children}
      </div>
    );
  }
);

export default GlassCard;
