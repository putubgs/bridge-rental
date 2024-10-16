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
    <nav
      className={`fixed z-30 flex w-full items-center justify-between gap-5 px-20 py-5 transition-colors duration-300 ${isScrolled && "bg-black"}`}
    >
      <Link href="/">
        <div className="relative h-[33px] w-[109px]">
          <Image
            src={`/assets/img/brand-logo-${isHomePage || isScrolled ? "white" : "black"}.png`}
            alt="Brand Logo"
            fill
          />
        </div>
      </Link>

      <div
        className={`flex items-center gap-10 font-medium uppercase ${isHomePage || isScrolled ? "text-white" : "text-neutral-400"}`}
      >
        <Link
          href="/contact"
          className={`hover:underline ${pathName === "/contact" && "text-primary-variant-2"}`}
        >
          Contact
        </Link>
        <Link
          href="/help"
          className={`hover:underline ${pathName === "/help" && "text-primary-variant-2"}`}
        >
          Help
        </Link>
      </div>
    </nav>
  );
}
