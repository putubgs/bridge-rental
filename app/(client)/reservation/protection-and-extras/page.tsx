"use client";

import ExtrasSection from "@/components/reservation/protection-and-extras/section/extras-section";
import ProtectionsSection from "@/components/reservation/protection-and-extras/section/protections-section";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRentDetailsStore } from "@/store/reservation-store";
import useLanguageStore from "@/store/useLanguageStore";

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
  const { language } = useLanguageStore();
  const [protections, setProtections] = useState<AdditionalOffer[]>([]);
  const [extras, setExtras] = useState<AdditionalOffer[]>([]);
  const [childrenExtras, setChildrenExtras] = useState<AdditionalOffer[]>([]);
  const [translatedProtections, setTranslatedProtections] = useState<
    AdditionalOffer[]
  >([]);
  const [translatedExtras, setTranslatedExtras] = useState<AdditionalOffer[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdditionalOffers = async () => {
      try {
        const { data, error } = await supabase
          .from("AdditionalOffers")
          .select("*");

        if (error) throw error;

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

        if (language === "ar") {
          const translateOffers = async (offers: AdditionalOffer[]) => {
            return await Promise.all(
              offers.map(async (offer) => {
                try {
                  // Translate offer name
                  const nameResponse = await fetch("/api/translate", {
                    method: "POST",
                    body: JSON.stringify({
                      text: offer.offer_name,
                      targetLang: "ar",
                    }),
                    headers: { "Content-Type": "application/json" },
                  });

                  if (!nameResponse.ok) {
                    throw new Error(
                      `Translation failed with status: ${nameResponse.status}`,
                    );
                  }

                  const nameData = await nameResponse.json();
                  if (!nameData.translation) {
                    throw new Error(
                      "Name translation response missing translation field",
                    );
                  }

                  // Translate description if it exists
                  let descriptionTranslation = null;
                  if (offer.description) {
                    const descResponse = await fetch("/api/translate", {
                      method: "POST",
                      body: JSON.stringify({
                        text: offer.description,
                        targetLang: "ar",
                      }),
                      headers: { "Content-Type": "application/json" },
                    });

                    if (!descResponse.ok) {
                      throw new Error(
                        `Description translation failed with status: ${descResponse.status}`,
                      );
                    }

                    const descData = await descResponse.json();
                    if (!descData.translation) {
                      throw new Error(
                        "Description translation response missing translation field",
                      );
                    }

                    descriptionTranslation = descData.translation;
                  }

                  return {
                    ...offer,
                    offer_name: nameData.translation,
                    description: descriptionTranslation || offer.description,
                  };
                } catch (error) {
                  console.error(
                    `Translation failed for offer ${offer.id}:`,
                    error,
                  );
                  // Return original untranslated offer on error
                  return offer;
                }
              }),
            );
          };

          try {
            const translatedProtectionsData =
              await translateOffers(protectionsData);
            const translatedExtrasData = await translateOffers(extrasData);
            const translatedChildrenExtrasData =
              await translateOffers(childrenExtrasData);

            setTranslatedProtections(translatedProtectionsData);
            setTranslatedExtras(translatedExtrasData);
            useRentDetailsStore
              .getState()
              .setChildrenExtras(translatedChildrenExtrasData);
          } catch (error) {
            console.error("Failed to translate offers:", error);
            // Fallback to untranslated data
            setTranslatedProtections(protectionsData);
            setTranslatedExtras(extrasData);
            useRentDetailsStore
              .getState()
              .setChildrenExtras(childrenExtrasData);
          }
        } else {
          setTranslatedProtections(protectionsData);
          setTranslatedExtras(extrasData);
          useRentDetailsStore.getState().setChildrenExtras(childrenExtrasData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalOffers();
  }, [language]);

  const handleBack = () => router.push("/reservation/car-bundle");
  const handleContinue = () => router.push("/reservation/review");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="mt-10 space-y-10 bg-white px-4 py-7 md:px-20">
        <ProtectionsSection protections={translatedProtections} />
        <ExtrasSection extras={translatedExtras} />
      </div>
      <section className="flex flex-col justify-center gap-4 bg-white p-6 sm:flex-row sm:gap-6 sm:py-11 md:bg-primary-variant-1">
        <button
          onClick={handleBack}
          className="hidden w-full items-center justify-center gap-1 text-neutral-400 sm:w-auto md:flex"
        >
          <ChevronLeftIcon className="-translate-y-[2px] fill-neutral-300 stroke-none" />
          <span className={language === "ar" ? "order-first" : ""}>
            {language === "ar" ? "العودة إلى باقة السيارة" : "Back to car bundle"}
          </span>
        </button>
        <button
          onClick={handleContinue}
          className="w-full rounded bg-primary-variant-2 px-7 py-2 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3 sm:w-auto"
        >
          {language === "ar" ? "متابعة" : "Continue"}
        </button>
      </section>
    </main>
  );
}
