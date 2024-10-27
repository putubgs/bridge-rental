"use client";

import Image from "next/image";
import { useEffect } from "react";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import { vehiclesData } from "@/lib/static/vehicles-dummy";
import { useRentDetailsStore } from "@/store/reservation-store";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function CarBundle() {
  const { car_id, deliveryDate, deliveryTime, returnDate, returnTime, totalBundlePrice, setTotalBundlePrice } = useRentDetailsStore();
  const router = useRouter();

  const car = vehiclesData.find((vehicle) => vehicle.car_id === car_id);

  if (!car) {
    return <p>Car not found</p>;
  }

  useEffect(() => {
    setTotalBundlePrice(0);
  }, [setTotalBundlePrice])

  const selectPackage = (pricePerDay: number) => {
    const startDateTime = dayjs(deliveryDate).set("hour", dayjs(deliveryTime).hour());
    const endDateTime = dayjs(returnDate).set("hour", dayjs(returnTime).hour());

    const totalHours = endDateTime.diff(startDateTime, "hour");
    const totalDays = Math.ceil(totalHours / 24);

    const totalPrice = totalDays * pricePerDay;
    setTotalBundlePrice(totalPrice);

    router.push("/reservation/protection-and-extras");
  };


  return (
    <div className="mt-10 w-full bg-white px-20 py-10">
      <p className="pb-5 text-[24px] font-semibold">Choose your car bundle</p>
      <hr />
      <div className="flex w-full items-center py-10">
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
              <p className="text-[18px]">{car.car_model} </p>
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
                  x{car.passengers_capacity}
                </div>
              </div>
              <div className="relative flex h-fit w-fit items-end text-[12px]">
                <CarLuggageIcon size={23} />
                <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                  x{car.luggage_capacity}
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
        <div className="w-full" style={{ flexBasis: "15%" }}></div>
        <div
          className="relative flex w-full gap-2"
          style={{ flexBasis: "50%" }}
        >
          <div className="absolute -left-7 -top-4 rounded-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white">
            <p className="px-4 pb-1 pt-2">BEST DEAL!</p>
          </div>
          <div className="flex w-full flex-col justify-between border-2 border-[#BAF0E2] text-center">
            <div className="bg-[#BAF0E2] py-5 text-center">
              <p>GRAB AND DRIVE</p>
            </div>
            <div className="font-outfit flex flex-col pt-7">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.grab_and_drive_price_per_day}</span>.00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.grab_and_drive_price_per_day * 2}.00 JOD for 2 days)
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
                    <b>Unlimited Milage</b>
                  </p>
                </li>
              </ul>
            </div>

            <button className="m-4 mt-6 rounded-md bg-gradient-to-r from-[#8BD6D6] to-[#BAF0E2] py-2 text-white" onClick={() => selectPackage(car.grab_and_drive_price_per_day)}>
              <p className="pt-1">SELECT</p>
            </button>
          </div>

          <div className="flex w-full flex-col justify-between border-2 border-[#E5E5E5] text-center">
            <div className="bg-[#EEEEEE] py-5 text-center">
              <p>COMPLETE FEE RATE</p>
            </div>
            <div className="font-outfit flex flex-col pt-7">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.complete_fee_rate_price_per_day}</span>.00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.complete_fee_rate_price_per_day * 2}.00 JOD for 2 days)
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
                    <b>150 Km milage/day</b>
                  </p>
                </li>
              </ul>
            </div>

            <button className="m-4 mt-6 rounded-md bg-[#A0A0A0] py-2 text-white" onClick={() => selectPackage(car.complete_fee_rate_price_per_day)}>
              <p className="pt-1">SELECT</p>
            </button>
          </div>

          <div className="flex w-full flex-col justify-between border-2 border-[#E5E5E5] text-center">
            <div className="bg-[#EEEEEE] py-5 text-center">
              <p>PACKED TO THE BRIM</p>
            </div>
            <div className="font-outfit flex flex-col pt-7">
              <p className="text-[15px]">
                <span className="text-[32px]">{car.packed_to_the_brim_price_per_day}</span>.00/day
              </p>
              <p className="text-[12px] text-[#B8B8B8]">
                ({car.packed_to_the_brim_price_per_day * 2}.00 JOD for 2 days)
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
                    <b>100 Km milage/day</b>
                  </p>
                </li>
              </ul>
            </div>

            <button className="m-4 mt-6 rounded-md bg-[#CBCBCB] py-2 text-white" onClick={() => selectPackage(car.packed_to_the_brim_price_per_day)}>
              <p className="pt-1">SELECT</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
