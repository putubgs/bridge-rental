"use client";

import { Button, Switch } from "@mui/material";
import { useFormik } from "formik";
import { SearchIcon } from "lucide-react";
import * as yup from "yup";
import DateRangePicker from "../input/date-range-picker";
import LocationInput from "../input/location-input";
import dayjs, { Dayjs } from "dayjs";

const carSearchSchema = yup.object({
  delivery_location: yup.string(),
  return_location: yup.string(),
  delivery_date: yup.date(),
  return_date: yup.date().nullable(),
  same_return_location: yup.boolean(),
});

export default function CarSearchForm() {
  const formik = useFormik({
    initialValues: {
      delivery_location: "",
      return_location: "",
      delivery_date: dayjs.tz(),
      return_date: null,
      same_return_location: true,
    },
    validationSchema: carSearchSchema,
    onSubmit: ({
      delivery_location,
      return_location,
      delivery_date,
      return_date,
    }) => {
      const formattedValues = {
        delivery_location,
        return_location:
          return_location === "" ? delivery_location : return_location,
        delivery_date: delivery_date.toString(),
        return_date: (return_date as Dayjs | null)?.toString() ?? null,
      };

      //TODO handle the form submission
      console.log(formattedValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-3">
      <div className="flex h-max justify-between gap-2 bg-neutral-100 bg-opacity-20 p-[6px]">
        <LocationInput formik={formik} />
        <DateRangePicker formik={formik} />
        <Button type="submit" variant="contained" className="basis-[12%]">
          <div className="flex items-center gap-1 font-overpass font-bold hover:bg-primary/90">
            <SearchIcon className="size-[18px] shrink-0" />
            <span className="translate-y-[1px]">Search</span>
          </div>
        </Button>
      </div>
      <div className="flex items-start justify-between gap-14 text-[11px]">
        <div className="flex items-center font-bold">
          <Switch
            color="primary"
            checked={formik?.values["same_return_location"]}
            onChange={(e) =>
              formik.setFieldValue("same_return_location", e.target.checked)
            }
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
    </form>
  );
}
