"use client";

import ExtrasSection from "@/components/reservation/protection-and-extras/section/extras-section";
import ProtectionsSection from "@/components/reservation/protection-and-extras/section/protections-section";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProtectionAndExtras() {
  const router = useRouter();

  const handleBack = () => router.push("/reservation/car-bundle");
  const handleContinue = () => router.push("/reservation/review");

  return (
    <main>
      <div className="mt-10 space-y-10 bg-white px-20 py-7">
        <ProtectionsSection />
        <ExtrasSection />
      </div>
      <section className="flex justify-center gap-6 bg-primary-variant-1 py-11">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-neutral-400"
        >
          <ChevronLeftIcon className="-translate-y-[2px] fill-neutral-300 stroke-none" />
          <span>Back to car bundle</span>
        </button>
        <button
          onClick={handleContinue}
          className="rounded bg-primary-variant-2 px-7 py-2 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3"
        >
          Continue
        </button>
      </section>
    </main>
  );
}
