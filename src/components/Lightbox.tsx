"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderSurface from "./shared/PlaceholderSurface";

interface LightboxItem {
  id: string;
  caption: string;
}

/** Fullscreen gallery viewer — keyboard, swipe, and click-out to close (Ch.4/9). */
export default function Lightbox({
  items,
  imageMap,
  openIndex,
  onClose,
  onNavigate,
}: {
  items: readonly LightboxItem[];
  imageMap: Record<string, string | null>;
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = openIndex !== null;
  const [entered, setEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = () => openIndex !== null && onNavigate((openIndex + 1) % items.length);
  const prev = () => openIndex !== null && onNavigate((openIndex - 1 + items.length) % items.length);

  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setEntered(true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex]);

  if (!isOpen) return null;

  const current = items[openIndex];
  const src = imageMap[current.id] ?? null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <div
      className={`fixed inset-0 z-[900] flex items-center justify-center bg-black/92 p-6 backdrop-blur-md transition-opacity duration-300 ease-luxury ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        data-cursor="true"
        className="absolute right-6 top-6 z-10 text-text-secondary transition-colors hover:text-gold"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        data-cursor="true"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-secondary transition-colors hover:text-gold md:left-10"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>

      <div
        className={`relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-image transition-transform duration-300 ease-luxury ${
          entered ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {src ? (
          <Image src={src} alt={current.caption} fill sizes="80vw" className="object-contain" />
        ) : (
          <PlaceholderSurface label={current.caption} />
        )}
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        data-cursor="true"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-text-secondary transition-colors hover:text-gold md:right-10"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif text-caption text-text-secondary">
        {current.caption}
      </p>
    </div>
  );
}
