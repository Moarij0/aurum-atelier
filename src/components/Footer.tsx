import { SITE, NAV_LINKS } from "@/constants/site";

/** Ch.4/9: an elegant ending, not information overload. */
export default function Footer() {
  return (
    <footer className="relative w-full border-t border-divider bg-bg py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <p className="font-serif text-small uppercase tracking-[0.35em] text-text">{SITE.shortName}</p>
            <p className="mt-3 font-serif text-small text-text-muted">
              {SITE.address.street}, {SITE.address.city}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-serif text-small uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href={`mailto:${SITE.email}`}
              className="font-serif text-small text-text-secondary transition-colors hover:text-gold"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="font-serif text-small text-text-secondary transition-colors hover:text-gold"
            >
              {SITE.phone}
            </a>
            <div className="flex gap-4">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-caption uppercase text-text-muted transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={SITE.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-caption uppercase text-text-muted transition-colors hover:text-gold"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <p className="mt-16 text-center font-serif text-caption normal-case tracking-normal text-text-muted">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
