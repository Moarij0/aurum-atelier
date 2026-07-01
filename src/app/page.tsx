import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Artist from "@/components/Artist";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import { resolveVideoSources, resolveImage } from "@/lib/assets";
import { SERVICES, GALLERY_ITEMS, ARTIST } from "@/constants/site";

// Server Component: the only place that touches the filesystem. Every
// section below is a Client Component (GSAP needs the DOM), so asset
// resolution happens here and gets passed down as plain props.
export default function Home() {
  const heroVideo = resolveVideoSources("hero");
  const brandStoryVideo = resolveVideoSources("brand-story");
  const philosophyVideo = resolveVideoSources("philosophy");
  const bookingVideo = resolveVideoSources("booking");

  const serviceVideos = Object.fromEntries(
    SERVICES.map((s) => [s.video, resolveVideoSources(s.video)])
  );

  const galleryImages = Object.fromEntries(
    GALLERY_ITEMS.map((item) => [item.id, resolveImage(item.id)])
  );

  const artistPortrait = resolveImage(ARTIST.portrait);

  return (
    <>
      <Navbar />
      <main className="bg-bg">
        <Hero videoSources={heroVideo} />
        <BrandStory videoSources={brandStoryVideo} />
        <Philosophy videoSources={philosophyVideo} />
        <Services videoSourcesMap={serviceVideos} />
        <Gallery imageMap={galleryImages} />
        <Artist portraitSrc={artistPortrait} />
        <Awards />
        <Testimonials />
        <Booking videoSources={bookingVideo} />
      </main>
      <Footer />
    </>
  );
}
