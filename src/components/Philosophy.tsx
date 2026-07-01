"use client";

import VideoPlayer from "./shared/VideoPlayer";
import AmbientOrbs from "./shared/AmbientOrbs";
import { useReveal } from "@/hooks/useReveal";
import type { VideoSources } from "@/lib/assets";

/** Ch.4/9: full-bleed video, one large statement, one supporting line. Nothing else. */
export default function Philosophy({ videoSources }: { videoSources: VideoSources }) {
  const statementRef = useReveal<HTMLParagraphElement>({ y: 20 });
  const supportRef = useReveal<HTMLParagraphElement>({ delay: 0.2 });

  return (
    <section
      id="philosophy"
      className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden"
    >
      <VideoPlayer sources={videoSources} label="Philosophy Video" />
      <AmbientOrbs />

      <div className="relative z-10 max-w-2xl px-6 text-center">
        <div className="reveal-mask">
          <p ref={statementRef} className="font-serif text-heading italic text-text text-balance">
            Luxury begins before the first cut.
          </p>
        </div>
        <p ref={supportRef} className="mt-6 font-serif text-body-lg font-light text-text-secondary">
          Every detail, considered before you sit down.
        </p>
      </div>
    </section>
  );
}
