
"use client";

import React, { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/Icons";

const WhatsAppPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Updated business mobile number from your screenshot
  const phoneNumber = "918603237881";

  const whatsappMessage = encodeURIComponent(
    "Hello Nidhi Bird Service, I am interested in sports nets, bird nets and safety net installation. Please share more details and a quotation."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setShowPopup(true);
      setIsClosing(false);
    }, 2000);

    const hideTimer = window.setTimeout(() => {
      setIsClosing(true);

      window.setTimeout(() => {
        setShowPopup(false);
        setIsClosing(false);
      }, 350);
    }, 4000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);

    window.setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 350);
  };

  return (
    <>
      {/* WhatsApp Popup */}
      {showPopup && (
        <div
          className={`fixed right-4 bottom-24 sm:right-6 sm:bottom-28 md:right-8 md:bottom-8 z-[9999] transition-all duration-300 ease-out ${
            isClosing
              ? "opacity-0 translate-y-5 scale-90"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="relative w-[280px] sm:w-[320px] rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close WhatsApp popup"
              className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 text-lg leading-none transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 hover:rotate-90 active:scale-90"
            >
              ×
            </button>

            {/* Popup Content */}
            <div className="flex items-start gap-3 pr-5">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-md">
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

                <WhatsAppIcon className="relative z-10 h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Need a Free Quote?
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-600">
                  Chat with Nidhi Bird Service for sports nets, bird nets,
                  pigeon nets and safety net installation.
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-800">
                  +91 8603237881
                </p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

              Chat on WhatsApp
            </a>

            {/* Popup Arrow */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-r border-b border-gray-100 bg-white" />
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Nidhi Bird Service on WhatsApp"
        className="fixed right-5 bottom-24 sm:right-6 sm:bottom-24 md:right-7 md:bottom-7 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        <WhatsAppIcon className="relative z-10 h-7 w-7 text-white transition-transform duration-300 hover:rotate-6" />
      </a>
    </>
  );
};

export default WhatsAppPopup;
