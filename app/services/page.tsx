import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { servicesData } from "@/data/servicesData";
import {
  ServicesSectionClient,
  ServiceLocationsSliderClient,
} from "@/components/services/ServicesClientWrapper";

const BUSINESS_NAME = "Nidhi Bird Service";
const SITE_URL = "https://nidhibirdservice.in";
const PHONE_NUMBER = "+918603237881";
const DISPLAY_PHONE = "+91 86032 37881";
const BUSINESS_EMAIL = "invisiblesafetygrillpatna@gmail.com";

export const metadata: Metadata = {
  title:
    "Invisible Grills, Safety Nets & Bird Protection Services | Nidhi Bird Service",

  description:
    "Nidhi Bird Service provides invisible grills, balcony safety nets, children's safety nets, pet protection nets, pigeon nets and bird protection solutions with professional installation in Gurugram, Delhi NCR and Noida.",

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  },

  alternates: {
    canonical: `${SITE_URL}/services/`,
  },

  keywords: [
    "invisible grills",
    "invisible grill installation",
    "invisible grills in Gurugram",
    "safety nets",
    "safety nets in Gurugram",
    "balcony safety nets",
    "balcony safety nets in Gurugram",
    "children safety nets",
    "child safety nets for balconies",
    "pet safety nets",
    "pigeon nets",
    "pigeon net installation",
    "bird nets",
    "bird protection systems",
    "bird protection nets",
    "bird control solutions",
    "window safety grills",
    "stainless steel invisible grills",
    "professional safety net installation",
    "balcony protection solutions",
    "pigeon control solutions",
    "invisible grills in Delhi NCR",
    "safety nets in Delhi NCR",
    "invisible grills in Noida",
    "safety nets in Noida",
    "Nidhi Bird Service",
  ],

  openGraph: {
    title:
      "Nidhi Bird Service | Invisible Grills, Safety Nets & Bird Protection",

    description:
      "Professional invisible grill installation, balcony safety nets, children's safety nets, pigeon nets and bird protection solutions across Gurugram, Delhi NCR and Noida.",

    url: `${SITE_URL}/services/`,

    siteName: BUSINESS_NAME,

    type: "website",

    images: [
      {
        url: "/images/service-gallery-2.jpg",
        width: 1200,
        height: 630,
        alt:
          "Nidhi Bird Service - Invisible Grills and Safety Nets",
      },
    ],

    locale: "en_IN",
  },
};

export default function ServicesPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: `${SITE_URL}/`,
    telephone: PHONE_NUMBER,
    email: BUSINESS_EMAIL,

    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_NUMBER,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },

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
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "Place",
        name: "Delhi NCR",
      },
      {
        "@type": "City",
        name: "Noida",
      },
    ],
  };

  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${BUSINESS_NAME} Services`,

    description:
      "Invisible grills, balcony safety nets, children's and pet protection nets, pigeon nets and bird protection solutions in Gurugram, Delhi NCR and Noida.",

    url: `${SITE_URL}/services/`,

    isPartOf: {
      "@type": "WebSite",
      name: BUSINESS_NAME,
      url: `${SITE_URL}/`,
    },

    mainEntity: {
      "@type": "ItemList",

      itemListElement: Object.entries(servicesData).map(
        ([slug, service], index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,

            url: `${SITE_URL}/services/${slug}/`,

            image: service.image,

            provider: {
              "@type": "Organization",
              name: BUSINESS_NAME,
              url: `${SITE_URL}/`,
              telephone: PHONE_NUMBER,
            },

            areaServed: [
              {
                "@type": "City",
                name: "Gurugram",
              },
              {
                "@type": "Place",
                name: "Delhi NCR",
              },
              {
                "@type": "City",
                name: "Noida",
              },
            ],
          },
        }),
      ),
    },
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      servicesPageSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema),
        }}
      />

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            {
              label: "Services",
            },
          ]}
          darkMode={false}
        />
      </div>

      <section
        className="container mx-auto px-4"
        aria-labelledby="services-heading"
      >
        <h1
          id="services-heading"
          className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl"
        >
          Invisible Grills, Safety Nets &amp; Bird Protection Services
        </h1>

        <p className="max-w-3xl text-muted-foreground">
          {BUSINESS_NAME} provides professional installation of
          invisible grills, balcony safety nets, children's and pet
          protection nets, pigeon nets and bird protection solutions
          across Gurugram, Delhi NCR and Noida.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
            aria-label={`Call ${BUSINESS_NAME} at ${DISPLAY_PHONE}`}
          >
            Call {DISPLAY_PHONE}
          </a>

          <a
            href={`https://wa.me/${PHONE_NUMBER.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-green-600 px-5 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
            aria-label={`Contact ${BUSINESS_NAME} on WhatsApp`}
          >
            WhatsApp Us
          </a>
        </div>
      </section>

      <ServicesSectionClient />

      <ServiceLocationsSliderClient />
    </>
  );
}
