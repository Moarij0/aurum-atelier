"use client";

import { ArrowRight } from "lucide-react";
import { useHeroTimeline } from "@/animations/hero";
import VideoPlayer from "./shared/VideoPlayer";
import ScrollFrameSequence from "./shared/ScrollFrameSequence";
import LinkButton from "./shared/LinkButton";
import AmbientOrbs from "./shared/AmbientOrbs";
import { SITE } from "@/constants/site";
import type { VideoSources } from "@/lib/assets";

export default function Hero({
  videoSources,
  frames,
}: {
  videoSources: VideoSources;
  frames: string[];
}) {
  const {
    sectionRef,
    videoWrapRef,
    captionRef,
    headlineRef,
    paragraphRef,
    primaryBtnRef,
    secondaryBtnRef,
    scrollIndicatorRef,
  } = useHeroTimeline();

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <div ref={videoWrapRef} className="absolute inset-0">
        {frames.length > 0 ? (
          <ScrollFrameSequence frames={frames} label="Hero Video" />
        ) : (
          <VideoPlayer sources={videoSources} label="Hero Video" priority />
        )}
      </div>

      <AmbientOrbs />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p ref={captionRef} className="mb-6 font-serif text-caption text-gold">
          {SITE.tagline}
        </p>

        <h1
          ref={headlineRef}
          className="font-serif text-display italic leading-none text-text"
        >
          {SITE.name}
        </h1>

        <p
          ref={paragraphRef}
          className="mt-8 max-w-[520px] font-serif text-body-lg font-light text-text-secondary"
        >
          Precision cut. Cinematic colour. An intimate atelier experience for
          those who consider hair an art form.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <div ref={primaryBtnRef}>
            <LinkButton href="#booking" variant="primary" cursorLabel="BOOK">
              Book Appointment
            </LinkButton>
          </div>
          <div ref={secondaryBtnRef}>
            <LinkButton href="#gallery" variant="secondary" cursorLabel="VIEW">
              <span className="flex items-center gap-2">
                Explore Gallery
                <ArrowRight size={14} strokeWidth={1.5} />
              </span>
            </LinkButton>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-serif text-caption text-text-muted">Scroll</span>
        <div className="relative h-14 w-px overflow-hidden bg-white/15">
          <span data-scroll-dot className="absolute left-0 top-0 h-1/2 w-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
