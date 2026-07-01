"use client";

import ImageReveal from "./shared/ImageReveal";
import SplitHeading from "./shared/SplitHeading";
import { Paragraph, Quote } from "./shared/Typography";
import LinkButton from "./shared/LinkButton";
import { useReveal } from "@/hooks/useReveal";
import { ARTIST } from "@/constants/site";

/** Ch.4/9: portrait dominates, biography stays concise — authority, not life story. */
export default function Artist({ portraitSrc }: { portraitSrc: string | null }) {
  const titleRef = useReveal<HTMLParagraphElement>({ y: 16 });
  const bioRef = useReveal<HTMLParagraphElement>({ delay: 0.15 });
  const philosophyRef = useReveal<HTMLParagraphElement>({ delay: 0.3 });
  const ctaRef = useReveal<HTMLDivElement>({ delay: 0.45 });

  return (
    <section id="artist" className="relative w-full bg-bg-secondary py-40 md:py-60">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:gap-24 lg:px-20">
        <ImageReveal
          src={portraitSrc}
          label="Artist Portrait"
          alt={ARTIST.name}
          className="aspect-[4/5] w-full"
          sizes="(min-width: 768px) 50vw, 100vw"
        />

        <div className="flex flex-col justify-center">
          <div className="reveal-mask">
            <p ref={titleRef} className="font-serif text-caption text-gold">
              {ARTIST.title}
            </p>
          </div>

          <SplitHeading as="h2" size="heading" className="mt-6">
            {ARTIST.name}
          </SplitHeading>

          <Paragraph ref={bioRef} className="mt-8">
            {ARTIST.bio}
          </Paragraph>

          <Quote ref={philosophyRef} className="mt-8 max-w-[480px]">
            &ldquo;{ARTIST.philosophy}&rdquo;
          </Quote>

          <div ref={ctaRef} className="mt-10">
            <LinkButton href="#booking" variant="secondary" cursorLabel="BOOK">
              Book With {ARTIST.name.split(" ")[0]}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
