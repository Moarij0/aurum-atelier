"use client";

import GlassCard from "./shared/GlassCard";
import SplitHeading from "./shared/SplitHeading";
import { useReveal } from "@/hooks/useReveal";
import { TESTIMONIALS } from "@/constants/site";
import { cn } from "@/lib/cn";

function TestimonialCard({
  quote,
  name,
  service,
  featured,
  delay,
}: {
  quote: string;
  name: string;
  service: string;
  featured: boolean;
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>({ delay, y: 40 });

  return (
    <GlassCard
      ref={ref}
      className={cn(
        "flex h-full flex-col justify-between transition-transform duration-500 ease-luxury hover:-translate-y-2",
        featured && "md:row-span-2"
      )}
    >
      <p className="font-serif text-subheading italic text-text text-balance">&ldquo;{quote}&rdquo;</p>
      <div className="mt-10">
        <p className="font-serif text-caption text-gold">{name}</p>
        <p className="mt-1 font-serif text-small text-text-muted">{service}</p>
      </div>
    </GlassCard>
  );
}

/** Ch.4/9: large glass cards, one featured + two supporting, sequential reveal. */
export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-bg-secondary py-40 md:py-60">
      <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-20">
        <p className="font-serif text-caption text-gold">Words From Our Guests</p>
        <SplitHeading as="h2" size="heading" className="mt-6">
          Trust, spoken plainly.
        </SplitHeading>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1440px] gap-6 px-6 md:grid-cols-3 lg:px-20">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.id} {...t} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
