"use client";

import PaySection from "@/components/reservation/review/section/pay-section";
import ReviewSection from "@/components/reservation/review/section/review-section";

export default function Review() {
  return (
    <main className="mt-10 bg-white px-4 py-6 sm:px-8 sm:py-10 md:px-20">
      <ReviewSection />
      <PaySection />
    </main>
  );
}
