"use client";

import ExtrasSection from "@/components/reservation/protection-and-extras/section/extras-section";
import ProtectionsSection from "@/components/reservation/protection-and-extras/section/protections-section";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRentDetailsStore } from "@/store/reservation-store";

const supabase = createClient();

export interface AdditionalOffer {
  id: string;
  type: "Protection" | "Extras";
  offer_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  availability: boolean;
}

export default function ProtectionAndExtras() {
  const router = useRouter();
  const [protections, setProtections] = useState<AdditionalOffer[]>([]);
  const [extras, setExtras] = useState<AdditionalOffer[]>([]);
  const [childrenExtras, setChildrenExtras] = useState<AdditionalOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdditionalOffers = async () => {
      try {
        const { data, error } = await supabase
          .from("AdditionalOffers")
          .select("*");

        if (error) throw error;

        // Filter data based on the available status
        const protectionsData = data.filter(
          (item: AdditionalOffer) =>
            item.type === "Protection" && item.availability,
        );
        const extrasData = data.filter(
          (item: AdditionalOffer) =>
            item.type === "Extras" &&
            item.availability &&
            item.image_url !== null &&
            item.description !== null,
        );
        const childrenExtrasData = data.filter(
          (item: AdditionalOffer) =>
            item.type === "Extras" &&
            item.availability &&
            (item.image_url === null || item.description === null),
        );

        setProtections(protectionsData);
        useRentDetailsStore.getState().setExtras(extrasData);
        useRentDetailsStore.getState().setChildrenExtras(childrenExtrasData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalOffers();
  }, []);

  const handleBack = () => router.push("/reservation/car-bundle");
  const handleContinue = () => router.push("/reservation/review");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="mt-10 space-y-10 bg-white px-4 py-7 md:px-20">
        <ProtectionsSection protections={protections} />
        <ExtrasSection />
      </div>
      <section className="flex flex-col justify-center gap-4 md:bg-primary-variant-1 bg-white p-6 sm:flex-row sm:gap-6 sm:py-11">
        <button
          onClick={handleBack}
          className="md:flex hidden w-full items-center justify-center gap-1 text-neutral-400 sm:w-auto"
        >
          <ChevronLeftIcon className="-translate-y-[2px] fill-neutral-300 stroke-none" />
          <span>Back to car bundle</span>
        </button>
        <button
          onClick={handleContinue}
          className="w-full rounded bg-primary-variant-2 px-7 py-2 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3 sm:w-auto"
        >
          Continue
        </button>
      </section>
    </main>
  );
}
