import { ProtectionType } from "@/lib/enums";
import { protections } from "@/lib/static/protection-dummy";
import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { Button } from "@mui/material";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function ProtectionsSection() {
  const {
    setTotalProtectionPrice,
    setSelectedProtection,
    selected_protection,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
  } = useRentDetailsStore();

  const handleSelectProtection = (
    protection: ProtectionType,
    price: number,
  ) => {
    const totalDays = countDays(
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
    );

    const totalPrice = totalDays * price;

    setSelectedProtection(protection);
    setTotalProtectionPrice(totalPrice);
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Choose your protection</h2>
      <hr />
      <div className="my-5 grid grid-cols-3 gap-4">
        {protections.map(({ icon, name, perks, price, type }, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-5 border-2 bg-[#F9F9F9] p-5"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative aspect-square w-16">
                  <Image
                    src={icon}
                    alt="Protection Icon"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-1 pl-5">
                {perks.map((item, index) => (
                  <div key={index} className="flex gap-2 text-[13px]">
                    <CheckIcon
                      className="shrink-0 -translate-y-[2px] text-primary"
                      size={20}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex w-full items-end justify-between gap-5">
              <button
                onClick={() => handleSelectProtection(type, price)}
                className={`rounded px-4 py-2 font-medium transition-all duration-150 ${selected_protection === type ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3" : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"}`}
              >
                {selected_protection === type ? "SELECTED" : "SELECT"}
              </button>
              <p className="text-end text-sm font-medium">
                {price === 0 ? "FREE" : `${price.toFixed(2)} JOD/DAY`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-5 bg-[#F9F9F9] px-5 py-3 text-sm">
        Take advantage and take out Supremely Relax Cover to be 100% protected.
        Without it you will have to leave a deposit as a vehicle guarantee.
      </div>
      <hr />
    </section>
  );
}
