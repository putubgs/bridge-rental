import dayjs from "dayjs";
import DateTimePicker from "./date-time-picker";

export default function DateRangePicker({ formik }: { formik: any }) {
  const isSameDay = formik?.values["return_date"]?.isSame(
    formik?.values["delivery_date"],
    "day",
  );

  return (
    <>
      <DateTimePicker
        dateLabel="DELIVERY DATE"
        defaultDateTime={dayjs.tz()}
        value={formik?.values["delivery_date"]}
        onDateChange={(e) => formik.setFieldValue("delivery_date", e)}
        onTimeChange={(time) => {
          if (time) {
            const currentDeliveryDate = formik.values["delivery_date"];
            const updatedDateTime = currentDeliveryDate
              .hour(time.hour())
              .minute(time.minute());
            formik.setFieldValue("delivery_date", updatedDateTime);
          }
        }}
      />
      <DateTimePicker
        dateLabel="RETURN DATE"
        minDate={formik?.values["delivery_date"] ?? dayjs()}
        minTime={isSameDay ? formik?.values["delivery_date"] : undefined}
        value={formik?.values["return_date"]}
        onDateChange={(e) => formik.setFieldValue("return_date", e)}
        onTimeChange={(time) => {
          if (time) {
            const currentDeliveryDate =
              formik.values["return_date"] ?? dayjs.tz();
            const updatedDateTime = currentDeliveryDate
              .hour(time.hour())
              .minute(time.minute());
            formik.setFieldValue("return_date", updatedDateTime);
          }
        }}
      />
    </>
  );
}
