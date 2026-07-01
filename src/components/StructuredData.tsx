import { SITE } from "@/constants/site";

/** JSON-LD HairSalon/LocalBusiness schema (Ch.10). Server component — static, no hooks. */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SITE.name,
    description: SITE.descriptor,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postcode,
      addressCountry: "GB",
    },
    sameAs: [SITE.social.instagram, SITE.social.pinterest],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
