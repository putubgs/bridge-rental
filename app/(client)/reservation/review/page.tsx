"use client";

import PaySection from "@/components/reservation/review/section/pay-section";
import ReviewSection from "@/components/reservation/review/section/review-section";

export default function Review() {
  return (
    <main className="mt-10 bg-white px-20 py-10">
      <ReviewSection />
      <PaySection />
    </main>
  );
}
