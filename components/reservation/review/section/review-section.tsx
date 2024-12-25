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
    const quantity = childrenSeatsQuantity[extraName] || 1;
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
      <div className="mt-5 flex flex-col md:gap-3 lg:flex-row">
        <div className="flex basis-3/4 flex-col gap-3 rounded-lg md:gap-0 md:divide-y-2 md:border-2 md:shadow-sm lg:flex-row lg:divide-x-2 lg:divide-y-0">
          <div className="flex flex-col order-2 basis-2/3 rounded-t-lg border p-5 md:order-1 md:border-none items-center md:items-start">
            <h3 className="mb-4 text-center md:text-2xl text-[20px] font-semibold lg:text-left lg:text-xl lg:font-medium">
              Vehicle
            </h3>
            <div className="flex items-center gap-2 md:hidden">
              <div className="z-10 flex w-fit items-center rounded-md bg-[#BAF0E233] px-2 py-1">
                <p className="text-[#535353] text-[10px]">{car.car_type}</p>
              </div>
              <p className="text-[13px]">
                {car.car_model}
                <span className="text-neutral-400"> or similar</span>
              </p>
            </div>
            <div className="relative aspect-video w-full sm:w-full lg:w-1/2">
              <Image
                src={car.car_image}
                alt={car.car_model}
                fill
                className="object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="z-10 space-y-5 px-3">
              <div className="hidden flex-col gap-2 md:flex">
                <div className="z-10 flex w-fit items-center rounded-md bg-[#BAF0E233] px-2 py-1">
                  <p className="text-[#535353]">{car.car_type}</p>
                </div>
                <p className="text-[18px]">
                  {car.car_model}
                  <span className="text-neutral-400"> or similar</span>
                </p>
              </div>
              <div className="flex w-full justify-center md:gap-8 gap-6 pb-2 pt-3 md:justify-start items-center">
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarDoorIcon desktopSize={23} mobileSize={16} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.doors}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarSeatIcon desktopSize={23} mobileSize={16} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.passengers}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarLuggageIcon desktopSize={23} mobileSize={16} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.luggage}
                  </div>
                </div>
                <AirConditionerIcon desktopSize={23} mobileSize={16} />
                <div className="md:ml-1 flex items-center gap-2 md:pr-[30px]">
                  <div className="flex md:h-[23px] md:w-[23px] h-[16px] w-[16px] items-center justify-center border border-black pt-1 text-center font-bold md:text-[16px] text-[10px]">
                    A
                  </div>
                  <p className="pt-1 md:text-[16px] text-[10px]">Automatic</p>
                </div>
              </div>
              <p className="text-center text-xs text-neutral-400 lg:text-left md:block hidden">
                VAT included
              </p>
            </div>
          </div>
          <div className="order-1 basis-1/3 space-y-5 rounded-lg border p-5 md:order-2 md:rounded-none">
            <h3 className="mb-4 text-center md:text-2xl text-[20px] font-semibold lg:text-left lg:text-xl lg:font-medium">
              Delivery & Pick-up
            </h3>
            <div>
              <p className="mb-1 text-[11px] md:text-[12px] text-neutral-400">DELIVERY :</p>
              <ul className="ml-4 list-disc text-[12px] md:text-[14px] marker:text-primary">
                <li>
                  {deliveryDate?.format("dddd, MMM DD, YYYY") || "Date not set"}
                </li>
                <li>{deliveryTime?.format("hh:mm A") || "Time not set"}</li>
                <li>{deliveryLocation || "Location not set"}</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 text-[11px] md:text-[12px] text-neutral-400">PICK-UP :</p>
              <ul className="ml-4 list-disc text-[12px] md:text-[14px] marker:text-primary">
                <li>
                  {returnDate?.format("dddd, MMM DD, YYYY") || "Date not set"}
                </li>
                <li>{returnTime?.format("hh:mm A") || "Time not set"}</li>
                <li>{returnLocation || "Location not set"}</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 text-[11px] md:text-[12px] text-neutral-400">
                TOTAL DAYS OF RENTAL :
              </p>
              <ul className="ml-4 list-disc text-[12px] md:text-[14px] marker:text-primary">
                <li>{totalDays} Days</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex basis-full flex-row items-center justify-between border px-6 py-5 shadow-sm md:flex-col md:items-end md:justify-normal md:rounded-lg md:border-2 md:p-5 lg:basis-1/4">
          <h4 className="order-2 text-center text-[12px] font-semibold md:order-1 md:text-2xl lg:text-end lg:text-xl">
            {formatPrice(totalBundlePrice)} JOD
          </h4>
          <div className="order-1 text-center md:order-2 md:pb-4 md:pt-7 lg:text-end">
            <p className="text-[12px] font-medium md:text-[16px]">
              {selected_bundle?.split("_").join(" ") || "No bundle selected"}
            </p>
            <p className="hidden md:block">{car.car_model}</p>
          </div>
          <p className="hidden text-center text-sm md:order-3 md:block lg:text-end">
            *VAT included
          </p>
        </div>
      </div>

      <div className="border-b-0 border-l border-r border-t p-5 shadow-sm md:my-4 md:rounded-lg md:border-2">
        <div className="flex items-center justify-between gap-2 text-[12px] sm:flex-row sm:items-center sm:gap-5 md:text-xl">
          <h3 className="text-[12px] font-semibold md:text-2xl lg:text-xl">
            Protection & Extras
          </h3>
          <p className="font-semibold">
            {formatPrice(totalProtectionPrice + totalExtrasPrice)} JOD
          </p>
        </div>

        <div className="mt-5 space-y-3 text-[12px] md:text-[16px]">
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
              <p>
                {extra} ({totalDays} Day{totalDays !== 1 ? "s" : ""})
              </p>
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
                  {extra.split("_").join(" ")} ({quantity}x, {totalDays} Day
                  {totalDays !== 1 ? "s" : ""})
                </p>
                <p>{formatPrice(price)} JOD</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-2 rounded-b-lg border-b border-l border-r border-t-0 md:border-0 bg-primary-variant-1 p-5 md:my-4 md:rounded-lg">
        <div className="flex flex-row items-center justify-between gap-2 sm:items-center sm:gap-5">
          <h3 className="text-[12px] font-semibold md:text-2xl">Total</h3>
          <p className="text-[12px] font-semibold md:text-2xl">
            {formatPrice(calculateTotalPrice())} JOD
          </p>
        </div>
      </div>
      <hr />
    </section>
  );
}
