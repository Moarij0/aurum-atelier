"use client";

import VideoPlayer from "./shared/VideoPlayer";
import SplitHeading from "./shared/SplitHeading";
import LinkButton from "./shared/LinkButton";
import AmbientOrbs from "./shared/AmbientOrbs";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";
import { SITE } from "@/constants/site";
import { PARALLAX_SPEED } from "@/config/motion";
import type { VideoSources } from "@/lib/assets";

/** Ch.4/9: minimal 100vh close — video, one headline, one sentence, one CTA. */
export default function Booking({ videoSources }: { videoSources: VideoSources }) {
  const paraRef = useReveal<HTMLParagraphElement>({ delay: 0.15 });
  const ctaRef = useReveal<HTMLDivElement>({ delay: 0.3 });
  const videoRef = useParallax<HTMLDivElement>(PARALLAX_SPEED.background);

  return (
    <section
      id="booking"
      className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden"
    >
      <div ref={videoRef} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <VideoPlayer sources={videoSources} label="Booking Video" />
      </div>
      <AmbientOrbs />

      <div className="relative z-10 max-w-2xl px-6 text-center">
        <SplitHeading as="h2" size="heading">
          Ready for your transformation?
        </SplitHeading>

        <p ref={paraRef} className="mt-6 font-serif text-body-lg font-light text-text-secondary">
          One consultation. A lifetime of better hair days.
        </p>

        <div ref={ctaRef} className="mt-10 inline-block">
          <LinkButton
            href={`mailto:${SITE.email}?subject=Booking%20Enquiry`}
            variant="primary"
            cursorLabel="BOOK"
          >
            Book Appointment
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
