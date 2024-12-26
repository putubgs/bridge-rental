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
import useLanguageStore from "@/store/useLanguageStore";

const supabase = createClient();

interface Translations {
  carTypes: Record<string, string>;
  carModels: Record<string, string>;
}

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
  const { carModels, fetchCars } = useCarStore();
  const { language } = useLanguageStore();

  const isRTL = useMemo(() => language === "ar", [language]);

  const [translations, setTranslations] = useState<Translations>({
    carTypes: {},
    carModels: {},
  });

  const [isLoading, setIsLoading] = useState(false);

  const car = useMemo(() => {
    return carModels.find((vehicle) => vehicle.car_id === car_id);
  }, [carModels, car_id]);

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
    const loadTranslations = async () => {
      if (language !== "ar" || !car) return;

      setIsLoading(true);

      const carTypes = new Set([car.car_type]);
      const carModelsToTranslate = new Set([car.car_model]);

      try {
        const carTypeTranslations = await Promise.all(
          Array.from(carTypes).map(async (type) => {
            const response = await fetch("/api/translate", {
              method: "POST",
              body: JSON.stringify({ text: type, targetLang: "ar" }),
              headers: { "Content-Type": "application/json" },
            });
            const { translation } = await response.json();
            return [type, translation];
          }),
        );

        const carModelTranslations = await Promise.all(
          Array.from(carModelsToTranslate).map(async (model) => {
            const response = await fetch("/api/translate", {
              method: "POST",
              body: JSON.stringify({ text: model, targetLang: "ar" }),
              headers: { "Content-Type": "application/json" },
            });
            const { translation } = await response.json();
            return [model, translation];
          }),
        );

        const newTranslations: Translations = {
          carTypes: Object.fromEntries(carTypeTranslations),
          carModels: Object.fromEntries(carModelTranslations),
        };

        setTranslations(newTranslations);
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language, car]);

  useEffect(() => {
    if (car?.availability !== undefined) {
      setTotalBundlePrice(0);
    }
  }, [setTotalBundlePrice, car?.availability]);

  const selectPackage = (pricePerDay: number, bundleType: BundleType) => {
    if (totalDays <= 0) {
      alert(
        isRTL
          ? "يرجى تحديد تواريخ/أوقات التسليم والاستلام الصحيحة."
          : "Please select valid delivery and pick-up dates/times.",
      );
      return;
    }

    const totalPrice = totalDays * pricePerDay;
    setTotalBundlePrice(totalPrice);
    setSelectedBundle(bundleType);

    router.push("/reservation/protection-and-extras");
  };

  if (isLoading) {
    return <p>{isRTL ? "جارٍ التحميل..." : "Loading..."}</p>;
  }

  if (!car || !car.availability) {
    return <p>{isRTL ? "جارٍ التحميل..." : "Loading..."}</p>;
  }

  return (
    <div
      className={`mt-10 w-full bg-white p-5 md:px-20 md:py-10 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <p className="pb-5 text-[24px] font-semibold">
        {isRTL ? "اختر باقة سيارتك" : "Choose your car bundle"}
      </p>
      <hr />
      <div className="flex w-full flex-row items-center py-6 md:py-10">
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
                style={{ transform: isRTL ? "scaleX(1)" : "scaleX(-1)" }}
              />
            </div>
          </div>

          <div className="z-10 space-y-5 px-3">
            <div className="flex flex-col gap-2">
              <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-1">
                <p className="pt-1 text-[#535353]">
                  {isRTL
                    ? translations.carTypes[car.car_type] || car.car_type
                    : car.car_type}
                </p>
              </div>
              <p className="text-[18px]">{car.car_model}</p>
            </div>
            <div
              className={`flex w-3/4 justify-between pb-2 pt-3 text-[12px] ${
                isRTL ? "flex-row" : "flex-row"
              }`}
            >
              <div className="relative flex h-fit w-fit items-end">
                <CarDoorIcon size={23} />
                <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                  x{car.doors}
                </div>
              </div>
              <div className="relative flex h-fit w-fit items-end">
                <CarSeatIcon size={23} />
                <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                  x{car.passengers}
                </div>
              </div>
              <div className="relative flex h-fit w-fit items-end">
                <CarLuggageIcon size={23} />
                <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                  x{car.luggage}
                </div>
              </div>
              <AirConditionerIcon size={23} />
              <div
                className={`flex items-center gap-2 ${isRTL ? "pl-[30px]" : "pr-[30px]"}`}
              >
                <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                  A
                </div>
                <p className="pt-1">{isRTL ? "تلقائي" : "Automatic"}</p>
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
        <div
          className={`flex w-full gap-3 md:relative md:w-[50%] md:gap-2 ${
            isRTL ? "flex-col md:flex-row" : "flex-col md:flex-row"
          }`}
        >
          {/* BEST DEAL! Badge */}
          <div
            className={`absolute ${
              isRTL ? "-right-7" : "-left-7"
            } -top-4 hidden rounded-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white md:block`}
          >
            <p className="px-4 pb-1 pt-2">
              {isRTL ? "أفضل صفقة!" : "BEST DEAL!"}
            </p>
          </div>

          {/* GRAB AND DRIVE Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#BAF0E2] text-center md:flex-col md:rounded-none">
            <div className="flex w-full flex-col">
              <div className="bg-[#BAF0E2] py-5 text-center">
                <p>{isRTL ? "إمساك وقيادة" : "GRAB AND DRIVE"}</p>
              </div>
              <div className="flex flex-col pt-7 font-outfit">
                <p className="text-[15px]">
                  <span className="text-[32px]">{car.grab_and_drive}</span>
                  .00/day
                </p>
                <p className="text-[12px] text-[#B8B8B8]">
                  ({car.grab_and_drive * totalDays}.00{" "}
                  {isRTL ? "دينار أردني" : "JOD"} {totalDays}{" "}
                  {totalDays > 1
                    ? isRTL
                      ? "أيام"
                      : "days"
                    : isRTL
                      ? "يوم"
                      : "day"}
                  )
                </p>
              </div>
              <div
                className={`${isRTL ? "mr-4" : "ml-4"} flex hidden items-start pt-4 text-[12px] md:block ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      {isRTL ? "إلغاء مجاني" : "Free Cancellation"}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                      <b>{isRTL ? "(بلا زيادة)" : "(Zero excess)"}</b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>{isRTL ? "توصيل مجاني" : "Free Delivery"}</b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>{isRTL ? "كيلومتر غير محدود" : "Unlimited Mileage"}</b>
                    </p>
                  </li>
                </ul>
              </div>

              <button
                className={`m-4 mt-10 rounded-md py-2 text-white md:mt-6 ${
                  isRTL
                    ? "bg-gradient-to-l from-[#8BD6D6] to-[#BAF0E2]"
                    : "bg-gradient-to-r from-[#8BD6D6] to-[#BAF0E2]"
                }`}
                onClick={() =>
                  selectPackage(car.grab_and_drive, BundleType.bundle1)
                }
              >
                <p className="pt-1">{isRTL ? "اختر" : "SELECT"}</p>
              </button>
            </div>
            <div
              className={`relative flex w-full items-center justify-center border-l-2 border-[#BAF0E2] pt-4 text-[12px] md:hidden md:items-start ${
                isRTL ? "border-r-2 border-[#BAF0E2]" : ""
              }`}
            >
              <div
                className={`absolute ${
                  isRTL ? "-left-0.5" : "-right-0.5"
                } -top-0.5 rounded-br-md rounded-tl-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] text-[14px] text-white`}
              >
                <p className="px-4 pb-1 pt-2">
                  {isRTL ? "أفضل صفقة!" : "BEST DEAL!"}
                </p>
              </div>

              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    {isRTL ? "إلغاء مجاني" : "Free Cancellation"}
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                    <b>{isRTL ? "(بلا زيادة)" : "(Zero excess)"}</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>{isRTL ? "توصيل مجاني" : "Free Delivery"}</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>{isRTL ? "كيلومتر غير محدود" : "Unlimited Mileage"}</b>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* COMPLETE FEE RATE Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#E5E5E5] text-center md:flex-col md:rounded-none">
            <div className="flex w-full flex-col">
              <div className="bg-[#EEEEEE] py-5 text-center">
                <p>{isRTL ? "معدل الرسوم الكامل" : "COMPLETE FEE RATE"}</p>
              </div>
              <div className="flex flex-col pt-7 font-outfit">
                <p className="text-[15px]">
                  <span className="text-[32px]">{car.complete_fee_rate}</span>
                  .00/day
                </p>
                <p className="text-[12px] text-[#B8B8B8]">
                  ({car.complete_fee_rate * totalDays}.00{" "}
                  {isRTL ? "دينار أردني" : "JOD"} {totalDays}{" "}
                  {totalDays > 1
                    ? isRTL
                      ? "أيام"
                      : "days"
                    : isRTL
                      ? "يوم"
                      : "day"}
                  )
                </p>
              </div>
              <div
                className={`${isRTL ? "mr-4" : "ml-4"} flex hidden items-start pt-4 text-[12px] md:block ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      {isRTL ? "إلغاء مجاني" : "Free Cancellation"}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                      <b>{isRTL ? "(مع زيادة)" : "(With excess)"}</b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>
                        {isRTL ? "+ 3 دينار أردني التوصيل" : "+ 3 JOD Delivery"}
                      </b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>{isRTL ? "150 كم/يوم" : "150 Km Mileage/day"}</b>
                    </p>
                  </li>
                </ul>
              </div>

              <button
                className={`m-4 mt-10 rounded-md bg-[#CBCBCB] py-2 text-white md:mt-6`}
                onClick={() =>
                  selectPackage(car.complete_fee_rate, BundleType.bundle2)
                }
              >
                <p className="pt-1">{isRTL ? "اختر" : "SELECT"}</p>
              </button>
            </div>

            <div
              className={`relative flex w-full items-center justify-center border-l-2 border-[#E5E5E5] pt-4 text-[12px] md:hidden md:items-start ${
                isRTL ? "border-r-2 border-[#E5E5E5]" : ""
              }`}
            >
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    {isRTL ? "إلغاء مجاني" : "Free Cancellation"}
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                    <b>{isRTL ? "(مع زيادة)" : "(With excess)"}</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>
                      {isRTL ? "+ 3 دينار أردني التوصيل" : "+ 3 JOD Delivery"}
                    </b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>{isRTL ? "150 كم/يوم" : "150 Km Mileage/day"}</b>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* PACKED TO THE BRIM Bundle */}
          <div className="flex w-full flex-row justify-between rounded-md border-2 border-[#E5E5E5] text-center md:flex-col md:rounded-none">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="bg-[#EEEEEE] py-5 text-center">
                <p>{isRTL ? "معبأة بالكامل" : "PACKED TO THE BRIM"}</p>
              </div>
              <div className="flex flex-col pt-7 font-outfit">
                <p className="text-[15px]">
                  <span className="text-[32px]">{car.packed_to_the_brim}</span>
                  .00/day
                </p>
                <p className="text-[12px] text-[#B8B8B8]">
                  ({car.packed_to_the_brim * totalDays}.00{" "}
                  {isRTL ? "دينار أردني" : "JOD"} {totalDays}{" "}
                  {totalDays > 1
                    ? isRTL
                      ? "أيام"
                      : "days"
                    : isRTL
                      ? "يوم"
                      : "day"}
                  )
                </p>
              </div>
              <div
                className={`${isRTL ? "mr-4" : "ml-4"} flex hidden items-start pt-4 text-[12px] md:block ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                      <b>{isRTL ? "(مع زيادة)" : "(With excess)"}</b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>
                        {isRTL ? "+ 5 دينار أردني التوصيل" : "+ 5 JOD Delivery"}
                      </b>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}
                    ></span>
                    <p className="pt-1">
                      <b>{isRTL ? "100 كم/يوم" : "100 Km Mileage/day"}</b>
                    </p>
                  </li>
                </ul>
              </div>

              <button
                className={`m-4 mt-10 rounded-md bg-[#A0A0A0] py-2 text-white md:mt-6`}
                onClick={() =>
                  selectPackage(car.packed_to_the_brim, BundleType.bundle3)
                }
              >
                <p className="pt-1">{isRTL ? "اختر" : "SELECT"}</p>
              </button>
            </div>
            <div
              className={`relative flex w-full items-center justify-center border-l-2 border-[#E5E5E5] pt-4 text-[12px] md:hidden md:items-start ${
                isRTL ? "border-r-2 border-[#E5E5E5]" : ""
              }`}
            >
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">{isRTL ? "خزان كامل" : "Full Tank"}</p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    {isRTL ? "تغطية كاملة" : "Full Cover"}{" "}
                    <b>{isRTL ? "(مع زيادة)" : "(With excess)"}</b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>
                      {isRTL ? "+ 5 دينار أردني التوصيل" : "+ 5 JOD Delivery"}
                    </b>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className={`${isRTL ? "ml-2" : "mr-2"} mt-1.5 h-2 w-2 rounded-full bg-gray-400`}></span>
                  <p className="pt-1">
                    <b>{isRTL ? "100 كم/يوم" : "100 Km Mileage/day"}</b>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mb-3 w-full bg-[#FBFAFA] p-3 text-start text-[13px] text-[#A1A1A1] md:mb-0 md:text-end md:text-[16px] ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {isRTL
          ? "جميع الأسعار بالدينار الأردني وتشمل ضريبة القيمة الضافة."
          : "All prices are in Jordanian Dinars & VAT included."}
      </div>
    </div>
  );
}
