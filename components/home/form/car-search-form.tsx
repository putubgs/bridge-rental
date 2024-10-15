"use client";

import { Button } from "@mui/material";
import { SearchIcon } from "lucide-react";
import DateTimePicker from "../input/date-time-picker";
import LocationInput from "../input/location-input";
import { useState } from "react";
import Link from "next/link";

export default function CarSearchForm() {
  return (
    <div className="flex h-max justify-between gap-2 bg-neutral-100 bg-opacity-20 p-[6px]">
      <LocationInput />
      <DateTimePicker date_label="DELIVERY DATE" />
      <DateTimePicker date_label="RETURN DATE" />

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
  );
}
