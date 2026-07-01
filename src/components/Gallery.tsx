"use client";

import { useState } from "react";
import ImageReveal from "./shared/ImageReveal";
import Lightbox from "./Lightbox";
import SplitHeading from "./shared/SplitHeading";
import { GALLERY_ITEMS } from "@/constants/site";
import { cn } from "@/lib/cn";

const SIZE_CLASSES: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

/** Editorial masonry via mixed grid spans — no rigid uniform grid (Ch.4/9). */
export default function Gallery({
  imageMap,
}: {
  imageMap: Record<string, string | null>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative w-full bg-bg py-40 md:py-60">
      <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-20">
        <p className="font-serif text-caption text-gold">Transformations</p>
        <SplitHeading as="h2" size="heading" className="mt-6">
          Proof, not promises.
        </SplitHeading>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1440px] auto-rows-[220px] grid-cols-2 gap-4 px-6 md:auto-rows-[260px] md:grid-cols-4 md:gap-6 lg:px-20">
        {GALLERY_ITEMS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${item.caption}`}
            className={cn("relative block h-full w-full text-left", SIZE_CLASSES[item.size])}
          >
            <ImageReveal
              src={imageMap[item.id] ?? null}
              label={item.caption}
              alt={item.caption}
              className="h-full w-full"
              cursorLabel="VIEW"
            />
          </button>
        ))}
      </div>

      <Lightbox
        items={GALLERY_ITEMS}
        imageMap={imageMap}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
