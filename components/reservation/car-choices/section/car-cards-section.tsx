import Image from "next/image";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import { useRentDetailsStore } from "@/store/reservation-store";
import { ICarModel } from "@/lib/types";
import { useRouter } from "next/navigation";
import useLanguageStore from "@/store/useLanguageStore";
import { useState, useEffect } from "react";

interface CarCardsSectionProps {
  filteredCars: ICarModel[];
  translations?: Record<string, string>;
}

export default function CarCardsSection({
  filteredCars,
  translations = {},
}: CarCardsSectionProps) {
  const router = useRouter();
  const { setCarId } = useRentDetailsStore();
  const { language } = useLanguageStore();

  const getTranslatedText = (text: string) => {
    return language === "ar" ? translations[text] || text : text;
  };

  const handleClick = (car_id: string) => {
    setCarId(car_id);
    router.push("/reservation/car-bundle");
  };

  return (
    <div className="flex w-full items-center justify-center px-2 md:px-0">
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        {filteredCars.map((car) => {
          return (
            <div
              key={car.car_id}
              className={`group relative flex h-auto w-full flex-col border p-2 ${
                car.availability ? "cursor-pointer" : ""
              }`}
              onClick={
                car.availability ? () => handleClick(car.car_id) : undefined
              }
            >
              {!car.availability && (
                <div
                  className={`absolute ${language === "ar" ? "left-0" : "right-0"} top-0 bg-[#FF4040] px-3 pb-2 pt-3 text-white`}
                >
                  {getTranslatedText("NOT AVAILABLE")}
                </div>
              )}
              {car.availability && (
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              )}
              <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-2">
                <p className="pt-1 text-[12px] text-[#535353] md:text-[16px]">
                  {getTranslatedText(car.car_type)}
                </p>
              </div>
              <div className="z-10 h-[100px] md:h-[200px]">
                <div className="relative h-full w-full">
                  <Image
                    src={car.car_image}
                    alt={car.car_model}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="z-10 space-y-2 md:space-y-5 md:px-3">
                <p className="text-[12px] md:text-[18px]">
                  {car.car_model}{" "}
                  <span className="text-[#979797]">
                    {getTranslatedText("or similar")}
                  </span>
                </p>
                <hr />
                <div className="flex w-full justify-between pb-2 md:pt-5">
                  <div className="flex h-fit w-fit items-center text-[12px] md:relative md:items-end">
                    <CarDoorIcon desktopSize={23} mobileSize={12} />
                    <div className="h-[23px] w-[23px] p-1 text-[10px] md:absolute md:-right-4 md:-top-4 md:rounded-full md:bg-[#EFEFEF] md:text-[12px]">
                      x{car.doors}
                    </div>
                  </div>
                  <div className="flex h-fit w-fit items-center text-[12px] md:relative md:items-end">
                    <CarSeatIcon desktopSize={23} mobileSize={12} />
                    <div className="h-[23px] w-[23px] p-1 text-[10px] md:absolute md:-right-4 md:-top-4 md:rounded-full md:bg-[#EFEFEF] md:text-[12px]">
                      x{car.doors}
                    </div>
                  </div>
                  <div className="flex h-fit w-fit items-center text-[12px] md:relative md:items-end">
                    <CarLuggageIcon desktopSize={23} mobileSize={12} />
                    <div className="h-[23px] w-[23px] p-1 text-[10px] md:absolute md:-right-4 md:-top-4 md:rounded-full md:bg-[#EFEFEF] md:text-[12px]">
                      x{car.doors}
                    </div>
                  </div>
                  <AirConditionerIcon desktopSize={23} mobileSize={12} />
                  <div
                    className={`flex items-center gap-2 ${language === "ar" ? "md:pl-[30px]" : "md:pr-[30px]"}`}
                  >
                    <div
                      className={`flex hidden h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold md:block ${language === "ar" ? "order-first" : ""}`}
                    >
                      A
                    </div>
                    <div className="block w-[7px] md:hidden"></div>
                    <p className="pt-1 text-[7px] text-[#666666] md:text-[16px] md:text-black">
                      {getTranslatedText("Automatic")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
