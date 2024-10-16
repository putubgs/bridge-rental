"use client";

import useScrolledNavbar from "@/hooks/useScrolledNavbar";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const isScrolled = useScrolledNavbar();

  return (
    <nav
      className={`fixed z-30 flex w-full items-center justify-between gap-5 px-20 py-5 transition-colors duration-300 ${isScrolled && "bg-black"}`}
    >
      <Link href="/">
        <div className="relative h-[33px] w-[109px]">
          <Image src="/assets/img/brand-logo.png" alt="Brand Logo" fill />
        </div>
      </Link>

      <div className="flex items-center gap-10 font-medium uppercase text-white">
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/help" className="hover:underline">
          Help
        </Link>
      </div>
    </nav>
  );
}
