import dayjs, { Dayjs } from "dayjs";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function countDays(
  deliveryDate: Dayjs | null,
  deliveryTime: Dayjs | null,
  returnDate: Dayjs | null,
  returnTime: Dayjs | null,
) {
  if (!deliveryDate || !deliveryTime || !returnDate || !returnTime) return 0;

  const startDateTime = dayjs(deliveryDate).set(
    "hour",
    dayjs(deliveryTime).hour(),
  );
  const endDateTime = dayjs(returnDate).set("hour", dayjs(returnTime).hour());

  const totalHours = endDateTime.diff(startDateTime, "hour");
  const totalDays = Math.ceil(totalHours / 24);

  return totalDays;
}
