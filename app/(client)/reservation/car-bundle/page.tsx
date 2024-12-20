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

  const totalDays = useMemo(() => {
    if (!deliveryDate || !deliveryTime || !returnDate || !returnTime) {
      return 0;
    }

    const startDateTime = dayjs(deliveryDate)
      .set("hour", dayjs(deliveryTime).hour())
      .set("minute", dayjs(deliveryTime).minute());

    const endDateTime = dayjs(returnDate)
      .set("hour", dayjs(returnTime).hour())
      .set("minute", dayjs(returnTime).minute());

    const totalHours = endDateTime.diff(startDateTime, "hour");
    const calculatedDays = Math.ceil(totalHours / 24);

    return calculatedDays > 0 ? calculatedDays : 1;
  }, [deliveryDate, deliveryTime, returnDate, returnTime]);

  useEffect(() => {
    console.log(car?.availability);
    setTotalBundlePrice(0);
  }, [setTotalBundlePrice, car?.availability]);

  const selectPackage = (pricePerDay: number, bundleType: BundleType) => {
    if (totalDays <= 0) {
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
    <div className="mt-10 w-full bg-white p-5 md:px-20 md:py-10">
      <p className="pb-5 text-[24px] font-semibold">Choose your car bundle</p>
      <hr />
      <div className="flex w-full items-center md:py-10 py-6">
        {/* Car Details Section */}
        <div
          className="flex hidden w-full flex-col md:block"
          style={{ flexBasis: "35%" }}
        >
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
        <div
          className="flex hidden w-full md:block"
          style={{ flexBasis: "15%" }}
        ></div>

        {/* Bundles Section */}
        <div className="flex w-full flex-col gap-3 md:relative md:w-[50%] md:flex-row md:gap-2">
          {/* BEST DEAL! Badge */}
          <div className="absolute -left-7 -top-4 hidden rounded-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white md:block">
            <p className="px-4 pb-1 pt-2">BEST DEAL!</p>
          </div>

          {/* GRAB AND DRIVE Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#BAF0E2] text-center md:flex-col md:rounded-none">
            <div className="flex w-full flex-col">
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
              <div className="ml-4 flex hidden items-start pt-4 text-[12px] md:block">
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
                className="m-4 mt-10 rounded-md bg-gradient-to-r from-[#8BD6D6] to-[#BAF0E2] py-2 text-white md:mt-6"
                onClick={() =>
                  selectPackage(car.grab_and_drive, BundleType.bundle1)
                }
              >
                <p className="pt-1">SELECT</p>
              </button>
            </div>
            <div className="relative flex w-full items-center justify-center border-l-2 border-[#BAF0E2] pt-4 text-[12px] md:hidden md:items-start">
              <div className="absolute -right-0.5 -top-0.5 rounded-bl-md rounded-tr-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white">
                <p className="px-4 pb-1 pt-2">BEST DEAL!</p>
              </div>

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
          </div>

          {/* COMPLETE FEE RATE Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#E5E5E5] text-center md:flex-col md:rounded-none">
            <div className="flex w-full flex-col">
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
              <div className="ml-4 flex hidden items-start pt-4 text-[12px] md:block">
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
                className="m-4 mt-10 rounded-md bg-[#CBCBCB] py-2 text-white md:mt-6"
                onClick={() =>
                  selectPackage(car.complete_fee_rate, BundleType.bundle2)
                }
              >
                <p className="pt-1">SELECT</p>
              </button>
            </div>

            <div className="relative flex w-full items-center justify-center border-l-2 border-[#E5E5E5] pt-4 text-[12px] md:hidden md:items-start">
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
          </div>

          {/* PACKED TO THE BRIM Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#E5E5E5] text-center md:flex-col md:rounded-none">
            <div className="flex h-full w-full flex-col justify-between">
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
              <div className="ml-4 flex hidden items-start pt-4 text-[12px] md:block">
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
                className="m-4 mt-10 rounded-md bg-[#A0A0A0] py-2 text-white md:mt-6"
                onClick={() =>
                  selectPackage(car.packed_to_the_brim, BundleType.bundle3)
                }
              >
                <p className="pt-1">SELECT</p>
              </button>
            </div>
            <div className="relative flex w-full items-center justify-center border-l-2 border-[#E5E5E5] pt-4 text-[12px] md:hidden md:items-start">
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
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FBFAFA] p-3 md:text-end text-start md:text-[16px] text-[13px] md:text-normal text-[#A1A1A1] md:mb-0 mb-3">
        All prices are in Jordanian Dinars & VAT included.
      </div>
    </div>
  );
}
