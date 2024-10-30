"use client";

import useScrolledNavbar from "@/hooks/useScrolledNavbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const isScrolled = useScrolledNavbar();

  const isHomePage = pathName === "/";

  return (
    <div className="sticky top-0 z-30 w-full bg-transparent">
      <div
        className={`mx-auto max-w-[1920px] w-full px-4 lg:px-20 py-5 transition-colors duration-300 ${
          isScrolled ? "bg-black" : ""
        }`}
      >
        <nav className="flex w-full items-center justify-between gap-5">
          <Link href="/">
            <div className="relative h-[33px] w-[109px]">
              <Image
                src={`/assets/img/brand-logo-${
                  isHomePage || isScrolled ? "white" : "black"
                }.png`}
                alt="Brand Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Link>

          <div
            className={`flex items-center gap-10 font-medium uppercase ${
              isHomePage || isScrolled ? "text-white" : "text-neutral-400"
            }`}
          >
            <Link
              href="/contact"
              className={`${pathName === "/contact" && "text-primary-variant-2"}`}
            >
              Contact
            </Link>
            <Link
              href="/help"
              className={`${pathName === "/help" && "text-primary-variant-2"}`}
            >
              Help
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

