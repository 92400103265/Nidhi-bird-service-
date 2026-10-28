import type { Metadata } from "next";
import GalleryClient from "@/components/gallery/GalleryClient";

/* =========================================================
   BUSINESS DETAILS
========================================================= */

const BUSINESS_NAME = "Nidhi Birds Service";
const WEBSITE_URL = "https://nidhibirdservice.in";
const PHONE = "+91 8603237881";
const PHONE_TEL = "tel:+918603237881";
const EMAIL = "mk7810209@gmail.com";
const EMAIL_LINK = "mailto:mk7810209@gmail.com";
const WHATSAPP_URL = "https://wa.me/918603237881";

// Existing address retained from your original code. Update it if this
// address does not belong to Nidhi Birds Service.
const ADDRESS =
  "Rajeev Chowk, near Jain Complex, Hans Enclave, Sector 33, Gurugram, Haryana 122004";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Installation Gallery | Nidhi Birds Service",
  description:
    "View bird net, pigeon net, safety net, invisible grill and balcony safety installations by Nidhi Birds Service in Gurugram, Delhi NCR and Noida.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  },
  alternates: {
    canonical: `${WEBSITE_URL}/gallery/`,
  },
  keywords: [
    "Nidhi Birds Service",
    "Nidhi Birds Service Gallery",
    "bird net installation gallery",
    "pigeon net installation photos",
    "bird net installation photos",
    "balcony safety net projects",
    "invisible grill gallery",
    "safety net gallery",
    "bird net installation",
    "pigeon net installation",
    "balcony safety net installation",
    "pigeon control",
    "bird protection solutions",
    "bird net Gurugram",
    "pigeon net Gurugram",
    "bird net Gurgaon",
    "safety net Gurugram",
    "bird net Delhi NCR",
    "bird net Noida",
    "completed bird net installation projects",
    "professional bird protection installation",
  ],
  openGraph: {
    title: "Installation Gallery | Nidhi Birds Service",
    description:
      "Browse bird net, pigeon net, safety net and balcony protection installations by Nidhi Birds Service.",
    url: `${WEBSITE_URL}/gallery/`,
    siteName: BUSINESS_NAME,
    type: "website",
    images: [
      {
        url: "/images/service-gallery-1.jpg",
        width: 1200,
        height: 630,
        alt: "Nidhi Birds Service Installation Gallery",
      },
    ],
  },
};

/* =========================================================
   GALLERY PAGE
========================================================= */

export default function GalleryPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: WEBSITE_URL,
    logo: `${WEBSITE_URL}/logo.png`,
    image: `${WEBSITE_URL}/images/service-gallery-1.jpg`,
    telephone: PHONE,
    email: EMAIL,
    description:
      "Nidhi Birds Service provides bird net, pigeon net, safety net, invisible grill and balcony safety solutions in Gurugram, Delhi NCR and Noida.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Rajeev Chowk, near Jain Complex, Hans Enclave, Sector 33",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122004",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Gurugram" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "City", name: "Noida" },
    ],
    serviceType: [
      "Bird Net Installation",
      "Pigeon Net Installation",
      "Safety Net Installation",
      "Invisible Grill Installation",
      "Balcony Safety Net Installation",
      "Pigeon Control",
      "Bird Protection Solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      email: EMAIL,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <>
      {/* Local Business structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Page header */}
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Bird Nets, Invisible Grills &amp; Safety Nets Gallery
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Explore our bird net, pigeon net, invisible grill and balcony
              safety installations across Gurugram, Delhi NCR and Noida.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="container mx-auto px-4 pb-12">
          <GalleryClient />
        </div>

        {/* Contact information */}
        <div className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-card p-6 text-center md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-card-foreground">
              Need Bird Nets or Balcony Safety Nets?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Contact {BUSINESS_NAME} for bird protection, pigeon net,
              invisible grill and safety net installation services.
            </p>

            <div className="space-y-3 text-sm text-card-foreground">
              <p>
                <strong>Business:</strong> {BUSINESS_NAME}
              </p>
              <p>
                <strong>Address:</strong> {ADDRESS}
              </p>
              <p>
                <strong>Mobile:</strong>{" "}
                <a href={PHONE_TEL} className="text-primary hover:underline">
                  {PHONE}
                </a>
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={EMAIL_LINK} className="text-primary hover:underline">
                  {EMAIL}
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={WEBSITE_URL}
                  className="text-primary hover:underline"
                >
                  {WEBSITE_URL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
