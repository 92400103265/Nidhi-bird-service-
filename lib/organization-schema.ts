import { PRIMARY } from "@/constants/contacts";
import {
  validLocations,
  locationData,
  PRIMARY_LOCATION,
} from "@/constants/locations";

// Website configuration
export const baseUrl = "https://www.nidhibirdservice.in";

const BUSINESS_NAME = "Nidhi Bird Service";

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${baseUrl}/#organization`,

  name: BUSINESS_NAME,
  alternateName: "Nidhi Bird Service - Invisible Grills & Safety Nets",

  description:
    "Professional invisible grill, balcony safety net, pigeon net, child safety and bird protection installation services across Gurugram, Delhi NCR and Noida.",

  url: `${baseUrl}/`,

  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/logo.png`,
    width: 180,
    height: 180,
    caption: `${BUSINESS_NAME} Logo`,
  },

  image: [
    {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 180,
      height: 180,
    },
  ],

  telephone: PRIMARY.phone,

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PRIMARY.phone,
      contactType: "Customer Support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    },
  ],

  address: validLocations.map((slug) => ({
    "@type": "PostalAddress",
    streetAddress: locationData[slug].streetAddress,
    addressLocality: locationData[slug].name,
    addressRegion: locationData[slug].state,
    postalCode: locationData[slug].postalCode,
    addressCountry: "IN",
  })),

  geo: {
    "@type": "GeoCoordinates",
    latitude: PRIMARY_LOCATION.latitude,
    longitude: PRIMARY_LOCATION.longitude,
  },

  areaServed: validLocations.map((slug) => ({
    "@type": "City",
    name: locationData[slug].name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: locationData[slug].state,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationData[slug].latitude,
      longitude: locationData[slug].longitude,
    },
  })),

  sameAs: [],

  knowsLanguage: ["en", "hi"],

  slogan:
    "Safety, Quality & Style with Nidhi Bird Service Invisible Grills and Safety Nets",
});
