"use client";

import { Button, Switch } from "@mui/material";
import { useFormik } from "formik";
import { SearchIcon } from "lucide-react";
import * as yup from "yup";
import dayjs from "dayjs";
import DateRangePicker from "../input/date-range-picker";
import LocationInput from "../input/location-input";
import { useRouter } from "next/navigation";
import {
  useCarSearchStore,
  useRentDetailsStore,
} from "@/store/reservation-store";
import Toggle from "@/components/shared/toggle/toggle";

const carSearchSchema = yup.object({
  delivery_location: yup.string().required("Delivery location is required"),
  return_location: yup.string(),
  delivery_date: yup.date().required("Delivery date is required"),
  return_date: yup.date().nullable(),
  same_return_location: yup.boolean(),
});

export default function CarSearchForm() {
  const router = useRouter();

  const { setSearchCompleted } = useCarSearchStore();

  const {
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    setDeliveryDate,
    setDeliveryTime,
    setReturnDate,
    setReturnTime,
  } = useRentDetailsStore();

  const handleInputSearch = () => {
    setSearchCompleted(true);
    router.push("/reservation/car-choices");
  };

  const formik = useFormik({
    initialValues: {
      delivery_location: "",
      return_location: "",
      delivery_date: deliveryDate || dayjs(),
      delivery_time: deliveryTime || dayjs().hour(9).minute(0),
      return_date: returnDate || dayjs().add(24, "hour"),
      return_time: returnTime || dayjs().hour(9).minute(0).add(1, "hour"),
      same_return_location: true,
    },
    validationSchema: carSearchSchema,
    onSubmit: (values) => {
      const formattedValues = {
        delivery_location: values.delivery_location,
        return_location: values.return_location || values.delivery_location,
        delivery_date: values.delivery_date.toString(),
        delivery_time: values.delivery_time.format("HH:mm"),
        return_date: values.return_date?.toString() ?? null,
        return_time: values.return_time.format("HH:mm"),
      };

      setDeliveryDate(values.delivery_date);
      setDeliveryTime(values.delivery_time);
      setReturnDate(values.return_date);
      setReturnTime(values.return_time);

      handleInputSearch();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-3">
      <div className="flex h-max justify-between gap-2 bg-neutral-100 bg-opacity-20 p-[6px]">
        <LocationInput formik={formik} />
        <DateRangePicker formik={formik} />
        <Button
          type="submit"
          variant="contained"
          className="basis-[12%]"
          onClick={handleInputSearch}
        >
          <div className="flex items-center gap-1 font-overpass font-bold hover:bg-primary/90">
            <SearchIcon className="size-[18px] shrink-0" />
            <span className="translate-y-[1px]">Search</span>
          </div>
        </Button>
      </div>

      <div className="flex items-start justify-between gap-14 text-[11px]">
        <div className="flex items-center gap-2 font-bold">
          <Toggle
            size="30px"
            onColor="#BAF0E2"
            offColor="#ddd"
            handleColor="#fff"
            defaultChecked
            onToggle={(isChecked) =>
              formik.setFieldValue("same_return_location", isChecked)
            }
          />
          <span className="whitespace-nowrap text-sm">
            RETURN TO SAME LOCATION
          </span>
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
