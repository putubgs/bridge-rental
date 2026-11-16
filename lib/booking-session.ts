import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  useCarSearchStore,
  useRentDetailsStore,
} from "@/store/reservation-store";
import {
  PaymentFormValues,
  PaymentReturn,
  PendingCheckout,
  usePayStore,
} from "@/store/pay-store";
import useLanguageStore from "@/store/useLanguageStore";

dayjs.extend(utc);
dayjs.extend(timezone);

// The reservation lives in memory only; HyperPay's 3-D Secure step leaves the
// site, so the booking is parked in sessionStorage until the shopper returns.
const STORAGE_KEY = "bridge-pending-payment";
const JORDAN_TIMEZONE = "Asia/Amman";
const RENT_DATE_KEYS = [
  "customer_dob",
  "deliveryDate",
  "deliveryTime",
  "returnDate",
  "returnTime",
] as const;

interface BookingSnapshot {
  savedAt: number;
  checkout: PendingCheckout;
  language: "en" | "ar";
  rentDetails: Record<string, unknown>;
  formValues: Omit<PaymentFormValues, "dateOfBirth"> & {
    dateOfBirth: string | null;
  };
}

const toIso = (value: Dayjs | null | undefined) =>
  value && dayjs.isDayjs(value) ? value.toISOString() : null;

const fromIso = (value: unknown) =>
  typeof value === "string" ? dayjs(value).tz(JORDAN_TIMEZONE) : null;

export function saveBookingSnapshot(
  checkout: PendingCheckout,
  formValues: PaymentFormValues,
) {
  const rentState = useRentDetailsStore.getState() as unknown as Record<
    string,
    unknown
  >;
  const rentDetails: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rentState)) {
    if (typeof value === "function") continue;
    rentDetails[key] = (RENT_DATE_KEYS as readonly string[]).includes(key)
      ? toIso(value as Dayjs | null)
      : value;
  }

  const snapshot: BookingSnapshot = {
    savedAt: Date.now(),
    checkout,
    language: useLanguageStore.getState().language,
    rentDetails,
    formValues: { ...formValues, dateOfBirth: toIso(formValues.dateOfBirth) },
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Uploaded documents can push the snapshot past the storage quota.
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...snapshot,
        formValues: { ...snapshot.formValues, idDocument: "", drivingLicense: "" },
      }),
    );
  }
}

export function clearBookingSnapshot() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function getPaymentReturnParams() {
  const params = new URLSearchParams(window.location.search);
  const resourcePath = params.get("resourcePath");
  const checkoutId = params.get("id");
  return resourcePath && checkoutId ? { resourcePath, checkoutId } : null;
}

export function restoreBookingAfterPayment() {
  const returnParams = getPaymentReturnParams();
  if (!returnParams) return false;

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  let snapshot: BookingSnapshot;
  try {
    snapshot = JSON.parse(raw);
  } catch {
    clearBookingSnapshot();
    return false;
  }

  if (snapshot.checkout?.checkoutId !== returnParams.checkoutId) return false;

  const rentDetails = { ...snapshot.rentDetails };
  for (const key of RENT_DATE_KEYS) {
    rentDetails[key] = fromIso(rentDetails[key]);
  }

  const paymentReturn: PaymentReturn = {
    resourcePath: returnParams.resourcePath,
    checkout: snapshot.checkout,
    formValues: {
      ...snapshot.formValues,
      dateOfBirth: fromIso(snapshot.formValues.dateOfBirth),
    },
  };

  useLanguageStore.getState().setLanguage(snapshot.language ?? "en");
  useRentDetailsStore.setState(rentDetails);
  usePayStore.getState().setPaymentReturn(paymentReturn);
  useCarSearchStore.getState().setSearchCompleted(true);
  return true;
}
