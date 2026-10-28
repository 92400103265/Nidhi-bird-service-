"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/shared/OptimizedImage";

const BUSINESS_NAME = "Nidhi Bird Service";
const BUSINESS_PHONE = "+91 86032 37881";
const BUSINESS_PHONE_LINK = "+918603237881";

const showcaseImages = [
  {
    src: "/images/invisible-grill-1.jpg",
    alt: `${BUSINESS_NAME} invisible grill installation for balcony and window safety in Gurugram`,
    label: "Invisible Grills",
  },
  {
    src: "/images/balcony-invisible-grill-1.jpg",
    alt: `Balcony invisible grill installation by ${BUSINESS_NAME} in Delhi NCR`,
    label: "Balcony Invisible Grills",
  },
  {
    src: "/images/balcony-net-1.jpg",
    alt: `Balcony safety nets for child and pet protection by ${BUSINESS_NAME}`,
    label: "Balcony Safety Nets",
  },
  {
    src: "/images/children-protection-net-1.jpg",
    alt: "Children protection nets for balconies and windows in Delhi NCR",
    label: "Children Protection Nets",
  },
  {
    src: "/images/pegion-net-1.jpg",
    alt: `Pigeon net installation by ${BUSINESS_NAME} in Gurugram, Delhi NCR and Noida`,
    label: "Pigeon Nets",
  },
  {
    src: "/images/cloth-drying-pulley-1.jpg",
    alt: `Ceiling cloth hanger installation by ${BUSINESS_NAME}`,
    label: "Ceiling Cloth Hangers",
  },
  {
    src: "/images/service-gallery-1.jpg",
    alt: `${BUSINESS_NAME} services including invisible grills, safety nets and bird protection`,
    label: "Our Services",
  },
];

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isMobile = useIsMobile();
  const total = showcaseImages.length;

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextImage = useCallback(() => {
    setActiveIndex((previous) => (previous + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    timerRef.current = setInterval(nextImage, 3500);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, nextImage]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipe = touchStartX.current - touchEndX.current;

    if (Math.abs(swipe) > 50) {
      setActiveIndex((previous) =>
        swipe > 0
          ? (previous + 1) % total
          : (previous - 1 + total) % total
      );
    }

    setIsPaused(false);
  };

  const getPosition = (index: number) => {
    const difference = (index - activeIndex + total) % total;

    if (difference === 0) return "center";
    if (difference === 1) return "right";
    if (difference === total - 1) return "left";

    return "hidden";
  };

  const carouselHandlers = {
    onMouseDown: () => setIsPaused(true),
    onMouseUp: () => setIsPaused(false),
    onMouseLeave: () => setIsPaused(false),
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return (
    <section
      className="relative overflow-hidden bg-white pb-10 pt-10 md:pb-16 md:pt-14"
      aria-label={`${BUSINESS_NAME} service gallery`}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Work
          </span>

          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-4xl">
            Explore Our Services
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            Explore invisible grills, balcony safety nets, children
            protection nets, pigeon nets and other safety solutions from{" "}
            {BUSINESS_NAME}, serving Gurugram, Delhi NCR and Noida.
          </p>
        </div>

        {/* Desktop Carousel */}
        {!isMobile ? (
          <div
            className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-lg md:w-4/5"
            {...carouselHandlers}
          >
            <div className="relative h-96 w-full md:h-[500px] lg:h-[600px]">
              {showcaseImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeIndex
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading={index === activeIndex ? "eager" : "lazy"}
                  />

                  {index !== showcaseImages.length - 1 && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-6 pb-6 pt-12">
                      <p className="font-heading text-xl font-semibold text-white md:text-2xl lg:text-3xl">
                        {image.label}
                      </p>

                      <p className="mt-2 text-sm text-white/90 md:text-base">
                        {BUSINESS_NAME}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Mobile 3D Carousel */
          <div
            className="relative mx-auto flex h-[400px] items-center justify-center sm:h-[460px]"
            style={{ perspective: "1200px" }}
            {...carouselHandlers}
          >
            {showcaseImages.map((image, index) => {
              const position = getPosition(index);
              const isCenter = position === "center";
              const isLeft = position === "left";
              const isRight = position === "right";
              const isVisible = isCenter || isLeft || isRight;

              return (
                <div
                  key={image.src}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    width: isCenter ? "min(360px, 85vw)" : "min(180px, 40vw)",
                    height: isCenter ? "min(420px, 90vw)" : "min(300px, 65vw)",
                    maxHeight: isCenter ? "480px" : "340px",
                    transform: isCenter
                      ? "translateX(-50%) translateZ(60px) scale(1)"
                      : isLeft
                        ? "translateX(calc(-50% - min(150px, 35vw))) translateZ(-40px) rotateY(25deg) scale(0.85)"
                        : isRight
                          ? "translateX(calc(-50% + min(150px, 35vw))) translateZ(-40px) rotateY(-25deg) scale(0.85)"
                          : "translateX(-50%) translateZ(-100px) scale(0.6)",
                    left: "50%",
                    opacity: isVisible ? 1 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 20 : 10,
                    pointerEvents: isCenter ? "auto" : "none",
                    filter: isCenter ? "none" : "blur(1.5px) brightness(0.7)",
                  }}
                  aria-hidden={!isCenter}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading={isCenter ? "eager" : "lazy"}
                    />

                    {isCenter && index !== showcaseImages.length - 1 && (
                      <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-slate-950/85 to-transparent px-4 pb-4 pt-10">
                        <p className="text-center font-heading text-base font-semibold text-white md:text-lg">
                          {image.label}
                        </p>

                        <p className="mt-1 text-center text-sm text-white/90">
                          {BUSINESS_NAME}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Carousel Indicators */}
        <div
          className="mt-4 flex justify-center gap-2 md:mt-6"
          aria-label="Choose gallery image"
        >
          {showcaseImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`min-h-0 min-w-0 flex-shrink-0 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                index === activeIndex
                  ? "h-2 w-7 bg-slate-900 shadow-lg shadow-slate-900/30 md:h-3 md:w-9"
                  : "h-2 w-2 bg-slate-400/50 hover:scale-125 hover:bg-slate-500 md:h-3 md:w-3"
              }`}
              aria-label={`View ${image.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help choosing a safety solution?
          </p>

          <a
            href={`tel:${BUSINESS_PHONE_LINK}`}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            aria-label={`Call ${BUSINESS_NAME} at ${BUSINESS_PHONE}`}
          >
            Call {BUSINESS_NAME}: {BUSINESS_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
