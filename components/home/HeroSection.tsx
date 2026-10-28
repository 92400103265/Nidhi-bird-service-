import dynamic from "next/dynamic";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { SEO_BRANDING_TAGLINE } from "@/constants/seo";

const ConsultationFormClient = dynamic(
  () => import("@/components/shared/ConsultationFormClient"),
  {
    loading: () => <div className="min-h-10" />,
  }
);

// Updated business details
const BUSINESS_NAME = "Nidhi Bird Service";
const BUSINESS_PHONE = "+91 86032 37881";
const BUSINESS_PHONE_LINK = "+918603237881";

const SERVICES = [
  "Invisible Grills",
  "Balcony Safety Nets",
  "Children Safety Nets",
  "Pigeon Nets",
  "Bird Protection Nets",
  "Pet Safety Nets",
];

const FEATURES = [
  "Invisible Grills",
  "Quality Safety Nets",
  "Free Site Inspection",
  "Professional Installation",
  "Warranty Support",
  "Dedicated Customer Support",
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        background:
          "linear-gradient(180deg, #0F1729 0%, #0A111A 100%)",
      }}
    >
      {/* Decorative background */}
      <div
        className="bg-3d-elements absolute inset-0"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 to-transparent md:from-black/10"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Hero content */}
          <div className="space-y-6 animate-fade-in">
            <div
              className="inline-flex items-center rounded-full px-3 py-2 md:px-4"
              style={{
                backgroundColor: "rgba(75, 159, 255, 0.08)",
                border: "1px solid rgba(75, 159, 255, 0.25)",
              }}
            >
              <span
                className="text-xs font-semibold md:text-sm"
                style={{ color: "#FF6B42" }}
              >
                {SEO_BRANDING_TAGLINE}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl xl:text-6xl"
              style={{ color: "#F0F6FF" }}
            >
              Invisible Grills &amp; Safety Nets
              <span
                className="mt-3 block text-xl font-semibold sm:text-2xl md:text-3xl xl:text-4xl"
                style={{ color: "#FF6B42" }}
              >
                in Gurugram, Delhi NCR &amp; Noida
              </span>
            </h1>

            <p
              className="max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "#C8D8EE" }}
            >
              {BUSINESS_NAME} provides professional invisible
              grill installation, balcony safety nets, children
              safety nets, pigeon nets, bird protection and pet
              safety solutions for homes, apartments, offices
              and commercial properties across Gurugram, Delhi
              NCR and Noida.
            </p>

            {/* Service highlights */}
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/90 sm:text-sm"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm md:text-base"
                    style={{ color: "#C8D8EE" }}
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      style={{ color: "#FF6B42" }}
                    >
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0Zm-1.2 17.4-5.6-5.6 1.68-1.68 3.92 3.92 7.12-7.12 1.68 1.68-8.8 8.8Z" />
                    </svg>

                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <a
                  href="/services/"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: "#FF6B42" }}
                >
                  Explore Our Services
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href={`tel:${BUSINESS_PHONE_LINK}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  aria-label={`Call ${BUSINESS_NAME} at ${BUSINESS_PHONE}`}
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.05 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92Z" />
                  </svg>

                  {BUSINESS_PHONE}
                </a>
              </div>

              {/* Business identity */}
              <div
                className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:gap-4"
                style={{
                  borderColor: "rgba(184, 204, 234, 0.2)",
                }}
              >
                <div
                  className="flex items-center gap-1"
                  aria-label="Professional service"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-current md:h-5 md:w-5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{ color: "#FF6B42" }}
                    >
                      <path d="m12 .587 3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.595 0 9.748l8.332-1.73Z" />
                    </svg>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span
                    className="text-sm font-semibold md:text-base"
                    style={{ color: "#F0F6FF" }}
                  >
                    {BUSINESS_NAME}
                  </span>

                  <span
                    className="text-xs md:text-sm"
                    style={{ color: "#C8D8EE" }}
                  >
                    Gurugram • Delhi NCR • Noida
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image and consultation form */}
          <div className="space-y-5 animate-fade-in">
            <div className="group relative overflow-hidden rounded-xl shadow-2xl md:rounded-2xl">
              <div className="relative aspect-[4/3]">
                <OptimizedImage
                  src="/images/hero-image.jpg"
                  alt="Invisible grill installation and balcony safety nets by Nidhi Bird Service in Gurugram"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Consultation form */}
            <div>
              <ConsultationFormClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
