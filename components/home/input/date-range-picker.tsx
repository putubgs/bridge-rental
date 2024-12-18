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
    "day",
  );
  const isSameDay = formik?.values["delivery_date"]?.isSame(
    dayjs().tz(JORDAN_TIMEZONE),
    "day",
  );

  const initialDeliveryTime =
    formik?.values["delivery_time"] ||
    deliveryTime ||
    dayjs().tz(JORDAN_TIMEZONE);
  const initialReturnTime =
    formik?.values["return_time"] ||
    returnTime ||
    dayjs().tz(JORDAN_TIMEZONE).add(1, "hour");

  return (
    <>
      <DateTimePicker
        dateLabel="DELIVERY DATE"
        value={formik?.values["delivery_date"] || deliveryDate}
        onDateChange={(e) => {
          setDeliveryDate(e);
          formik.setFieldValue("delivery_date", e);
          formik.setFieldValue("return_date", e?.add(24, "hour"));
        }}
        minTime={isSameDay ? dayjs().tz(JORDAN_TIMEZONE) : undefined}
        onTimeChange={(time) => {
          if (time) {
            setDeliveryTime(time);
            const currentDeliveryDate = formik.values["delivery_date"];
            const updatedDeliveryDateTime = currentDeliveryDate
              .hour(time.hour())
              .minute(time.minute());
            const updatedReturnDateTime = updatedDeliveryDateTime.add(
              1,
              "hour",
            );
            formik.setFieldValue("delivery_date", updatedDeliveryDateTime);
            formik.setFieldValue("delivery_time", time);

            if (isSameReturnDay) {
              formik.setFieldValue("return_date", updatedReturnDateTime);
            }
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
          setReturnDate(date);
          formik.setFieldValue("return_date", date);
        }}
        onTimeChange={(time) => {
          setReturnTime(time);
          formik.setFieldValue("return_time", time);
        }}
        timeValue={initialReturnTime}
      />
    </>
  );
}
