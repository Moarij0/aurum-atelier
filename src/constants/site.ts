// Single source of truth for brand identity and content.
// Rename the salon by editing this file only — no other file hardcodes the brand name.

export const SITE = {
  name: "Aurum Atelier",
  shortName: "Aurum",
  tagline: "London's Most Coveted Hair Atelier",
  descriptor: "Luxury Hair Artistry",
  url: "https://aurumatelier.com",
  locale: "en_GB",
  email: "atelier@aurumatelier.com",
  phone: "+44 20 7946 0891",
  address: {
    street: "14 Mount Street",
    city: "Mayfair, London",
    postcode: "W1K 3NF",
    country: "United Kingdom",
  },
  social: {
    instagram: "https://instagram.com/aurumatelier",
    pinterest: "https://pinterest.com/aurumatelier",
  },
} as const;

export const NAV_LINKS = [
  { label: "Atelier", href: "#brand-story" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Artist", href: "#artist" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

export const SERVICES = [
  {
    id: "luxury-haircut",
    name: "Luxury Haircut",
    description:
      "Precision cutting shaped to your face, your movement, your life.",
    video: "service-haircut",
  },
  {
    id: "signature-colour",
    name: "Signature Colour",
    description:
      "Dimensional colour built in layers, never a single flat tone.",
    video: "service-colour",
  },
  {
    id: "balayage",
    name: "Balayage",
    description: "Hand-painted light, mapped to catch every movement.",
    video: "service-balayage",
  },
  {
    id: "bridal-styling",
    name: "Bridal Styling",
    description: "One morning, rehearsed in private, perfected in silence.",
    video: "service-bridal",
  },
  {
    id: "hair-extensions",
    name: "Hair Extensions",
    description: "Length and density that moves as if it were your own.",
    video: "service-extensions",
  },
  {
    id: "luxury-consultation",
    name: "Luxury Consultation",
    description: "An hour of listening before a single tool is lifted.",
    video: "service-consultation",
  },
] as const;

export const GALLERY_ITEMS = [
  { id: "gallery-01", caption: "Editorial Blonde", size: "tall" },
  { id: "gallery-02", caption: "Sculpted Bob", size: "wide" },
  { id: "gallery-03", caption: "Liquid Brunette", size: "square" },
  { id: "gallery-04", caption: "Undone Waves", size: "square" },
  { id: "gallery-05", caption: "Bridal Chignon", size: "tall" },
  { id: "gallery-06", caption: "Copper Balayage", size: "wide" },
  { id: "gallery-07", caption: "Glass Hair", size: "square" },
  { id: "gallery-08", caption: "Structured Fringe", size: "tall" },
] as const;

export const AWARDS = [
  { value: 12, suffix: "", label: "Years of Craft" },
  { value: 3, suffix: "", label: "British Hairdressing Awards" },
  { value: 40, suffix: "+", label: "Editorial Placements" },
] as const;

export const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "The most cinematic hour of my week. I walk in a client and leave feeling like the subject of a campaign.",
    name: "Camille R.",
    service: "Signature Colour",
    featured: true,
  },
  {
    id: "t2",
    quote:
      "Precision I have never experienced elsewhere. Every detail — the lighting, the pacing — is intentional.",
    name: "Adrienne L.",
    service: "Luxury Haircut",
    featured: false,
  },
  {
    id: "t3",
    quote:
      "It doesn't feel like a salon. It feels like stepping into a quiet, beautiful film.",
    name: "Yara M.",
    service: "Balayage",
    featured: false,
  },
] as const;

export const ARTIST = {
  name: "Isabelle Voss",
  title: "Founder & Master Colourist",
  bio: "Trained in Paris, refined in London. Isabelle's chair is booked eight weeks deep by editors, actresses and brides who want one thing: hair that photographs as beautifully as it feels.",
  philosophy:
    "Precision is not a style. It is the discipline that makes every style possible.",
  portrait: "artist-portrait",
} as const;
