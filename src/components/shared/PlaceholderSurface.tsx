// Shared "no asset yet" visual — an elegant dark gradient panel with a
// small labeled tag, so an empty section still reads as intentional and
// premium rather than broken. Used by VideoPlayer and ImagePlaceholder.

export default function PlaceholderSurface({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#161616_0%,#0a0a0a_55%,#050505_100%)] ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:48px_48px]" />

      <span className="absolute left-5 top-5 h-3 w-3 border-l border-t border-gold/30" />
      <span className="absolute bottom-5 right-5 h-3 w-3 border-b border-r border-gold/30" />

      <span className="relative rounded-full border border-gold/20 bg-white/[0.02] px-5 py-2 font-serif text-caption uppercase text-gold/70">
        {label}
      </span>
    </div>
  );
}
