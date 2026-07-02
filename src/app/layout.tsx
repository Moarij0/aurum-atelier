import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LuxuryCursor from "@/components/providers/LuxuryCursor";
import ScrollProgress from "@/components/providers/ScrollProgress";
import CopyProtection from "@/components/providers/CopyProtection";
import PageLoader from "@/components/PageLoader";
import StructuredData from "@/components/StructuredData";
import { SITE } from "@/constants/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
  display: "swap",
});

const description =
  "A private hair atelier in Mayfair, London. Precision cutting, dimensional colour and bridal styling for clients who consider hair an art form.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description,
  keywords: ["luxury hair salon London", "Mayfair hairdresser", "balayage London", "bridal hair styling"],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} h-full`}>
      <body className="min-h-full antialiased">
        <StructuredData />
        <CopyProtection />
        <SmoothScrollProvider>
          <PageLoader />
          <LuxuryCursor />
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
