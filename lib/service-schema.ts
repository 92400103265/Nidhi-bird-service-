import {
  baseUrl,
  generateOrganizationSchema,
} from "./organization-schema";

import { PRIMARY } from "@/constants/contacts";

import {
  validLocations,
  locationData,
} from "@/constants/locations";

// ============================================================
// BUSINESS CONFIGURATION
// ============================================================

const BUSINESS_NAME = "Nidhi Bird Service";
const BUSINESS_PHONE = PRIMARY.phone;
const BUSINESS_URL = "https://www.nidhibirdservice.in";

// ============================================================
// SERVICE SCHEMA GENERATOR
// ============================================================

export function generateServiceSchema(params: {
  serviceName: string;
  description: string;
  image: string;
  slug: string;
  category?: string;
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
    category = "safety-equipment",
    specifications = [],
  } = params;

  const organizationSchema = generateOrganizationSchema();

  // Normalize the service slug.
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");

  // Build absolute URLs safely.
  const normalizedImage = /^https?:\/\//i.test(image)
    ? image
    : `${baseUrl}/${image.replace(/^\/+/, "")}`;

  const serviceUrl =
    `${BUSINESS_URL}/services/${normalizedSlug}/`;

  // Extract optional product details from specifications.
  const model = specifications.find((spec) =>
    spec.label.toLowerCase().includes("model"),
  )?.value;

  const material = specifications.find((spec) =>
    spec.label.toLowerCase().includes("material"),
  )?.value;

  const additionalProperties = specifications.map((spec) => ({
    "@type": "PropertyValue",
    name: spec.label,
    value: spec.value,
  }));

  // ==========================================================
  // PRODUCT SCHEMA
  // ==========================================================

  const productSchema = {
    "@type": "Product",
    "@id": `${serviceUrl}#product`,
    name: serviceName,
    description,
    image: normalizedImage,
    url: serviceUrl,
    sku: `NBS-${normalizedSlug.toUpperCase().replace(/[^A-Z0-9-]/g, "-")}`,

    brand: {
      "@type": "Brand",
      name: BUSINESS_NAME,
    },

    manufacturer: {
      "@type": "Organization",
      "@id": `${BUSINESS_URL}/#organization`,
      name: BUSINESS_NAME,
    },

    category:
      category === "bird-protection"
        ? "Bird Protection and Control"
        : "Home Safety and Security Equipment",

    ...(model ? { model } : {}),
    ...(material ? { material } : {}),

    ...(additionalProperties.length > 0
      ? { additionalProperty: additionalProperties }
      : {}),
  };

  // ==========================================================
  // INSTALLATION SERVICE SCHEMA
  // ==========================================================

  const serviceSchema = {
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: `${serviceName} Installation Service`,

    serviceType: [
      serviceName,
      "Installation Service",
      "Home Safety",
    ],

    description: `Professional ${serviceName} installation by ${BUSINESS_NAME}. Contact us for service details and a quotation.`,

    url: serviceUrl,
    image: normalizedImage,
    telephone: BUSINESS_PHONE,

    provider: {
      "@type": "Organization",
      "@id": `${BUSINESS_URL}/#organization`,
      name: BUSINESS_NAME,
      url: `${BUSINESS_URL}/`,
      telephone: BUSINESS_PHONE,
    },

    areaServed: validLocations.map((locationSlug) => {
      const location = locationData[locationSlug];

      return {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: location.state,
        },
      };
    }),

    category:
      category === "bird-protection"
        ? "Bird Protection and Control"
        : "Home Safety and Security Equipment",

    ...(additionalProperties.length > 0
      ? { additionalProperty: additionalProperties }
      : {}),
  };

  // ==========================================================
  // OFFER CATALOG
  // ==========================================================

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `${BUSINESS_NAME} Installation Services`,

    itemListElement: [
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",
          name: `${serviceName} Consultation`,

          description: `Contact ${BUSINESS_NAME} to discuss ${serviceName} installation requirements.`,

          provider: {
            "@type": "Organization",
            "@id": `${BUSINESS_URL}/#organization`,
          },
        },

        url: serviceUrl,
      },
    ],
  };

  const serviceWithCatalog = {
    ...serviceSchema,
    hasOfferCatalog: offerCatalog,
  };

  // ==========================================================
  // COMBINED STRUCTURED DATA
  // ==========================================================

  return {
    "@context": "https://schema.org",

    "@graph": [
      organizationSchema,
      productSchema,
      serviceWithCatalog,
    ],
  };
}
