"use client";

import SplitHeading from "./shared/SplitHeading";
import SectionDivider from "./shared/SectionDivider";
import { useCountUp } from "@/hooks/useCountUp";
import { AWARDS } from "@/constants/site";

function AwardStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="font-serif text-heading italic text-gold">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="font-serif text-small uppercase tracking-[0.15em] text-text-secondary">{label}</p>
    </div>
  );
}

/** Ch.4/9: one statement, one divider, 3-5 achievements. Quality over quantity. */
export default function Awards() {
  return (
    <section id="awards" className="relative w-full bg-bg py-40 md:py-60">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SplitHeading as="h2" size="heading">
          Recognised, quietly, by those who matter.
        </SplitHeading>

        <SectionDivider className="mx-auto mt-16 max-w-xs" />

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {AWARDS.map((award) => (
            <AwardStat key={award.label} {...award} />
          ))}
        </div>
      </div>
    </section>
  );
}
