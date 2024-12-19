"use client";

import { Button } from "@mui/material";
import { useFormik } from "formik";
import { SearchIcon } from "lucide-react";
import * as yup from "yup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const JORDAN_TIMEZONE = "Asia/Amman";
dayjs.tz.setDefault(JORDAN_TIMEZONE);

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
    deliveryLocation,
    returnLocation,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    setDeliveryDate,
    setDeliveryTime,
    setDeliveryLocation,
    setReturnLocation,
    setReturnDate,
    setReturnTime,
    resetRentDetails,
  } = useRentDetailsStore();

  const deliveryDateInJordan = deliveryDate
    ? dayjs(deliveryDate).tz(JORDAN_TIMEZONE)
    : dayjs().tz(JORDAN_TIMEZONE).add(2, "hour");
  const returnDateInJordan = returnDate
    ? dayjs(returnDate).tz(JORDAN_TIMEZONE)
    : dayjs().tz(JORDAN_TIMEZONE).add(26, "hour");
  const deliveryTimeInJordan = deliveryTime
    ? dayjs(deliveryTime).tz(JORDAN_TIMEZONE)
    : dayjs().tz(JORDAN_TIMEZONE).add(26, "hour");
  const returnTimeInJordan = returnTime
    ? dayjs(returnTime).tz(JORDAN_TIMEZONE)
    : dayjs().tz(JORDAN_TIMEZONE).add(26, "hour");

  const formik = useFormik({
    initialValues: {
      delivery_location: deliveryLocation || "",
      return_location: returnLocation || "",
      delivery_date: deliveryDateInJordan,
      delivery_time:
        deliveryTimeInJordan ||
        dayjs()
          .tz(JORDAN_TIMEZONE)
          .hour(dayjs().hour())
          .minute(dayjs().minute()),
      return_date: returnDateInJordan,
      return_time:
        returnTimeInJordan ||
        dayjs()
          .tz(JORDAN_TIMEZONE)
          .hour(dayjs().hour())
          .minute(dayjs().minute()),
      same_return_location: true,
    },
    validationSchema: carSearchSchema,
    onSubmit: (values) => {
      // Format the dates with proper timezone handling
      const deliveryDateTime = values.delivery_date
        .hour(values.delivery_time.hour())
        .minute(values.delivery_time.minute())
        .tz(JORDAN_TIMEZONE);

      const returnDateTime = values.return_date
        .hour(values.return_time.hour())
        .minute(values.return_time.minute())
        .tz(JORDAN_TIMEZONE);

      // Reset the RentDetailsStore before storing new data
      resetRentDetails();

      // Format the values with the combined date and time
      const formattedValues = {
        delivery_location: values.delivery_location,
        return_location: values.same_return_location
          ? values.delivery_location
          : values.return_location,
        delivery_date: deliveryDateTime.format("YYYY-MM-DD"),
        delivery_time: deliveryDateTime.format("HH:mm"),
        return_date: returnDateTime.format("YYYY-MM-DD"),
        return_time: returnDateTime.format("HH:mm"),
      };

      // Set the locations first
      setDeliveryLocation(formattedValues.delivery_location);
      setReturnLocation(formattedValues.return_location);

      // Then update the dates and times with the combined datetime objects
      setDeliveryDate(deliveryDateTime);
      setDeliveryTime(deliveryDateTime);
      setReturnDate(returnDateTime);
      setReturnTime(returnDateTime);

      // Mark the search as completed
      setSearchCompleted(true);

      // Navigate to the next page
      router.push("/reservation/car-choices");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5 space-y-3">
      <div className="flex h-max flex-col gap-3 bg-neutral-100 bg-opacity-20 p-[6px] md:flex-row md:justify-between md:gap-2">
        <LocationInput formik={formik} />
        <div className="flex items-center gap-2 font-bold md:hidden">
          <Toggle
            size="20px"
            onColor="#BAF0E2"
            offColor="#ddd"
            handleColor="#fff"
            defaultChecked
            onToggle={(isChecked) =>
              formik.setFieldValue("same_return_location", isChecked)
            }
          />
          <span className="whitespace-nowrap pt-1 text-sm text-[#868686]">
            PICK-UP TO SAME LOCATION
          </span>
        </div>
        <DateRangePicker formik={formik} />
        <Button
          type="submit"
          variant="contained"
          className="basis-[12%] py-2 md:py-0"
        >
          <div className="flex items-center gap-1 font-overpass font-bold hover:bg-primary/90">
            <SearchIcon className="size-[18px] shrink-0" />
            <span className="translate-y-[1px]">Search</span>
          </div>
        </Button>
      </div>

      <div className="flex items-start justify-between gap-14 text-[11px]">
        <div className="hidden items-center gap-2 font-bold md:flex">
          <Toggle
            size="20px"
            onColor="#BAF0E2"
            offColor="#ddd"
            handleColor="#fff"
            defaultChecked
            onToggle={(isChecked) =>
              formik.setFieldValue("same_return_location", isChecked)
            }
          />
          <span className="whitespace-nowrap pt-1 text-sm">
            PICK-UP TO SAME LOCATION
          </span>
        </div>
        <div className="text-start text-black md:text-end md:text-white">
          <p>
            *KINDLY ENSURE THAT YOUR BOOKING IS MADE AT LEAST 2 HOURS PRIOR TO
            THE SCHEDULED VEHICLE DELIVERY. FOR IMMEDIATE BOOKINGS, PLEASE
            CONTACT OUR <span className="text-primary">CUSTOMER SERVICE</span>{" "}
            TEAM
          </p>
          <p className="pt-2 md:pt-0">
            *BOOKINGS ARE COUNTED ON A PER-DAY BASIS (24 HOURS)
          </p>
        </div>
      </div>
    </form>
  );
}
