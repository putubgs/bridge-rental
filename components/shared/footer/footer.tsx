"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useLanguageStore from "@/store/useLanguageStore";

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState("/assets/img/brand-logo-black.png");
  const { language } = useLanguageStore(); // Assuming 'language' is either 'en' or 'ar'

  useEffect(() => {
    // Update logo based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLogoSrc("/assets/img/brand-logo-white.png"); // Desktop
      } else {
        setLogoSrc("/assets/img/brand-logo-black.png"); // Mobile
      }
    };

    // Initial check and listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if the current language is RTL
  const isRTL = language === "ar";

  return (
    <div
      className={`bg-[#F9F9F9] px-4 pb-5 pt-5 transition-all duration-300 md:-mt-20 md:bg-black md:px-20 md:pb-10 md:pt-20 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <footer className="mx-auto flex max-w-screen-2xl flex-col gap-10 text-white lg:gap-20">
        {/* Grid layout for desktop, single column for mobile */}
        <div
          className={`grid grid-cols-1 divide-y divide-neutral-300 transition-all duration-300 lg:grid-cols-3 ${
            isRTL 
              ? "lg:divide-x-reverse lg:divide-x lg:divide-y-0 lg:justify-end" 
              : "lg:divide-x lg:divide-y-0 lg:justify-start"
          } [&>div]:py-5`}
        >
          {/* Logo Section */}
          <div className="flex flex-col items-start py-5 lg:items-center lg:justify-center">
            <div className="relative h-[33px] w-[109px]">
              <Image
                src={logoSrc}
                alt="Brand Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Telephone Section */}
          <div className="flex flex-col items-start py-5 lg:items-center lg:justify-center">
            <div className="space-y-1">
              <h2 className="text-[10px] font-semibold text-black md:text-[16px] lg:text-white">
                {isRTL ? "هاتف" : "Telephone"}
                <span className="font-normal lg:hidden">
                  {isRTL ? " للحجز أو الدعم" : " for booking or support"}
                </span>
              </h2>

              {/* This paragraph will appear only on desktop */}
              <p className="hidden text-neutral-500 lg:block">
                {isRTL ? "للحجز أو الدعم" : "For booking or support"}
              </p>

              <ul className="space-y-1 pt-2 text-[10px] md:text-[16px]">
                <li className="text-black lg:text-white">+962-6-7790-890</li>
                <li className="text-black lg:text-white">+962-7-9169-8125</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start py-5 lg:items-center lg:justify-center">
            <div className="space-y-1">
              <h2 className="text-[10px] font-semibold text-black md:text-[16px] lg:text-white">
                {isRTL ? "اتصل بنا" : "Contact Us"}
                <span className="font-normal lg:hidden">
                  {isRTL ? " للمساعدة والتعليقات" : " for help and feedbacks"}
                </span>
              </h2>
              <p className="hidden text-neutral-500 lg:block">
                {isRTL ? "للمساعدة والتعليقات" : "For help and feedbacks"}
              </p>
              <ul className="space-y-1 pt-2 text-[10px] md:text-[16px]">
                <li className="text-black lg:text-white">
                  customer@bridge.co.com
                </li>
                <li className="text-black lg:text-white">info@bridge.co.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex items-center justify-center gap-5 border-t border-neutral-300 pt-5 text-[10px] text-neutral-500 md:text-sm lg:flex-row lg:justify-between lg:border-neutral-700">
          <p>© {new Date().getFullYear()} Bridge Rental Car.</p>
          <div className="flex gap-5">
            <Link href={"/"} className="hover:underline">
              {isRTL ? "شروط الخدمة" : "Terms of Service"}
            </Link>
            <Link href={"/"} className="hover:underline">
              {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
