"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { animateScroll } from "react-scroll";
import useLanguageStore from "@/store/useLanguageStore";

export default function BookingSection() {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  const handleScrollToTop = () => {
    animateScroll.scrollToTop({ smooth: true });
  };

  return (
    <div
      className={`relative z-0 h-screen w-full px-20 py-11 text-white ${isArabic ? "rtl" : "ltr"}`}
    >
      <Image
        src={"/assets/img/jordan-road-trip-banner.png"}
        alt="Banner Image"
        fill
        className="-z-10 object-cover"
        sizes="(max-width: 768px) 90vw, 100vw"
      />
      <section className="flex h-full flex-col items-center justify-end gap-4 pb-8 text-center">
        <button
          onClick={handleScrollToTop}
          className="rounded-sm bg-white px-16 pb-2 pt-3 text-[20px] font-medium uppercase text-black hover:bg-neutral-200"
        >
          {isArabic ? "احجز الآن" : "Book Now"}
        </button>
        <p className="w-1/4 leading-normal">
          {isArabic ? (
            <>
              مغامرتك على بعد نقرة واحدة، <br /> استمتع برحلات خالية من القلق.
            </>
          ) : (
            <>
              Your adventure is just a click away, <br /> enjoy worry-free
              travels.
            </>
          )}
        </p>
      </section>
    </div>
  );
}
