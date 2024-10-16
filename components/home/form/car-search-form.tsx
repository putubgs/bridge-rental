"use client";

import { Button, Switch } from "@mui/material";
import dayjs from "dayjs";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DateTimePicker from "../input/date-time-picker";
import LocationInput from "../input/location-input";

export default function CarSearchForm() {
  const [sameReturnLocation, setSameReturnLocation] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex h-max justify-between gap-2 bg-neutral-100 bg-opacity-20 p-[6px]">
        <LocationInput sameReturnLocation={sameReturnLocation} />
        <DateTimePicker
          dateLabel="DELIVERY DATE"
          defaultDateTime={dayjs.tz()}
        />
        <DateTimePicker dateLabel="RETURN DATE" />
        <Button variant="contained" className="basis-[12%]">
          <Link
            href={"/choices"}
            className="flex items-center gap-1 font-overpass font-bold hover:bg-primary/90"
          >
            <SearchIcon className="size-[18px] shrink-0" />
            <span className="translate-y-[1px]">Search</span>
          </Link>
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
