"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import { useRentDetailsStore } from "@/store/reservation-store";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { BundleType } from "@/lib/enums";
import { createClient } from "@/utils/supabase/client";
import { useCarStore } from "@/store/car-store";

const supabase = createClient();

export default function CarBundle() {
  const {
    car_id,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    totalBundlePrice,
    setTotalBundlePrice,
    setSelectedBundle,
  } = useRentDetailsStore();
  const router = useRouter();
  const { carModels } = useCarStore();

  const car = carModels.find((vehicle) => vehicle.car_id === car_id);

  // Calculate totalDays using useMemo
  const totalDays = useMemo(() => {
    if (!deliveryDate || !deliveryTime || !returnDate || !returnTime) {
      return 0; // Or handle as per your requirements
    }

    const startDateTime = dayjs(deliveryDate)
      .set("hour", dayjs(deliveryTime).hour())
      .set("minute", dayjs(deliveryTime).minute());

    const endDateTime = dayjs(returnDate)
      .set("hour", dayjs(returnTime).hour())
      .set("minute", dayjs(returnTime).minute());

    const totalHours = endDateTime.diff(startDateTime, "hour");
    const calculatedDays = Math.ceil(totalHours / 24);

    return calculatedDays > 0 ? calculatedDays : 1; // Ensure at least 1 day
  }, [deliveryDate, deliveryTime, returnDate, returnTime]);

  useEffect(() => {
    console.log(car?.availability);
    setTotalBundlePrice(0);
  }, [setTotalBundlePrice, car?.availability]);

  const selectPackage = (pricePerDay: number, bundleType: BundleType) => {
    if (totalDays <= 0) {
      // Handle invalid totalDays, e.g., show an error message
      alert("Please select valid delivery and pick-up dates/times.");
      return;
    }

    const totalPrice = totalDays * pricePerDay;
    setTotalBundlePrice(totalPrice);
    setSelectedBundle(bundleType);

    router.push("/reservation/protection-and-extras");
  };

  if (!car || !car.availability) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-10 w-full bg-white px-20 py-10">
      <p className="pb-5 text-[24px] font-semibold">Choose your car bundle</p>
      <hr />
      <div className="flex w-full items-center py-10">
        {/* Car Details Section */}
        <div className="flex w-full flex-col" style={{ flexBasis: "35%" }}>
          <div className="z-10 h-[200px]">
            <div className="relative h-full w-3/4">
              <Image
                src={car.car_image}
                alt={car.car_model}
                fill
                className="object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </div>

          <div className="z-10 space-y-5 px-3">
            <div className="flex flex-col gap-2">
              <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-1">
                <p className="pt-1 text-[#535353]">{car.car_type}</p>
              </div>
              <p className="text-[18px]">{car.car_model}</p>
            </div>
            <div className="flex w-3/4 justify-between pb-2 pt-3">
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
              <div className="flex items-center gap-2 pr-[30px]">
                <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                  A
                </div>
                <p className="pt-1">Automatic</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="w-full" style={{ flexBasis: "15%" }}></div>

        {/* Bundles Section */}
        <div
          className="relative flex w-full gap-2"
          style={{ flexBasis: "50%" }}
        >
          {/* BEST DEAL! Badge */}
          <div className="absolute -left-7 -top-4 rounded-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white">
            <p className="px-4 pb-1 pt-2">BEST DEAL!</p>
          </div>

          {/* GRAB AND DRIVE Bundle */}
          <div className="flex w-full flex-col justify-between border-2 border-[#BAF0E2] text-center">
            <div className="bg-[#BAF0E2] py-5 text-center">
              <p>GRAB AND DRIVE</p>
            </div>
            <div className="flex flex-col pt-7 font-outfit">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.grab_and_drive}</span>
                .00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.grab_and_drive * totalDays}.00 JOD for {totalDays}{" "}
                {totalDays > 1 ? "days" : "day"})
              </p>
            </div>
            <div className="ml-4 flex items-start pt-4 text-[12px]">
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">Full Tank</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">Free Cancelation</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    Full Cover <b>(Zero excess)</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>Free Delivery</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>Unlimited Mileage</b>
                  </p>
                </li>
              </ul>
            </div>

            <button
              className="m-4 mt-6 rounded-md bg-gradient-to-r from-[#8BD6D6] to-[#BAF0E2] py-2 text-white"
              onClick={() =>
                selectPackage(car.grab_and_drive, BundleType.bundle1)
              }
            >
              <p className="pt-1">SELECT</p>
            </button>
          </div>

          {/* COMPLETE FEE RATE Bundle */}
          <div className="flex w-full flex-col justify-between border-2 border-[#E5E5E5] text-center">
            <div className="bg-[#EEEEEE] py-5 text-center">
              <p>COMPLETE FEE RATE</p>
            </div>
            <div className="flex flex-col pt-7 font-outfit">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.complete_fee_rate}</span>
                .00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.complete_fee_rate * totalDays}.00 JOD for {totalDays}{" "}
                {totalDays > 1 ? "days" : "day"})
              </p>
            </div>
            <div className="ml-4 flex items-start pt-4 text-[12px]">
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">Full Tank</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">Free Cancelation</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    Full Cover <b>(With excess)</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>+ 3 JOD Delivery</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>150 Km Mileage/day</b>
                  </p>
                </li>
              </ul>
            </div>

            <button
              className="m-4 mt-6 rounded-md bg-[#A0A0A0] py-2 text-white"
              onClick={() =>
                selectPackage(car.complete_fee_rate, BundleType.bundle2)
              }
            >
              <p className="pt-1">SELECT</p>
            </button>
          </div>

          {/* PACKED TO THE BRIM Bundle */}
          <div className="flex w-full flex-col justify-between border-2 border-[#E5E5E5] text-center">
            <div className="bg-[#EEEEEE] py-5 text-center">
              <p>PACKED TO THE BRIM</p>
            </div>
            <div className="flex flex-col pt-7 font-outfit">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.packed_to_the_brim}</span>
                .00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.packed_to_the_brim * totalDays}.00 JOD for {totalDays}{" "}
                {totalDays > 1 ? "days" : "day"})
              </p>
            </div>
            <div className="ml-4 flex items-start pt-4 text-[12px]">
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">Full Tank</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    Full Cover <b>(With excess)</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>+ 5 JOD Delivery</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                  <p className="pt-1">
                    <b>100 Km Mileage/day</b>
                  </p>
                </li>
              </ul>
            </div>

            <button
              className="m-4 mt-6 rounded-md bg-[#CBCBCB] py-2 text-white"
              onClick={() =>
                selectPackage(car.packed_to_the_brim, BundleType.bundle3)
              }
            >
              <p className="pt-1">SELECT</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
