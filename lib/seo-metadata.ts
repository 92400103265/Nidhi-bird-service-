import type { Metadata } from "next";

import { PRIMARY } from "@/constants/contacts";

import {
  locationData,
  validLocations,
  PRIMARY_LOCATION,
} from "@/constants/locations";

// ============================================================
// BUSINESS CONFIGURATION
// ============================================================

export const BUSINESS_NAME = "Nidhi Bird Service";

export const baseUrl = "https://www.nidhibirdservice.in";

export const BUSINESS_PHONE = PRIMARY.phone;

export const BUSINESS_DISPLAY_PHONE = "+91 86032 37881";

export const BUSINESS_WHATSAPP =
  "https://wa.me/918603237881";

export const LOCATIONS_SENTENCE =
  "Gurugram, Delhi NCR and Noida";

// ============================================================
// PRIMARY SERVICE LOCATIONS
// ============================================================

export const PRIMARY_LOCATIONS = validLocations.map((slug) => {
  const loc = locationData[slug];

  return {
    name: loc.name as string,
    state: loc.state as string,
    areas: [...loc.primaryAreas] as string[],
    allAreas: [...loc.areas] as string[],
    streetAddress: loc.streetAddress as string,
    postalCode: loc.postalCode as string,
    latitude: loc.latitude as number,
    longitude: loc.longitude as number,
  };
});

// ============================================================
// URL HELPERS
// ============================================================

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

function serviceUrl(slug: string): string {
  return absoluteUrl(`services/${slug}/`);
}

function absoluteImageUrl(image: string): string {
  return absoluteUrl(image);
}

// ============================================================
// SEO KEYWORD GENERATOR
// ============================================================

export function generateLocationKeywords(
  serviceName: string,
): string[] {
  const keywords: string[] = [];

  keywords.push(
    serviceName,
    `${serviceName} installation`,
    `${serviceName} services`,
    `${serviceName} price`,
    `${serviceName} cost`,
    `${serviceName} near me`,
    `best ${serviceName}`,
    `professional ${serviceName} installation`,
    `${serviceName} dealers`,
    `${serviceName} installation cost`,
  );

  PRIMARY_LOCATIONS.forEach((location) => {
    const city = location.name;

    keywords.push(
      `${serviceName} in ${city}`,
      `${serviceName} installation in ${city}`,
      `best ${serviceName} in ${city}`,
      `${serviceName} cost in ${city}`,
      `${serviceName} dealers in ${city}`,
      `${serviceName} in ${location.state}`,
    );
  });

  PRIMARY_LOCATION.primaryAreas.forEach((area) => {
    keywords.push(
      `${serviceName} in ${area}`,
      `${serviceName} installation in ${area} ${PRIMARY_LOCATION.name}`,
    );
  });

  return [...new Set(keywords)];
}

// ============================================================
// META DESCRIPTION HELPER
// ============================================================

export function clampSnippet(
  text: string,
  max = 155,
): string {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= max) {
    return clean;
  }

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");

  return (
    lastSpace > max * 0.6
      ? cut.slice(0, lastSpace)
      : cut
  ).replace(/[\s,.;:-]+$/, "");
}

// ============================================================
// SEO TITLE HELPER
// ============================================================

export function withBrand(
  title: string,
  max = 60,
): string {
  const fullTitle = `${title} | ${BUSINESS_NAME}`;

  if (fullTitle.length <= max) {
    return fullTitle;
  }

  const shortTitle = `${title} | Nidhi Bird`;

  if (shortTitle.length <= max) {
    return shortTitle;
  }

  return title.length <= max
    ? title
    : clampSnippet(title, max);
}

// ============================================================
// GOOGLE ANALYTICS
// ============================================================

export const GA_MEASUREMENT_ID = "G-339PTXCP6X";

// ============================================================
// SERVICE PAGE METADATA
// ============================================================

export function generateServiceMetadata(params: {
  serviceName: string;
  serviceSlug: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  primaryLocation?: string;
}): Metadata {
  const {
    serviceName,
    serviceSlug,
    shortDescription,
    primaryLocation,
    image,
  } = params;

  const locationInfo = primaryLocation
    ? PRIMARY_LOCATIONS.find(
        (location) => location.name === primaryLocation,
      )
    : null;

  const locationSuffix = primaryLocation
    ? ` in ${primaryLocation}`
    : ` in ${PRIMARY_LOCATION.name} and Delhi NCR`;

  const areaDescription = locationInfo
    ? `Serving ${locationInfo.areas.join(", ")} and surrounding areas`
    : `Serving ${LOCATIONS_SENTENCE}`;

  const title = withBrand(
    `${serviceName}${locationSuffix}`,
  );

  const cleanedDescription = shortDescription
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.]+$/, "");

  const descriptionTail =
    ` Professional installation. Call ${BUSINESS_DISPLAY_PHONE}.`;

  const description = clampSnippet(
    `${cleanedDescription}${descriptionTail}`,
    155,
  );

  const socialDescription = clampSnippet(
    `${cleanedDescription}. ${areaDescription}. Contact ${BUSINESS_NAME} for service information.`,
    280,
  );

  return {
    title,
    description,

    keywords: generateLocationKeywords(serviceName),

    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },

    alternates: {
      canonical: serviceUrl(serviceSlug),
    },

    openGraph: {
      title,
      description: socialDescription,
      url: serviceUrl(serviceSlug),
      siteName: BUSINESS_NAME,
      locale: "en_IN",
      type: "website",

      images: [
        {
          url: absoluteImageUrl(image),
          width: 1200,
          height: 630,
          alt: `${serviceName} - ${BUSINESS_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [absoluteImageUrl(image)],
    },

    verification: {
      google:
        "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
      other: {
        "msvalidate.01":
          "A59B620A02512B76293509176B16FF32",
      },
    },
  };
}

// ============================================================
// SERVICE STRUCTURED DATA
// ============================================================

export function generateServiceSchema(params: {
  serviceName: string;
  description: string;
  image: string;
  slug: string;
  priceRange?: string;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
}) {
  const {
    serviceName,
    description,
    image,
    slug,
    priceRange,
    specifications = [],
  } = params;

  const url = serviceUrl(slug);
  const imageUrl = absoluteImageUrl(image);

  const organizationId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const webpageId = `${url}#webpage`;
  const imageId = `${url}#primaryimage`;

  const serviceSchema = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: serviceName,
    serviceType: serviceName,
    description,
    url,
    image: imageUrl,

    provider: {
      "@type": "Organization",
      "@id": organizationId,
      name: BUSINESS_NAME,
      url: `${baseUrl}/`,
      telephone: BUSINESS_PHONE,
    },

    areaServed: PRIMARY_LOCATIONS.map((location) => ({
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.state,
      },
    })),

    ...(priceRange ? { priceRange } : {}),

    ...(specifications.length > 0
      ? {
          additionalProperty: specifications.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.label,
            value: spec.value,
          })),
        }
      : {}),
  };

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${baseUrl}/`,
        name: BUSINESS_NAME,
        inLanguage: "en-IN",
        publisher: {
          "@id": organizationId,
        },
      },

      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: `${serviceName} | ${BUSINESS_NAME}`,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": websiteId,
        },
        primaryImageOfPage: {
          "@id": imageId,
        },
        mainEntity: {
          "@id": `${url}#service`,
        },
      },

      {
        "@type": "ImageObject",
        "@id": imageId,
        url: imageUrl,
        contentUrl: imageUrl,
        caption: `${serviceName} - ${BUSINESS_NAME}`,
      },

      serviceSchema,
    ],
  };
}

// ============================================================
// ORGANIZATION STRUCTURED DATA
// ============================================================

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",

    "@type": ["Organization", "LocalBusiness"],

    "@id": `${baseUrl}/#organization`,

    name: BUSINESS_NAME,

    alternateName:
      "Nidhi Bird Service - Invisible Grills and Safety Nets",

    description:
      "Invisible grills, balcony safety nets, pigeon nets, child safety nets and bird protection installation services across Gurugram, Delhi NCR and Noida.",

    url: `${baseUrl}/`,

    telephone: BUSINESS_PHONE,

    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("logo.png"),
      caption: `${BUSINESS_NAME} logo`,
    },

    image: absoluteUrl("logo.png"),

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],

    address: PRIMARY_LOCATIONS.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.name,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: "IN",
    })),

    geo: {
      "@type": "GeoCoordinates",
      latitude: PRIMARY_LOCATION.latitude,
      longitude: PRIMARY_LOCATION.longitude,
    },

    areaServed: PRIMARY_LOCATIONS.map((location) => ({
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.state,
      },
    })),

    knowsLanguage: ["English", "Hindi"],

    slogan:
      "Safety, Quality and Style with Nidhi Bird Service",
  };
}

// ============================================================
// BREADCRUMB STRUCTURED DATA
// ============================================================

export function generateBreadcrumbSchema(
  items: Array<{
    name: string;
    url: string;
  }>,
  pageUrl?: string,
) {
  const normalizedItems = items.map((item) => ({
    ...item,
    url: absoluteUrl(item.url).replace(/\/?$/, "/"),
  }));

  const breadcrumbId = pageUrl
    ? `${absoluteUrl(pageUrl)}#breadcrumb`
    : `${baseUrl}/#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,

    itemListElement: normalizedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
