"use client";

import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import useLanguageStore from "@/store/useLanguageStore";
import { useMemo, useEffect } from "react";

interface ProtectionsSectionProps {
  protections: AdditionalOffer[];
}

interface AdditionalOffer {
  id: string;
  type: "Protection" | "Extras";
  offer_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  availability: boolean;
}

export default function ProtectionsSection({
  protections,
}: ProtectionsSectionProps) {
  const {
    setTotalProtectionPrice,
    setSelectedProtection,
    selected_protection,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
  } = useRentDetailsStore();

  const { language } = useLanguageStore();

  useEffect(() => {
    const freeProtection = protections.find((p) => p.price === 0);
    const defaultProtection = freeProtection || protections[0];

    if (defaultProtection && !selected_protection) {
      handleSelectProtection(
        defaultProtection.offer_name,
        defaultProtection.price,
      );
    }
  }, [protections]);

  const handleSelectProtection = (protectionName: string, price: number) => {
    // Find the original English name if we're in Arabic mode
    let originalName = protectionName;
    if (language === "ar") {
      const originalProtection = protections.find(
        (p) => p.offer_name === protectionName || p.id === protectionName,
      );
      if (originalProtection) {
        originalName = originalProtection.offer_name;
      }
    }

    const totalDays = countDays(
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
    );

    const totalPrice = totalDays * price;

    setSelectedProtection(originalName as any);
    setTotalProtectionPrice(totalPrice);
  };

  const parseDescription = (description: string | null) => {
    if (!description) return [];
    return description
      .split("\n")
      .map((line) => line.trim().replace(/^- /, ""))
      .filter((line) => line !== "");
  };

  // Sort protections based on language
  const isArabic = language.toLowerCase().startsWith("ar");

  const sortedProtections = useMemo(() => {
    const protectionsCopy = [...protections].sort((a, b) => a.price - b.price);
    return protectionsCopy;
  }, [protections, isArabic]);

  return (
    <section className="px-4 sm:px-0">
      <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
        {language === "ar"
          ? "اختر الحماية الخاصة بك"
          : "Choose your protection"}
      </h2>
      <hr />
      <div className="my-6 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {sortedProtections.map(
          ({ id, image_url, offer_name, description, price }) => (
            <div
              key={id}
              className="flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm sm:rounded-none"
            >
              {/* Protection Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative aspect-square w-14">
                    <Image
                      src={image_url || "/default-protection.png"}
                      alt="Protection Icon"
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {offer_name}
                  </h3>
                </div>

                {/* Display Description as Bullet Points with Check Icons */}
                <ul className="space-y-3">
                  {parseDescription(description).map((line, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-neutral-800"
                    >
                      <CheckIcon
                        className="mt-0.5 shrink-0 text-[#A5E5D9]"
                        size={16}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex w-full items-center justify-between">
                <button
                  onClick={() => handleSelectProtection(offer_name, price)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 md:rounded-md ${
                    selected_protection === offer_name
                      ? "bg-[#A5E5D9] text-white"
                      : price === 0
                        ? "cursor-not-allowed bg-[#A5E5D9] text-white"
                        : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                  }`}
                  disabled={price === 0}
                >
                  {selected_protection === offer_name || price === 0
                    ? language === "ar"
                      ? "تم الاختيار"
                      : "SELECTED"
                    : language === "ar"
                      ? "اختيار"
                      : "SELECT"}
                </button>
                <p className="text-end text-sm font-medium">
                  {price === 0
                    ? language === "ar"
                      ? "مجاناً"
                      : "FREE"
                    : `${price.toFixed(2)} JOD/DAY`}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="mb-6 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-600">
        {language === "ar"
          ? "استفد من الأمر واحصل على تغطية الحماية القصوى لتكون محمياً بنسبة 100%. بدونها سيتعين عليك ترك وديعة كضمان للمركبة."
          : "Take advantage and take out Supremely Relax Cover to be 100% protected. Without it you will have to leave a deposit as a vehicle guarantee."}
      </div>
      <hr />
    </section>
  );
}
