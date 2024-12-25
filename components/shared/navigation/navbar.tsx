"use client";

import { useState, useEffect } from "react";
import useScrolledNavbar from "@/hooks/useScrolledNavbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLanguageStore from "@/store/useLanguageStore";

type Language = "en" | "ar";

export default function Navbar() {
  const pathName = usePathname();
  const isScrolled = useScrolledNavbar();
  const isHomePage = pathName === "/";

  // Correctly destructured useState with explicit type
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // useState for windowWidth with proper typing
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  const { language, setLanguage } = useLanguageStore() as {
    language: Language;
    setLanguage: (lang: Language) => void;
  };

  // Translation object
  const translations = {
    en: {
      contact: "Contact",
      help: "Help",
      switchLanguage: "العربية",
    },
    ar: {
      contact: "اتصل بنا",
      help: "المساعدة",
      switchLanguage: "English",
    },
  };

  // Determine text direction based on laniguage
  const isRTL = language === "ar";

  // Effect to handle window resizing and set windowWidth
  useEffect(() => {
    // Function to update windowWidth state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine logo color based on state and windowWidth
  const logoColor = (() => {
    if (mobileMenuOpen || (windowWidth !== undefined && windowWidth < 1024)) {
      return "black";
    } else if (isHomePage || isScrolled) {
      return "white";
    } else {
      return "black";
    }
  })();

  // Determine text color based on page state
  const textColor =
    isHomePage || isScrolled ? "text-white" : "text-neutral-400";

  return (
    <div
      className="sticky top-0 z-30 w-full bg-transparent"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`mx-auto w-full max-w-[1920px] bg-[#BAF0E2] ${
          isRTL ? "pl-4 pr-4 lg:pl-20 lg:pr-20" : "px-4 lg:px-20"
        } py-5 transition-colors duration-300 ${
          isScrolled ? "lg:bg-black" : "lg:bg-transparent"
        }`}
      >
        <nav className="flex w-full items-center justify-between">
          {isRTL ? (
            <>
              {/* RTL Layout */}
              {/* Desktop Links */}

              {/* Logo */}
              <div>
                <Link href="/">
                  <div className="relative h-[33px] w-[109px]">
                    <Image
                      src={`/assets/img/brand-logo-${logoColor}.png`}
                      alt="Brand Logo"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>
              </div>
              <div
                className={`hidden items-center gap-10 font-medium uppercase md:flex ${textColor}`}
              >
                <Link
                  href="/help"
                  className={`${pathName === "/help" ? "text-primary-variant-2" : ""}`}
                >
                  {translations[language].help}
                </Link>
                <Link
                  href="/contact"
                  className={`${pathName === "/contact" ? "text-primary-variant-2" : ""}`}
                >
                  {translations[language].contact}
                </Link>
                <button
                  onClick={() =>
                    setLanguage(language === ("en" as Language) ? "ar" : "en")
                  }
                  className={`${textColor} hover:text-primary-variant-2`}
                >
                  {translations[language].switchLanguage}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`flex flex-col items-end gap-1 focus:outline-none md:hidden ${textColor}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <div className="relative h-5 w-6">
                  <span
                    className={`absolute left-0 h-[2px] w-6 bg-black transition-all duration-300 ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-[2px]"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 bg-black transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 h-[2px] w-6 bg-black transition-all duration-300 ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-[2px]"
                    }`}
                  ></span>
                </div>
              </button>
            </>
          ) : (
            <>
              {/* LTR Layout */}
              {/* Logo */}
              <div>
                <Link href="/">
                  <div className="relative h-[33px] w-[109px]">
                    <Image
                      src={`/assets/img/brand-logo-${logoColor}.png`}
                      alt="Brand Logo"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>
              </div>

              {/* Desktop Links */}
              <div
                className={`hidden items-center gap-10 font-medium uppercase md:flex ${textColor}`}
              >
                <button
                  onClick={() =>
                    setLanguage(language === ("en" as Language) ? "ar" : "en")
                  }
                  className={`${textColor} hover:text-primary-variant-2`}
                >
                  {translations[language].switchLanguage}
                </button>
                <Link
                  href="/contact"
                  className={`${pathName === "/contact" ? "text-primary-variant-2" : ""}`}
                >
                  {translations[language].contact}
                </Link>
                <Link
                  href="/help"
                  className={`${pathName === "/help" ? "text-primary-variant-2" : ""}`}
                >
                  {translations[language].help}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`flex flex-col items-end gap-1 focus:outline-none md:hidden ${textColor}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <div className="relative h-5 w-6">
                  <span
                    className={`absolute left-0 h-[2px] w-6 bg-black transition-all duration-300 ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-[2px]"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 bg-black transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 h-[2px] w-6 bg-black transition-all duration-300 ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-[2px]"
                    }`}
                  ></span>
                </div>
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-8 flex flex-col gap-4 font-medium uppercase text-black md:hidden">
            {/* Language Switch Button for Mobile */}
            <button
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
                setMobileMenuOpen(false);
              }}
              className={`block ${isRTL ? "text-right" : "text-left"}`}
            >
              {translations[language].switchLanguage}
            </button>

            <Link
              href="/contact"
              className={`block ${
                pathName === "/contact" ? "text-primary-variant-2" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations[language].contact}
            </Link>
            <Link
              href="/help"
              className={`block ${
                pathName === "/help" ? "text-primary-variant-2" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations[language].help}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
