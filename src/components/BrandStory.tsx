"use client";

import VideoPlayer from "./shared/VideoPlayer";
import SplitHeading from "./shared/SplitHeading";
import { Paragraph } from "./shared/Typography";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";
import { PARALLAX_SPEED } from "@/config/motion";
import type { VideoSources } from "@/lib/assets";

/**
 * Ch.4/9: text on one side, video on the other, video dominates visually.
 * Caption gets a masked rise, heading gets SplitText, paragraph a plain
 * fade, video a gentle continuous parallax drift.
 */
export default function BrandStory({ videoSources }: { videoSources: VideoSources }) {
  const captionRef = useReveal<HTMLParagraphElement>({ y: 16 });
  const paragraphRef = useReveal<HTMLParagraphElement>({ delay: 0.15 });
  const parallaxRef = useParallax<HTMLDivElement>(PARALLAX_SPEED.image);

  return (
    <section
      id="brand-story"
      className="relative flex w-full flex-col overflow-hidden bg-bg-secondary md:flex-row"
    >
      <div className="relative h-[70vh] w-full overflow-hidden md:h-[110vh] md:w-1/2">
        <div ref={parallaxRef} className="absolute inset-x-0 -top-[10%] h-[120%]">
          <VideoPlayer sources={videoSources} label="Brand Story Video" />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-8 py-24 md:w-1/2 md:px-20">
        <div className="reveal-mask">
          <p ref={captionRef} className="font-serif text-caption text-gold">
            Since the first chair
          </p>
        </div>

        <SplitHeading as="h2" size="heading" className="mt-8">
          Hair, treated like sculpture.
        </SplitHeading>

        <Paragraph ref={paragraphRef} className="mt-8">
          Aurum Atelier began as a single chair in Mayfair — a refusal to
          rush, to template, to treat a cut as a commodity. Twelve years
          later, the philosophy has not moved an inch.
        </Paragraph>
      </div>
    </section>
  );
}
