"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  useRentDetailsStore,
  useCarSearchStore,
} from "@/store/reservation-store";
import { useCarStore } from "@/store/car-store";
import useLanguageStore from "@/store/useLanguageStore";

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    deliveryLocation,
    returnLocation,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    car_id,
    totalBundlePrice,
    totalExtrasPrice,
    totalProtectionPrice,
  } = useRentDetailsStore();

  const { searchCompleted } = useCarSearchStore();

  const { carModels, fetchCars } = useCarStore();

  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  useEffect(() => {
    if (carModels.length === 0) {
      fetchCars();
    }
  }, [carModels, fetchCars]);

  useEffect(() => {
    if (pathname.startsWith("/reservation")) {
      fetchCars();
    }
  }, [pathname, fetchCars]);

  const car = carModels.find((vehicle) => vehicle.car_id === car_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!searchCompleted || !car_id || !totalBundlePrice) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [searchCompleted, car_id, totalBundlePrice, pathname]);

  // Helper function to format time
  const formatTime = (time: any) => {
    // Assuming 'time' has a .format method similar to Moment.js or Day.js
    // Replace 'HH:mm A' with 'hh:mm A' for 12-hour format
    return time ? time.format("hh:mm A") : "No Time";
  };

  if (!searchCompleted) {
    return (
      <div className="relative -top-20 flex h-screen items-center justify-center">
        <div className="flex flex-col items-center p-8">
          <h1 className="text-xl font-bold">Page Error!</h1>
          <p className="mt-4 text-center">
            Please follow the process properly to avoid this error occur.
          </p>
          <button
            className="mt-6 cursor-pointer rounded bg-[#8BD6D6] px-4 py-2 text-white"
            onClick={() => router.push("/")}
          >
            Go back to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`-top-25 relative flex flex-col bg-[#F9F9F9] md:-top-20 md:max-w-[1920px] md:pt-32 ${
        isArabic ? "rtl" : "ltr"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {pathname !== "/reservation/car-choices" && (
        <div
          className={`w-full p-6 md:px-20 ${
            isArabic ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            {/* Rental Details Section */}
            <div
              className={`flex w-full flex-col gap-4 bg-white p-3 md:col-span-4 ${
                isArabic ? "text-right md:col-start-1" : "text-left"
              }`}
              style={{ flexBasis: "40%" }}
            >
              <div className="flex items-center gap-2 text-[15px] md:text-[16px]">
                <p className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-black pt-1">
                  1
                </p>
                <p className="pt-1">
                  {isArabic ? "تفاصيل الإيجار" : "Rental Details"}
                </p>
              </div>
              <div
                className={`flex justify-between gap-6 md:gap-0 ${
                  isArabic ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col space-y-1">
                  <p className="pb-1 text-[11px] text-[#D2D2D2] md:text-[12px]">
                    {isArabic ? "موقع التسليم" : "DELIVERY LOCATION"}
                  </p>
                  <p className="text-[13px] md:text-[15px]">
                    {deliveryLocation}
                  </p>
                  <p className="text-[12px] md:text-[13px]">
                    {deliveryDate
                      ? deliveryDate.format("MM-DD-YYYY")
                      : "No Date"}
                    , {formatTime(deliveryTime)}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="pb-1 text-[11px] text-[#D2D2D2] md:text-[12px]">
                    {isArabic ? "موقع الاستلام" : "PICK-UP LOCATION"}
                  </p>
                  <p className="text-[13px] md:text-[15px]">{returnLocation}</p>
                  <p className="text-[12px] md:text-[13px]">
                    {returnDate ? returnDate.format("MM-DD-YYYY") : "No Date"},
                    {formatTime(returnTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Second row - Vehicle & Protection & Extras */}
            <div
              className={`grid grid-cols-2 gap-2 md:col-span-6 ${
                isArabic ? "md:col-start-5" : ""
              }`}
            >
              {/* Vehicle Section */}
              {pathname !== "/reservation/car-bundle" || totalBundlePrice ? (
                <div
                  className="flex w-full flex-col justify-between gap-4 bg-white p-3"
                  style={{ flexBasis: "17.5%" }}
                >
                  <div className="flex items-center gap-2">
                    <p className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-black pt-1">
                      2
                    </p>
                    <p className="pt-1">{isArabic ? "المركبة" : "Vehicle"}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[15px]">{car?.car_model}</p>
                    <p className="text-[13px]">{totalBundlePrice}.00 JOD</p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex w-full flex-col justify-between gap-4 border-2 border-[#BAF0E2] bg-white p-3"
                  style={{ flexBasis: "17.5%" }}
                >
                  <div className="flex items-center gap-2">
                    <p className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#BAF0E2] pt-1">
                      2
                    </p>
                    <p className="pt-1">
                      {isArabic ? "المركبة" : "Vehicle"}
                    </p>
                  </div>
                  <p className="pb-3 text-[13px] text-[#D2D2D2]">
                    {isArabic
                      ? "لم تقم بتحديد حزمة مركبة"
                      : "You’ve not selected a vehicle package"}
                  </p>
                </div>
              )}

              {/* Protection & Extras Section */}
              {pathname === "/reservation/protection-and-extras" ? (
                <div
                  className="flex w-full flex-col justify-between gap-4 border-2 border-[#BAF0E2] bg-white p-3"
                  style={{ flexBasis: "25%" }}
                >
                  <div className="flex items-center gap-2">
                    <p className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#BAF0E2] pt-1">
                      3
                    </p>
                    <p className="pt-1">
                      {isArabic ? "الحماية والإضافات" : "Protection & Extras"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[15px]">
                        {isArabic ? "حماية" : "Protection"}
                      </p>
                      <p className="text-[13px]">
                        {totalProtectionPrice.toFixed(2)} JOD
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px]">
                        {isArabic ? "إضافات" : "Extra"}
                      </p>
                      <p className="text-[13px]">
                        {totalExtrasPrice.toFixed(2)} JOD
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex w-full flex-col justify-between gap-4 bg-white p-3"
                  style={{ flexBasis: "25%" }}
                >
                  <div className="flex items-center gap-2">
                    <p
                      className={`flex h-[23px] w-[23px] items-center justify-center rounded-full border pt-1 ${
                        totalBundlePrice
                          ? "border-black bg-transparent"
                          : "bg-[#E9E9E9] text-[#A3A3A3]"
                      }`}
                    >
                      3
                    </p>
                    <p
                      className={`pt-1 ${
                        !totalBundlePrice && "text-[#A3A3A3]"
                      }`}
                    >
                      {isArabic ? "الحماية والإضافات" : "Protection & Extras"}
                    </p>
                  </div>
                  {totalBundlePrice ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[15px]">
                          {isArabic ? "حماية" : "Protection"}
                        </p>
                        <p className="text-[13px]">
                          {totalProtectionPrice.toFixed(2)} JOD
                        </p>
                      </div>
                      <div>
                        <p className="text-[15px]">
                          {isArabic ? "إضافات" : "Extra"}
                        </p>
                        <p className="text-[13px]">
                          {totalExtrasPrice.toFixed(2)} JOD
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="pb-3 text-[13px] text-[#D2D2D2]">
                      {isArabic
                        ? "يمكنك اختيار الإضافات والحماية بعد تحديد مركبة"
                        : "You can choose extras and protection after selecting a vehicle"}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Review & Reserve Section (hidden on mobile) */}
            {pathname === "/reservation/review" ? (
              <div
                className={`flex hidden w-full flex-col justify-between gap-4 border-2 border-[#BAF0E2] bg-white p-3 md:col-span-2 md:flex ${
                  isArabic ? "text-right" : ""
                }`}
                style={{ flexBasis: "25%" }}
              >
                <div className="flex items-center gap-2">
                  <p className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#BAF0E2] pt-1">
                    4
                  </p>
                  <p className="pt-1">
                    {isArabic ? "مراجعة والحجز" : "Review & Reserve"}
                  </p>
                </div>
                <div>
                  <p className="text-[15px]">
                    {isArabic ? "السعر الإجمالي" : "Total Price"}
                  </p>
                  <p className="text-[13px]">
                    {(
                      totalBundlePrice +
                      totalExtrasPrice +
                      totalProtectionPrice
                    ).toFixed(2)}
                    JOD
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`flex hidden w-full flex-col justify-between gap-4 bg-white p-3 md:col-span-2 md:flex ${
                  isArabic ? "text-right" : ""
                }`}
                style={{ flexBasis: "17.5%" }}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={`flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#E9E9E9] pt-1 text-[#A3A3A3] ${
                      isArabic ? "justify-end" : ""
                    }`}
                  >
                    4
                  </p>
                  <p
                    className={`pt-1 ${
                      !totalBundlePrice && "text-[#A3A3A3]"
                    } ${isArabic ? "text-right text-[#A3A3A3]" : ""}`}
                  >
                    {isArabic ? "مراجعة والحجز" : "Review & Reserve"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="">{children}</div>
    </div>
  );
}
