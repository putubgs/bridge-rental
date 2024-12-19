import { useRentDetailsStore } from "@/store/reservation-store";
import DateTimePicker from "./date-time-picker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const JORDAN_TIMEZONE = "Asia/Amman";

export default function DateRangePicker({ formik }: { formik: any }) {
  const {
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
  } = useRentDetailsStore();

  const isSameReturnDay = formik?.values["return_date"]?.isSame(
    formik?.values["delivery_date"],
    "day"
  );
  
  const isSameDay = formik?.values["delivery_date"]?.isSame(
    dayjs().tz(JORDAN_TIMEZONE),
    "day"
  );

  const initialDeliveryTime = formik?.values["delivery_time"] || 
    deliveryTime || 
    dayjs().tz(JORDAN_TIMEZONE);
    
  const initialReturnTime = formik?.values["return_time"] || 
    returnTime || 
    dayjs().tz(JORDAN_TIMEZONE);

  const handleDeliveryDateTimeChange = (date: any, time: any) => {
    // Create a complete delivery datetime
    const deliveryDateTime = date
      .hour(time.hour())
      .minute(time.minute())
      .tz(JORDAN_TIMEZONE);

    // Update delivery date and time in store and formik
    setDeliveryDate(deliveryDateTime);
    setDeliveryTime(deliveryDateTime);
    formik.setFieldValue("delivery_date", deliveryDateTime);
    formik.setFieldValue("delivery_time", deliveryDateTime);

    // Calculate return datetime (delivery + 24 hours)
    const returnDateTime = deliveryDateTime.add(24, "hour");

    // Update return date and time
    setReturnDate(returnDateTime);
    setReturnTime(returnDateTime);
    formik.setFieldValue("return_date", returnDateTime);
    formik.setFieldValue("return_time", returnDateTime);
  };

  const handleReturnDateTimeChange = (date: any, time: any) => {
    // Create a complete return datetime
    const returnDateTime = date
      .hour(time.hour())
      .minute(time.minute())
      .tz(JORDAN_TIMEZONE);

    // Ensure return time is at least 1 hour after delivery
    const minReturnTime = formik.values["delivery_date"].add(1, "hour");
    const finalReturnDateTime = returnDateTime.isBefore(minReturnTime) 
      ? minReturnTime 
      : returnDateTime;

    // Update return date and time in store and formik
    setReturnDate(finalReturnDateTime);
    setReturnTime(finalReturnDateTime);
    formik.setFieldValue("return_date", finalReturnDateTime);
    formik.setFieldValue("return_time", finalReturnDateTime);
  };

  return (
    <>
      <DateTimePicker
        dateLabel="DELIVERY DATE"
        value={formik?.values["delivery_date"] || deliveryDate}
        onDateChange={(date) => {
          const time = formik.values["delivery_time"] || initialDeliveryTime;
          handleDeliveryDateTimeChange(date, time);
        }}
        minTime={isSameDay ? dayjs().tz(JORDAN_TIMEZONE) : undefined}
        onTimeChange={(time) => {
          if (time) {
            const date = formik.values["delivery_date"] || dayjs().tz(JORDAN_TIMEZONE);
            handleDeliveryDateTimeChange(date, time);
          }
        }}
        timeValue={initialDeliveryTime}
      />
      <DateTimePicker
        dateLabel="RETURN DATE"
        minDate={formik?.values["delivery_date"] ?? dayjs().tz(JORDAN_TIMEZONE)}
        minTime={
          isSameReturnDay
            ? formik?.values["delivery_date"].add(1, "hour")
            : undefined
        }
        value={formik?.values["return_date"] || returnDate}
        onDateChange={(date) => {
          const time = formik.values["return_time"] || initialReturnTime;
          handleReturnDateTimeChange(date, time);
        }}
        onTimeChange={(time) => {
          if (time) {
            const date = formik.values["return_date"] || formik.values["delivery_date"].add(24, "hour");
            handleReturnDateTimeChange(date, time);
          }
        }}
        timeValue={initialReturnTime}
      />
    </>
  );
}