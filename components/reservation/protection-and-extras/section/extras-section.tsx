"use client";

import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { MenuItem, Select } from "@mui/material";
import Image from "next/image";

export default function ExtrasSection() {
  const {
    selected_extras,
    selected_children_extras,
    setSelectedExtras,
    setSelectedChildrenExtras,
    totalExtrasPrice,
    setTotalExtrasPrice,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    childrenSeatsQuantity,
    setChildrenSeatsQuantity,
    extras,
    childrenExtras,
  } = useRentDetailsStore();

  // Calculate total days
  const totalDays = countDays(deliveryDate, deliveryTime, returnDate, returnTime);

  const handleSelectExtra = (extra: string, price: number) => {
    const isExtraSelected = selected_extras.includes(extra as any);
  
    if (isExtraSelected) {
      const updatedExtras = selected_extras.filter((item) => item !== extra);
      setSelectedExtras(updatedExtras);
      const updatedPrice = totalExtrasPrice - totalDays * price;
      setTotalExtrasPrice(updatedPrice);
    } else {
      const updatedExtras = [...selected_extras, extra];
      setSelectedExtras(updatedExtras as any);
      const updatedPrice = totalExtrasPrice + totalDays * price;
      setTotalExtrasPrice(updatedPrice);
    }
  };
  
  const handleSelectChildrenExtra = (extra: string, price: number) => {
    const quantity = childrenSeatsQuantity[extra] || 1;
    const isExtraSelected = selected_children_extras.includes(extra as any);
  
    if (isExtraSelected) {
      const updatedChildrenExtras = selected_children_extras.filter(
        (item) => item !== extra,
      );
      setSelectedChildrenExtras(updatedChildrenExtras);
      const updatedPrice = totalExtrasPrice - totalDays * quantity * price;
      setTotalExtrasPrice(updatedPrice);
    } else {
      const updatedChildrenExtras = [...selected_children_extras, extra];
      setSelectedChildrenExtras(updatedChildrenExtras as any);
      const updatedPrice = totalExtrasPrice + totalDays * quantity * price;
      setTotalExtrasPrice(updatedPrice);
    }
  };
  

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Available Extras</h2>

      {/* Extras Section */}
      <div className="mt-5 grid grid-cols-4 gap-2">
        {extras.map(({ id, image_url, offer_name, description, price }) => {
          const isAdded = selected_extras.includes(offer_name as any);
          return (
            <div key={id} className="flex flex-col justify-between gap-5 border-2 bg-[#F9F9F9] p-5">
              <div>
                <div className="relative aspect-square w-16">
                  <Image
                    src={image_url || "/default-extra.png"}
                    alt="Extras Icon"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="mb-10 mt-10 space-y-2">
                  <h3 className="font-semibold">{offer_name}</h3>
                  <p className="text-sm text-[#727272]">{description}</p>
                </div>
              </div>
              <div className="mt-5 flex w-full items-end justify-between gap-5">
                <button
                  onClick={() => handleSelectExtra(offer_name, price)}
                  className={`rounded px-4 py-2 font-medium transition-all ${
                    isAdded
                      ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3"
                      : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"
                  }`}
                >
                  {isAdded ? "ADDED" : "ADD"}
                </button>
                <p className="text-end text-sm font-medium">
                  {price === 0 ? "FREE" : `${price.toFixed(2)} JOD/DAY`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Children Extras Section */}
      <div className="mt-5 border-2 bg-[#F9F9F9] p-5">
        <div className="flex items-center gap-5">
          <div className="relative aspect-square w-16">
            <Image
              src={"/assets/img/baby-car-seat.png"}
              alt="Baby Car Seat Icon"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Travel Safety</h3>
            <p className="text-neutral-400">
              Select up to 3 baby seats. Baby seats are fitted with a hygienic disposable cover.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 divide-y">
          {childrenExtras.map(({ id, offer_name, price }) => {
            const isAdded = selected_children_extras.includes(offer_name as any);
            return (
              <div key={id} className="flex items-center justify-between gap-5 pt-3">
                <div className="flex items-center gap-3">
                  <Select
                    size="small"
                    className="w-16 !border-none"
                    value={childrenSeatsQuantity[offer_name] || 1}
                    onChange={(e) =>
                      setChildrenSeatsQuantity({
                        ...childrenSeatsQuantity,
                        [offer_name]: e.target.value as number,
                      })
                    }
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#999999",
                      },
                      backgroundColor: "#F4F4F4",
                    }}
                  >
                    {[1, 2, 3].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                  <h3 className="capitalize">{offer_name}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <p>{price.toFixed(2)} JOD/DAY</p>
                  <button
                    onClick={() => handleSelectChildrenExtra(offer_name, price)}
                    className={`rounded px-4 py-2 font-medium transition-all ${
                      isAdded
                        ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3"
                        : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"
                    }`}
                  >
                    {isAdded ? "ADDED" : "ADD"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
