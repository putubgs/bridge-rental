"use client";

import BestDealSection from "@/components/home/section/best-deal-section";
import BookingSection from "@/components/home/section/booking-section";
import ExperienceSection from "@/components/home/section/experience-section";
import HeroSection from "@/components/home/section/hero-section";
import TestimoniesSection from "@/components/home/section/testimonies-section";
import { useCarSearchStore } from "@/store/reservation-store";
import { useEffect } from "react";

export default function HomePage() {
  const { setSearchCompleted } = useCarSearchStore();

  useEffect(() => {
    setSearchCompleted(false);

    if (!sessionStorage.getItem("hasRefreshed")) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, [setSearchCompleted]);

  return (
    <main className="relative -top-20">
      <HeroSection />
      <ExperienceSection />
      <BookingSection />
      <BestDealSection />
      <TestimoniesSection />
    </main>
  );
}
