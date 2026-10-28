
import {
  validLocations,
  locationData,
} from "@/constants/locations";

export const PRIMARY_LOCATIONS = validLocations.map((slug) => {
  const location = locationData[slug];

  return {
    ...location,
    slug,
  };
});

export const LOCATION_PROFILES = PRIMARY_LOCATIONS;

export function clampSnippet(
  value: string,
  maxLength = 160
): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function generateLocationContent(
  serviceName: string,
  locationName: string
) {
  return {
    title: `${serviceName} in ${locationName}`,
    description: `Contact Nidhi Bird Service for ${serviceName.toLowerCase()} in ${locationName} and nearby areas.`,
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  currentPath: string
) {
  const baseUrl = "https://www.nidhibirdservice.in";
  const normalizedPath = currentPath.startsWith("/")
    ? currentPath
    : `/${currentPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}${normalizedPath}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${baseUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export function generateServiceFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
