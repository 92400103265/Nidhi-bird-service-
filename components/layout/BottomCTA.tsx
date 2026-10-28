"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/Icons";

interface BottomCTAProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

const BUSINESS_NAME = "Nidhi Bird Service";
const WHATSAPP_NUMBER = "918603237881";
const PHONE_NUMBER = "+918603237881";

// Menu icon
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 text-black"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
    />
  </svg>
);

// Search icon
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 text-black"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 10.5 10.5Z"
    />
  </svg>
);

// Services icon
const ServicesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 text-black"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="7" r="2.5" />
    <circle cx="7" cy="17" r="2.5" />
    <circle cx="17" cy="17" r="2.5" />
  </svg>
);

export default function BottomCTA({
  onMenuClick,
  onSearchClick,
}: BottomCTAProps) {
  const navItems = [
    {
      Icon: MenuIcon,
      label: "Menu",
      href: "#menu",
      action: onMenuClick,
    },
    {
      Icon: SearchIcon,
      label: "Search",
      href: "#search",
      action: onSearchClick,
    },
    {
      Icon: ServicesIcon,
      label: "Services",
      href: "/services",
    },
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
    {
      Icon: Phone,
      label: "Call",
      href: `tel:${PHONE_NUMBER}`,
    },
  ];

  return (
    <nav
      aria-label={`${BUSINESS_NAME} quick navigation`}
      className="w-full rounded-t-3xl bg-white shadow-2xl"
    >
      <div className="grid grid-cols-5 gap-1 px-2 py-3 sm:px-3 md:px-4">
        {navItems.map((item) => {
          const Icon = item.Icon;

          const commonClass =
            "flex flex-col items-center justify-center gap-1 rounded-lg py-2 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                aria-label={`${item.label} - ${BUSINESS_NAME}`}
                className={`${commonClass} w-full`}
              >
                <Icon />
                <span className="line-clamp-2 text-center text-xs font-medium text-gray-700">
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${BUSINESS_NAME} on WhatsApp`}
                className={`${commonClass} w-full`}
              >
                <Icon className="h-5 w-5 text-black" />
                <span className="line-clamp-2 text-center text-xs font-medium text-gray-700">
                  {item.label}
                </span>
              </a>
            );
          }

          if (item.label === "Call") {
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={`Call ${BUSINESS_NAME} at ${PHONE_NUMBER}`}
                className={`${commonClass} w-full`}
              >
                <Icon className="h-5 w-5 text-black" />
                <span className="line-clamp-2 text-center text-xs font-medium text-gray-700">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={`${item.label} - ${BUSINESS_NAME}`}
              className={`${commonClass} w-full`}
            >
              <Icon className="h-5 w-5 text-gray-800" />
              <span className="line-clamp-2 text-center text-xs font-medium text-gray-700">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
