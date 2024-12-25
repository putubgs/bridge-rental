// src/components/filters/FiveSeatsFilter.tsx

import React from "react";
import Toggle from "@/components/shared/toggle/toggle";
import useLanguageStore from "@/store/useLanguageStore";

interface FiveSeatsFilterProps {
  showMoreThanFiveSeats: boolean;
  setShowMoreThanFiveSeats: (state: boolean) => void;
}

const FiveSeatsFilter: React.FC<FiveSeatsFilterProps> = ({
  showMoreThanFiveSeats,
  setShowMoreThanFiveSeats,
}) => {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="w-full">
      <div
        className={`flex items-center justify-start gap-2 px-5 py-5 text-[#B2B2B2] transition-all duration-300`}
      >
        <div className="block md:hidden">
          <Toggle
            size="20px"
            onColor="#BAF0E2"
            offColor="#ddd"
            handleColor="#fff"
            onToggle={() => setShowMoreThanFiveSeats(!showMoreThanFiveSeats)}
            defaultChecked={showMoreThanFiveSeats}
          />
        </div>

        <div className="hidden md:block">
          <Toggle
            size="30px"
            onColor="#BAF0E2"
            offColor="#ddd"
            handleColor="#fff"
            onToggle={() => setShowMoreThanFiveSeats(!showMoreThanFiveSeats)}
            defaultChecked={showMoreThanFiveSeats}
          />
        </div>

        <p className="text-[11px] md:text-[14px]">
          {isArabic ? "أكثر من 5 مقاعد" : "MORE THAN 5 SEATS"}
        </p>
      </div>
    </div>
  );
};

export default FiveSeatsFilter;
