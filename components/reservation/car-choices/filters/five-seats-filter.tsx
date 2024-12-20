// src/components/filters/FiveSeatsFilter.tsx

import React from "react";
import Toggle from "@/components/shared/toggle/toggle";

interface FiveSeatsFilterProps {
  showMoreThanFiveSeats: boolean;
  setShowMoreThanFiveSeats: (state: boolean) => void;
}

const FiveSeatsFilter: React.FC<FiveSeatsFilterProps> = ({
  showMoreThanFiveSeats,
  setShowMoreThanFiveSeats,
}) => {
  return (
    <div className="flex items-center gap-2 px-5 py-5 text-[#B2B2B2]">
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

      <p className="text-[11px] md:text-[14px]">MORE THAN 5 SEATS</p>
    </div>
  );
};

export default FiveSeatsFilter;
