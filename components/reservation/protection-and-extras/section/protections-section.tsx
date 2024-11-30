"use client";

import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

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

  const handleSelectProtection = (protectionName: string, price: number) => {
    const totalDays = countDays(
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
    );

    const totalPrice = totalDays * price;

    setSelectedProtection(protectionName as any);
    setTotalProtectionPrice(totalPrice);
  };

  const parseDescription = (description: string | null) => {
    if (!description) return [];
    return description
      .split("\n")
      .map((line) => line.trim().replace(/^- /, ""))
      .filter((line) => line !== "");
  };

  // Sort protections by price in ascending order
  const sortedProtections = [...protections].sort((a, b) => a.price - b.price);

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Choose your protection</h2>
      <hr />
      <div className="my-5 grid grid-cols-3 gap-4">
        {sortedProtections.map(
          ({ id, image_url, offer_name, description, price }) => (
            <div
              key={id}
              className="flex flex-col justify-between gap-5 border-2 bg-[#F9F9F9] p-5"
            >
              {/* Protection Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative aspect-square w-16">
                    <Image
                      src={image_url || "/default-protection.png"}
                      alt="Protection Icon"
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold">{offer_name}</h3>
                </div>

                {/* Display Description as Bullet Points with Check Icons */}
                <ul className="space-y-1 pl-5">
                  {parseDescription(description).map((line, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="shrink-0 text-primary" size={16} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex w-full items-end justify-between gap-5">
                <button
                  onClick={() => handleSelectProtection(offer_name, price)}
                  className={`rounded px-4 py-2 font-medium transition-all duration-150 ${
                    selected_protection === offer_name
                      ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3"
                      : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"
                  }`}
                >
                  {selected_protection === offer_name ? "SELECTED" : "SELECT"}
                </button>
                <p className="text-end text-sm font-medium">
                  {price === 0 ? "FREE" : `${price.toFixed(2)} JOD/DAY`}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="mb-5 bg-[#F9F9F9] px-5 py-3 text-sm">
        Take advantage and take out Supremely Relax Cover to be 100% protected.
        Without it you will have to leave a deposit as a vehicle guarantee.
      </div>
      <hr />
    </section>
  );
}
