import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";

import LocationHero from "@/components/location/LocationHero";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import LocationAboutClient from "@/components/about/LocationAboutClient";

import { PRIMARY_LOCATIONS } from "@/lib/seo-metadata";

/* =========================================================
   BUSINESS DETAILS
========================================================= */

const BUSINESS_NAME = "Nidhi Bird Service";
const BUSINESS_PHONE = "+91 86032 37881";
const BUSINESS_EMAIL = "mk7810209@gmail.com";
const BASE_URL = "https://www.nidhibirdservice.in";

/*
 * Use the real business address here if you have a verified
 * business location. Do not use a service-area city as an
 * office address unless it is your actual address.
 */
const BUSINESS_ADDRESS = "Sohna, Haryana, India";

/* =========================================================
   LOCATION TYPES
========================================================= */

type LocationInfo = {
  name: string;
  state: string;
  areas: string[];
  latitude: number;
  longitude: number;
};

type PageParams = {
  params: Promise<{
    location: string;
  }>;
};

/* =========================================================
   LOCATION CONTENT
   Defined locally to avoid the missing-export error.
========================================================= */

function generateLocationContent(
  serviceName: string,
  location: string,
) {
  return {
    heading: `${serviceName} in ${location}`,
    description:
      `Nidhi Bird Service provides ${serviceName.toLowerCase()} ` +
      `in ${location} and nearby areas. Contact our team to discuss ` +
      "your property, installation requirements, and service availability.",
  };
}

/* =========================================================
   EXTRA LOCATION
========================================================= */

const SOHNA_LOCATION: LocationInfo = {
  name: "Sohna",
  state: "Haryana",
  areas: [
    "Sohna",
    "South Gurugram",
    "Bhondsi",
    "Damdama",
    "Badshahpur",
  ],
  latitude: 28.247,
  longitude: 77.065,
};

/* =========================================================
   LOCATION HELPERS
========================================================= */

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function getLocationBySlug(
  slug: string,
): LocationInfo | undefined {
  const locations = PRIMARY_LOCATIONS as LocationInfo[];

  const matched = locations.find((location) => {
    return normalizeSlug(location.name) === slug;
  });

  if (matched) {
    return matched;
  }

  if (slug === "sohna" || slug === "sohna-haryana") {
    return SOHNA_LOCATION;
  }

  return undefined;
}

function makeBreadcrumbSchema(locationName: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${BASE_URL}/locations/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locationName,
        item: `${BASE_URL}/locations/${slug}/`,
      },
    ],
  };
}

/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const locations = PRIMARY_LOCATIONS as LocationInfo[];

  const params = locations.map((location) => ({
    location: normalizeSlug(location.name),
  }));

  if (!params.some((item) => item.location === "sohna")) {
    params.push({ location: "sohna" });
  }

  return params;
}

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { location: rawLocation } = await params;
  const slug = normalizeSlug(rawLocation);
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: `Location Not Found | ${BUSINESS_NAME}`,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title =
    `Invisible Grills & Safety Nets in ${location.name} | ${BUSINESS_NAME}`;

  const description =
    `Professional invisible grills, balcony safety nets, pigeon nets, ` +
    `bird spikes and child safety solutions in ${location.name}, ` +
    `${location.state}. Contact Nidhi Bird Service for installation details.`;

  const canonical = `${BASE_URL}/locations/${slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/invisible-grill-1.jpg`,
          width: 1200,
          height: 630,
          alt: `Invisible grills and safety nets in ${location.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/invisible-grill-1.jpg`],
    },
    keywords: [
      `invisible grills in ${location.name}`,
      `safety nets in ${location.name}`,
      `balcony safety nets in ${location.name}`,
      `pigeon nets in ${location.name}`,
      `bird spikes in ${location.name}`,
      `child safety nets in ${location.name}`,
      `invisible grill installation in ${location.name}`,
      ...location.areas.map((area) => `safety nets in ${area}`),
      BUSINESS_NAME,
    ],
  };
}

/* =========================================================
   LOCATION PAGE
========================================================= */

export default async function LocationPage({
  params,
}: PageParams) {
  const { location: rawLocation } = await params;
  const slug = normalizeSlug(rawLocation);
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const content = generateLocationContent(
    "Invisible Grills & Safety Nets",
    location.name,
  );

  const canonical = `${BASE_URL}/locations/${slug}/`;

  const breadcrumbSchema = makeBreadcrumbSchema(
    location.name,
    slug,
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonical}#localbusiness`,
    name: BUSINESS_NAME,
    url: canonical,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    description: content.description,
    image: `${BASE_URL}/logo.png`,
    priceRange: "Contact for pricing",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: location.state,
      addressCountry: "IN",
    },
    areaServed: location.areas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessSchema,
            breadcrumbSchema,
          ]),
        }}
      />

      <HeroWithHeaderWrapper>
        <div className="overflow-hidden rounded-2xl">
          <LocationHero
            location={location.name}
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations/" },
              {
                label: location.name,
                href: `/locations/${slug}/`,
              },
            ]}
          />
        </div>
      </HeroWithHeaderWrapper>

      <section className="py-10 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {content.heading}
              </h1>

              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {content.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}
                  className="inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
                >
                  Call Now
                </a>

                <a
                  href="https://wa.me/918603237881"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg border px-5 py-3 font-semibold"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>

            <aside className="rounded-2xl bg-slate-900 p-6 text-white md:p-8">
              <h2 className="mb-5 text-xl font-semibold">
                Areas We Serve in {location.name}
              </h2>

              <ul className="space-y-3">
                {location.areas.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-white/20 pt-4 text-sm text-white/75">
                Contact Nidhi Bird Service to confirm availability
                for your area.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <LocationAboutClient location={location.name} />

      <section className="section-bg-2 py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Our Service Area in {location.name}
          </h2>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg">
            <iframe
              title={`Map of ${location.name}, ${location.state}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${location.name}, ${location.state}, India`,
              )}&output=embed`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
