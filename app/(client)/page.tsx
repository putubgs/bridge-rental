"use client";

import BestDealSection from "@/components/home/section/best-deal-section";
import BookingSection from "@/components/home/section/booking-section";
import ExperienceSection from "@/components/home/section/experience-section";
import HeroSection from "@/components/home/section/hero-section";
import TestimoniesSection from "@/components/home/section/testimonies-section";
import { useCarSearchStore } from "@/store/reservation-store";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function HomePage() {
  const { setSearchCompleted } = useCarSearchStore();
  const { language } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchCompleted(false);

    if (!sessionStorage.getItem("hasRefreshed")) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, [setSearchCompleted]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time when language changes
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [language]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main
      className={`relative -top-10 md:-top-20 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <HeroSection />
      <ExperienceSection />
      <div className="hidden md:flex">
        <BookingSection />
      </div>
      <BestDealSection />
      {/* <TestimoniesSection /> */}
    </main>
  );
}
