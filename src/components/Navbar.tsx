"use client";

import { useEffect, useState } from "react";
import LinkButton from "./shared/LinkButton";
import { NAV_LINKS, SITE } from "@/constants/site";
import { cn } from "@/lib/cn";
import { useNavbarFadeIn } from "@/animations/navbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useNavbarFadeIn<HTMLElement>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn("glass-nav fixed left-0 right-0 top-0 z-50", scrolled && "is-scrolled")}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-[padding] duration-500 ease-luxury lg:px-20",
          scrolled ? "py-4" : "py-7"
        )}
      >
        <a
          href="#hero"
          data-cursor="true"
          className={cn(
            "origin-left font-serif text-small uppercase tracking-[0.35em] text-text transition-transform duration-500 ease-luxury",
            scrolled && "scale-90"
          )}
        >
          {SITE.shortName}
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="true"
                className="font-serif text-small uppercase tracking-[0.15em] text-text-secondary transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <LinkButton
            href="#booking"
            variant="secondary"
            cursorLabel="BOOK"
            className="min-h-0! px-6! py-2.5!"
          >
            Book Appointment
          </LinkButton>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className="h-px w-7 bg-text transition-transform duration-300"
            style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
          />
          <span className={cn("h-px w-7 bg-text transition-opacity duration-300", open && "opacity-0")} />
          <span
            className="h-px w-7 bg-text transition-transform duration-300"
            style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {open && (
        <div className="flex flex-col items-center gap-8 border-t border-divider bg-bg/98 px-6 py-10 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif text-small uppercase tracking-[0.15em] text-text-secondary hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <LinkButton href="#booking" variant="secondary" cursorLabel="BOOK" onClick={() => setOpen(false)}>
            Book Appointment
          </LinkButton>
        </div>
      )}
    </header>
  );
}
