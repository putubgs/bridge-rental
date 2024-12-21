"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState("/assets/img/brand-logo-black.png");

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

  return (
    <div className="bg-[#F9F9F9] px-4 pb-5 pt-5 md:bg-black md:-mt-20 md:px-20 md:pb-10 md:pt-20">
      <footer className="mx-auto flex max-w-screen-2xl flex-col gap-10 text-white lg:gap-20">
        {/* Grid layout for desktop, single column for mobile */}
        <div className="grid grid-cols-1 divide-y divide-neutral-300 lg:grid-cols-3 lg:divide-x lg:divide-y-0 [&>div]:py-5">
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
                Telephone
                <span className="font-normal lg:hidden">
                  {" "}
                  for booking or support
                </span>
              </h2>

              {/* This paragraph will appear only on desktop */}
              <p className="hidden text-neutral-500 lg:block">
                For booking or support
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
                Contact Us
                <span className="font-normal lg:hidden">
                  {" "}
                  for help and feedbacks
                </span>
              </h2>
              <p className="hidden text-neutral-500 lg:block">
                For help and feedbacks
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
        <div className="flex items-center justify-center gap-5 border-t border-neutral-300 pt-5 md:text-sm text-neutral-500 lg:flex-row lg:justify-between lg:border-neutral-700 text-[10px]">
          <p>© {new Date().getFullYear()} Bridge Rental Car.</p>
          <div className="flex gap-5">
            <Link href={"/"} className="hover:underline">
              Terms of Service
            </Link>
            <Link href={"/"} className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
