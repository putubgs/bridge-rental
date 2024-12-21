"use client";

import { useState } from "react";
import useScrolledNavbar from "@/hooks/useScrolledNavbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const isScrolled = useScrolledNavbar();
  const isHomePage = pathName === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const textColor =
    isHomePage || isScrolled ? "text-white" : "text-neutral-400";
  const logoColor =
    mobileMenuOpen || window.innerWidth < 1024
      ? "black"
      : isHomePage || isScrolled
        ? "white"
        : "black";

  return (
    <div className="sticky top-0 z-30 w-full bg-transparent">
      <div
        className={`mx-auto w-full max-w-[1920px] bg-[#BAF0E2] px-4 py-5 transition-colors duration-300 lg:px-20 ${
          isScrolled ? "lg:bg-black" : "lg:bg-transparent"
        }`}
      >
        <nav className="flex w-full items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Links */}
          <div
            className={`hidden items-center gap-10 font-medium uppercase md:flex ${textColor}`}
          >
            <Link
              href="/contact"
              className={`${
                pathName === "/contact" ? "text-primary-variant-2" : ""
              }`}
            >
              Contact
            </Link>
            <Link
              href="/help"
              className={`${
                pathName === "/help" ? "text-primary-variant-2" : ""
              }`}
            >
              Help
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`flex flex-col items-end gap-1 focus:outline-none md:hidden ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <span className="block text-2xl text-black">&times;</span>
            ) : (
              <>
                <span className="block h-[2px] w-6 bg-black"></span>
                <span className="block h-[2px] w-6 bg-black"></span>
                <span className="block h-[2px] w-6 bg-black"></span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`mt-8 flex flex-col gap-4 font-medium uppercase text-black md:hidden`}
          >
            <Link
              href="/contact"
              className={`block ${
                pathName === "/contact" ? "text-primary-variant-2" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/help"
              className={`block ${
                pathName === "/help" ? "text-primary-variant-2" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Help
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
