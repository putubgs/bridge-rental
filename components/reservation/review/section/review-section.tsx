"use client";

import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import Image from "next/image";
import { useCarStore } from "@/store/car-store";

interface AdditionalOffer {
  id: string;
  type: "Protection" | "Extras";
  offer_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  availability: boolean;
}

const formatPrice = (price: number): string => {
  return typeof price === "number" && !isNaN(price) ? price.toFixed(2) : "0.00";
};

export default function ReviewSection() {
  const {
    car_id,
    selected_bundle,
    totalBundlePrice,
    selected_protection,
    totalProtectionPrice,
    selected_extras,
    selected_children_extras,
    totalExtrasPrice,
    deliveryLocation,
    deliveryDate,
    deliveryTime,
    returnLocation,
    returnDate,
    returnTime,
    childrenSeatsQuantity,
    extras,
    childrenExtras,
  } = useRentDetailsStore();

  const { carModels } = useCarStore();
  const car = carModels.find((vehicle) => vehicle.car_id === car_id);

  const totalDays =
    countDays(deliveryDate, deliveryTime, returnDate, returnTime) || 0;

  if (!car) {
    return <p>Car not found</p>;
  }

  const calculateChildExtraPrice = (extraName: string): number => {
    const quantity = childrenSeatsQuantity[extraName] || 1; // Default to 1 instead of 0
    const extra = childrenExtras.find(
      ({ offer_name }) => offer_name === extraName,
    );
    const price = extra?.price || 0;
    return quantity * price * totalDays;
  };

  const calculateExtraPrice = (extraName: string): number => {
    const extra = extras.find(({ offer_name }) => offer_name === extraName);
    const price = extra?.price || 0;
    return price * totalDays;
  };

  const calculateTotalPrice = (): number => {
    const bundlePrice = totalBundlePrice || 0;
    const protectionPrice = totalProtectionPrice || 0;
    const extrasPrice = totalExtrasPrice || 0;
    return bundlePrice + protectionPrice + extrasPrice;
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">
        Review and proceed to booking
      </h2>
      <hr />
      <div className="mt-5 flex gap-3">
        <div className="flex basis-3/4 divide-x-2 border-2">
          <div className="basis-2/3 p-5">
            <h3 className="text-xl font-medium">Vehicle</h3>
            <div className="relative aspect-video w-1/2">
              <Image
                src={car.car_image}
                alt={car.car_model}
                fill
                className="object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="z-10 space-y-5 px-3">
              <div className="flex flex-col gap-2">
                <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-1">
                  <p className="pt-1 text-[#535353]">{car.car_type}</p>
                </div>
                <p className="text-[18px]">
                  {car.car_model}
                  <span className="text-neutral-400"> or similar</span>
                </p>
              </div>
              <div className="flex w-3/4 gap-7 pb-2 pt-3">
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarDoorIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.doors}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarSeatIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.passengers}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarLuggageIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.luggage}
                  </div>
                </div>
                <AirConditionerIcon size={23} />
                <div className="ml-1 flex items-center gap-2 pr-[30px]">
                  <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                    A
                  </div>
                  <p className="pt-1">Automatic</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400">VAT included</p>
            </div>
          </div>
          <div className="basis-1/3 space-y-5 p-5">
            <h3 className="text-xl font-medium">Delivery & Pick-up</h3>
            <div>
              <p className="mb-1 text-xs text-neutral-400">DELIVERY :</p>
              <ul className="ml-4 list-disc text-sm marker:text-primary">
                <li>
                  {deliveryDate?.format("dddd, MMM DD, YYYY") || "Date not set"}
                </li>
                <li>{deliveryTime?.format("hh:mm A") || "Time not set"}</li>
                <li>{deliveryLocation || "Location not set"}</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs text-neutral-400">PICK-UP :</p>
              <ul className="ml-4 list-disc text-sm marker:text-primary">
                <li>
                  {returnDate?.format("dddd, MMM DD, YYYY") || "Date not set"}
                </li>
                <li>{returnTime?.format("hh:mm A") || "Time not set"}</li>
                <li>{returnLocation || "Location not set"}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="basis-1/4 border-2 p-5 text-end text-sm">
          <h4 className="text-xl font-medium">
            {formatPrice(totalBundlePrice)} JOD
          </h4>
          <div className="pb-4 pt-7">
            <p>
              {selected_bundle?.split("_").join(" ") || "No bundle selected"}
            </p>
            <p>{car.car_model}</p>
          </div>
          <p>*VAT included</p>
        </div>
      </div>

      <div className="my-4 border-2 p-5">
        <div className="flex items-center justify-between gap-5 text-xl font-medium">
          <h3>Protection & Extras</h3>
          <p>{formatPrice(totalProtectionPrice + totalExtrasPrice)} JOD</p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-5">
            <p>
              {selected_protection || "No protection selected"} ({totalDays} Day
              {totalDays !== 1 ? "s" : ""})
            </p>
            <p>{formatPrice(totalProtectionPrice)} JOD</p>
          </div>

          {selected_extras.map((extra) => (
            <div
              key={extra}
              className="flex items-center justify-between gap-5"
            >
              <p>{extra}</p>
              <p>{formatPrice(calculateExtraPrice(extra))} JOD</p>
            </div>
          ))}

          {selected_children_extras.map((extra) => {
            const quantity = childrenSeatsQuantity[extra] || 1;
            const price = calculateChildExtraPrice(extra);
            return (
              <div
                key={extra}
                className="flex items-center justify-between gap-5"
              >
                <p className="capitalize">
                  {extra.split("_").join(" ")} ({quantity}x)
                </p>
                <p>{formatPrice(price)} JOD</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-4 flex items-center justify-between gap-5 bg-primary-variant-1 p-5 text-xl font-medium">
        <h3>Total</h3>
        <p>{formatPrice(calculateTotalPrice())} JOD</p>
      </div>
      <hr />
    </section>
  );
}
