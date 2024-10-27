import dayjs from "dayjs";
import DateTimePicker from "./date-time-picker";

export default function DateRangePicker({ formik }: { formik: any }) {
  const isSameReturnDay = formik?.values["return_date"]?.isSame(
    formik?.values["delivery_date"],
    "day",
  );
  const isSameDay = formik?.values["delivery_date"]?.isSame(dayjs.tz(), "day");

  return (
    <>
      <DateTimePicker
        dateLabel="DELIVERY DATE"
        value={formik?.values["delivery_date"]}
        onDateChange={(e) => {
          formik.setFieldValue("delivery_date", e);
          formik.setFieldValue("return_date", e?.add(24, "hour"));
        }}
        minTime={isSameDay ? dayjs.tz() : undefined}
        onTimeChange={(time) => {
          if (time) {
            const currentDeliveryDate = formik.values["delivery_date"];
            const updatedDeliveryDateTime = currentDeliveryDate
              .hour(time.hour())
              .minute(time.minute());
            const updatedReturnDateTime = updatedDeliveryDateTime.add(
              1,
              "hour",
            );

            formik.setFieldValue("delivery_date", updatedDeliveryDateTime);

            if (isSameReturnDay) {
              formik.setFieldValue("return_date", updatedReturnDateTime);
            }
          }
        }}
      />
      <DateTimePicker
        dateLabel="RETURN DATE"
        minDate={formik?.values["delivery_date"] ?? dayjs.tz()}
        minTime={
          isSameReturnDay
            ? formik?.values["delivery_date"].add(1, "hour")
            : undefined
        }
        value={formik?.values["return_date"]}
        onDateChange={(date) => {
          if (date) {
            const deliveryDate = formik.values["delivery_date"] ?? dayjs();
            const updatedDateTime = date
              .hour(deliveryDate.hour())
              .minute(deliveryDate.minute())
              .add(1, "hour");

            formik.setFieldValue("return_date", updatedDateTime);
          }
        }}
        onTimeChange={(time) => {
          if (time) {
            const deliveryDate = formik.values["delivery_date"] ?? dayjs();
            const currentReturnDate = formik.values["return_date"] ?? dayjs();

            const updatedDateTime = currentReturnDate
              .hour(time.hour())
              .minute(time.minute());

            const minimumReturnTime = deliveryDate.add(1, "hour");
            if (updatedDateTime.isBefore(minimumReturnTime)) {
              formik.setFieldValue("return_date", minimumReturnTime);
            } else {
              formik.setFieldValue("return_date", updatedDateTime);
            }
          }
        }}
      />
    </>
  );
}
