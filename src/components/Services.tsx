"use client";

import { ArrowRight } from "lucide-react";
import { useServicePanel } from "@/animations/services";
import VideoPlayer from "./shared/VideoPlayer";
import LinkButton from "./shared/LinkButton";
import { SERVICES } from "@/constants/site";
import type { VideoSources } from "@/lib/assets";

function ServicePanel({
  index,
  name,
  description,
  videoSources,
}: {
  index: number;
  name: string;
  description: string;
  videoSources: VideoSources;
}) {
  const { panelRef, videoRef, contentRef } = useServicePanel();

  return (
    <div
      ref={panelRef}
      style={{ zIndex: index + 1 }}
      className="relative flex h-[90vh] w-full items-end overflow-hidden bg-bg"
    >
      <div ref={videoRef} className="absolute inset-0">
        <VideoPlayer sources={videoSources} label={`${name} Video`} />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-8 pb-20 md:px-20">
        <span className="font-serif text-caption text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-4 font-serif text-heading italic text-text">{name}</h3>
        <p className="mt-4 max-w-md font-serif text-body font-light text-text-secondary">
          {description}
        </p>
        <LinkButton href="#booking" variant="ghost" cursorLabel="BOOK" className="mt-8">
          <span className="flex items-center gap-2">
            Explore <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </LinkButton>
      </div>
    </div>
  );
}

export default function Services({
  videoSourcesMap,
}: {
  videoSourcesMap: Record<string, VideoSources>;
}) {
  return (
    <section id="services" className="relative w-full">
      {SERVICES.map((service, i) => (
        <ServicePanel
          key={service.id}
          index={i}
          name={service.name}
          description={service.description}
          videoSources={videoSourcesMap[service.video]}
        />
      ))}
    </section>
  );
}
