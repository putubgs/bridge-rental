"use client";

import { Button, Switch } from "@mui/material";
import dayjs from "dayjs";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DateTimePicker from "../input/date-time-picker";
import LocationInput from "../input/location-input";
import { useCarSearchStore } from "@/store/reservation-store";
import { useRouter } from "next/navigation"; // Use router to navigate

export default function CarSearchForm() {
  const router = useRouter();
  const [sameReturnLocation, setSameReturnLocation] = useState<boolean>(true);
  const {
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    setDeliveryDate,
    setDeliveryTime,
    setReturnDate,
    setReturnTime,
    setSearchCompleted,
  } = useCarSearchStore();

  const handleSearch = () => {
    if (!deliveryDate || !deliveryTime || !returnDate || !returnTime) {
      alert("Please fill in all the fields before proceeding.");
      return;
    }

    setSearchCompleted(true);
    router.push("/reservation/car-choices");
  };

  return (
    <div className="space-y-3">
      <div className="flex h-max justify-between gap-2 bg-neutral-100 bg-opacity-20 p-[6px]">
        <LocationInput sameReturnLocation={sameReturnLocation} />
        <DateTimePicker
          dateLabel="DELIVERY DATE"
          defaultDateTime={dayjs.tz()}
          setDate={setDeliveryDate}
          setTime={setDeliveryTime}
          currentDate={deliveryDate}
          currentTime={deliveryTime}
        />
        <DateTimePicker
          dateLabel="RETURN DATE"
          setDate={setReturnDate}
          setTime={setReturnTime}
          currentDate={returnDate}
          currentTime={returnTime}
        />
        <Button
          variant="contained"
          className="flex basis-[12%] items-center gap-1 font-overpass font-bold hover:bg-primary/90"
          onClick={handleSearch}
        >
          <SearchIcon className="size-[18px] shrink-0" />
          <span className="translate-y-[1px]">Search</span>
        </Button>
      </div>
      <div className="flex items-start justify-between gap-14 text-[11px]">
        <div className="flex items-center font-bold">
          <Switch
            color="primary"
            checked={sameReturnLocation}
            onChange={(e) => setSameReturnLocation(e.target.checked)}
          />
          <span className="whitespace-nowrap">RETURN TO SAME LOCATION</span>
        </div>
        <div className="text-end">
          <p>
            *KINDLY ENSURE THAT YOUR BOOKING IS MADE AT LEAST 2 HOURS PRIOR TO
            THE SCHEDULED VEHICLE DELIVERY. FOR IMMEDIATE BOOKINGS, PLEASE
            CONTACT OUR <span className="text-primary">CUSTOMER SERVICE</span>{" "}
            TEAM
          </p>
          <p>*BOOKINGS ARE COUNTED ON A PER-DAY BASIS (24 HOURS)</p>
        </div>
      </div>
    </div>
  );
}
