"use client";

import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

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

  const totalDays =
    countDays(deliveryDate, deliveryTime, returnDate, returnTime) || 0;

  const calculatePrice = (price: number, quantity: number = 1): number => {
    if (typeof price !== "number" || isNaN(price)) return 0;
    if (typeof quantity !== "number" || isNaN(quantity)) quantity = 1;
    if (typeof totalDays !== "number" || isNaN(totalDays)) return 0;

    return price * quantity * totalDays;
  };

  const handleSelectExtra = (extra: string, price: number) => {
    if (typeof price !== "number" || isNaN(price)) return;

    const isExtraSelected = selected_extras.includes(extra as any);
    const calculatedPrice = calculatePrice(price);

    if (isExtraSelected) {
      const updatedExtras = selected_extras.filter((item) => item !== extra);
      setSelectedExtras(updatedExtras);
      setTotalExtrasPrice(
        Math.max(0, (totalExtrasPrice || 0) - calculatedPrice),
      );
    } else {
      const updatedExtras = [...selected_extras, extra];
      setSelectedExtras(updatedExtras as any);
      setTotalExtrasPrice((totalExtrasPrice || 0) + calculatedPrice);
    }
  };

  const [tempQuantities, setTempQuantities] = useState<Record<string, number>>(
    {},
  );

  const handleSelectChildrenExtra = (extra: string, price: number) => {
    if (typeof price !== "number" || isNaN(price)) return;

    const quantity = tempQuantities[extra] || 1;
    const isExtraSelected = selected_children_extras.includes(extra as any);
    const calculatedPrice = calculatePrice(price, quantity);

    if (isExtraSelected) {
      const updatedChildrenExtras = selected_children_extras.filter(
        (item) => item !== extra,
      );
      setSelectedChildrenExtras(updatedChildrenExtras);
      setTotalExtrasPrice(
        Math.max(0, (totalExtrasPrice || 0) - calculatedPrice),
      );
      setTempQuantities((prev) => ({ ...prev, [extra]: 1 }));
      setChildrenSeatsQuantity({
        ...childrenSeatsQuantity,
        [extra]: 1,
      });
    } else {
      const updatedChildrenExtras = [...selected_children_extras, extra];
      setSelectedChildrenExtras(updatedChildrenExtras as any);
      setTotalExtrasPrice((totalExtrasPrice || 0) + calculatedPrice);
      setChildrenSeatsQuantity({
        ...childrenSeatsQuantity,
        [extra]: quantity,
      });
    }
  };

  const handleQuantityChange = (
    extra: string,
    newQuantity: number,
    price: number,
  ) => {
    const isExtraSelected = selected_children_extras.includes(extra as any);

    if (isExtraSelected) {
      const oldQuantity = childrenSeatsQuantity[extra] || 1;
      const oldPrice = calculatePrice(price, oldQuantity);
      const newPrice = calculatePrice(price, newQuantity);

      setChildrenSeatsQuantity({
        ...childrenSeatsQuantity,
        [extra]: newQuantity,
      });

      setTotalExtrasPrice(
        Math.max(0, (totalExtrasPrice || 0) - oldPrice + newPrice),
      );
    } else {
      setTempQuantities((prev) => ({
        ...prev,
        [extra]: newQuantity,
      }));
    }
  };

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
        Available Extras
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {extras.map(({ id, image_url, offer_name, description, price }) => {
          const isAdded = selected_extras.includes(offer_name as any);
          return (
            <div
              key={id}
              className="flex flex-col justify-between gap-3 border-2 bg-[#F9F9F9] p-3 sm:gap-5 sm:p-5"
            >
              <div>
                <div className="relative aspect-square w-12 sm:w-16">
                  <Image
                    src={image_url || "/default-extra.png"}
                    alt="Extras Icon"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="mb-5 mt-5 space-y-2 sm:mb-10 sm:mt-10">
                  <h3 className="text-sm font-semibold sm:text-base">
                    {offer_name}
                  </h3>
                  <p className="text-xs text-[#727272] sm:text-sm">
                    {description}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex w-full items-end justify-between gap-3 sm:mt-5 sm:gap-5">
                <button
                  onClick={() => handleSelectExtra(offer_name, price)}
                  className={`rounded-md px-6 py-3 text-xs font-medium transition-all sm:text-sm md:px-3 md:py-1.5 ${
                    isAdded
                      ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3"
                      : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"
                  }`}
                >
                  {isAdded ? "ADDED" : "ADD"}
                </button>
                <p className="text-end text-xs font-medium sm:text-sm">
                  {price === 0
                    ? "FREE"
                    : `${typeof price === "number" ? price.toFixed(2) : "0.00"} JOD/DAY`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-2 bg-[#F9F9F9] p-3 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative aspect-square w-12 sm:w-16">
            <Image
              src={"/assets/img/baby-car-seat.png"}
              alt="Baby Car Seat Icon"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-base font-semibold sm:text-xl">
              Travel Safety
            </h3>
            <p className="text-xs text-neutral-400 sm:text-sm">
              Select up to 3 baby seats. Baby seats are fitted with a hygienic
              disposable cover.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 divide-y sm:mt-6 sm:gap-3">
          {childrenExtras.map(({ id, offer_name, price }) => {
            const isAdded = selected_children_extras.includes(
              offer_name as any,
            );
            return (
              <div
                key={id}
                className="flex items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md sm:gap-5 sm:rounded-none sm:bg-transparent sm:p-3 sm:pt-3 sm:shadow-none sm:hover:shadow-none"
              >
                <div className="flex items-center gap-3 sm:gap-3">
                  <div className="hidden sm:block">
                    <Select
                      size="small"
                      className="w-14 !border-none sm:w-16"
                      value={
                        isAdded
                          ? childrenSeatsQuantity[offer_name] || 1
                          : tempQuantities[offer_name] || 1
                      }
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        handleQuantityChange(offer_name, newQuantity, price);
                      }}
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
                  </div>
                  <h3 className="text-sm font-medium capitalize text-gray-800 sm:text-base">
                    {offer_name.split("_").join(" ")}
                  </h3>
                </div>
                <div className="flex items-center gap-4 sm:gap-2">
                  <p className="text-sm font-medium text-black sm:text-base">
                    {typeof price === "number" ? price.toFixed(2) : "0.00"}{" "}
                    <span className="text-black sm:text-inherit">JOD/DAY</span>
                  </p>
                  <button
                    onClick={() => handleSelectChildrenExtra(offer_name, price)}
                    className={`min-h-[44px] min-w-[80px] rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] sm:min-h-[initial] sm:min-w-[initial] sm:rounded sm:px-3 sm:py-1.5 sm:text-base sm:hover:scale-100 sm:active:scale-100 ${
                      isAdded
                        ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 sm:bg-[#DCDCDC] sm:text-[#7F7F7F] sm:hover:bg-neutral-300"
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
