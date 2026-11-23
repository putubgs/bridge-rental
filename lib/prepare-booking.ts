import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { BookingNotice } from "@/lib/booking-notice";
import {
  getHyperPayOutcome,
  isHyperPaySessionExpired,
  type HyperPayVerifiedPayment,
} from "@/lib/hyperpay";

dayjs.extend(utc);
dayjs.extend(timezone);

export type BookingEmailStatus =
  | "paid"
  | "pay_on_delivery"
  | "failed"
  | "pending"
  | "review";

export interface PreparedBooking {
  status: BookingEmailStatus;
  reference: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  firstName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleModel: string;
  vehicleType: string;
  bundleLabel: string;
  days: number;
  deliveryWhen: string;
  deliveryLocation: string;
  pickupWhen: string;
  pickupLocation: string;
  lines: { label: string; amount: number }[];
  subtotal: number;
  discount: number;
  amountDue: number;
  chargedAmount: number | null;
  cardLast4: string;
  cardExpiry: string;
  paymentReference: string;
  dedupeKey: string;
}

const OUTCOMES = new Set(["success", "failed", "pending", "pay_later"]);
const METHODS = new Set(["PAY NOW", "PAY LATER"]);

export function prepareBookingEmail(
  input: BookingNotice,
  verified: HyperPayVerifiedPayment | null,
): { ok: true; booking: PreparedBooking } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid booking" };
  }
  if (!OUTCOMES.has(input.outcome) || !METHODS.has(input.paymentMethod)) {
    return { ok: false, error: "Invalid booking" };
  }

  const firstName = text(input.customer?.firstName, 80);
  const lastName = text(input.customer?.lastName, 80);
  const email = text(input.customer?.email, 160).toLowerCase();
  const phone = text(input.customer?.phone, 40);
  if (!firstName || !lastName || !isEmail(email)) {
    return { ok: false, error: "A valid customer name and email are required" };
  }

  const rawLines = Array.isArray(input.lines) ? input.lines : [];
  if (rawLines.length < 1 || rawLines.length > 40) {
    return { ok: false, error: "The booking price breakdown is missing" };
  }

  const lines = rawLines.map((line) => ({
    label: text(line?.label, 160),
    amount: roundMoney(Number(line?.amount)),
  }));
  if (lines.some((line) => !line.label || line.amount < 0 || line.amount > 100000)) {
    return { ok: false, error: "The booking price breakdown is invalid" };
  }

  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.amount, 0));
  const payNow = input.paymentMethod === "PAY NOW";
  const amountDue = payNow ? Number((subtotal * 0.95).toFixed(2)) : subtotal;
  const discount = roundMoney(subtotal - amountDue);

  let status: BookingEmailStatus;
  let chargedAmount: number | null = null;
  let cardLast4 = "";
  let cardExpiry = "";
  let paymentReference = "";

  if (verified) {
    const charged = Number(verified.amount);
    const idMatches =
      !verified.merchantTransactionId ||
      !input.merchantTransactionId ||
      verified.merchantTransactionId === input.merchantTransactionId;
    const currencyMatches = !verified.currency || verified.currency === "JOD";

    const earlierOutcome = getHyperPayOutcome(input.resultCode);
    const bankDeclined = /^(100\.|300\.|800\.)/.test(verified.code);
    const sessionExpired = isHyperPaySessionExpired(
      verified.code,
      verified.description,
    );

    if (
      verified.outcome === "success" &&
      idMatches &&
      currencyMatches
    ) {
      status = "paid";
      chargedAmount = reportedCharge(charged);
    } else if (earlierOutcome === "success" && (sessionExpired || !bankDeclined)) {
      status = "paid";
      chargedAmount = reportedCharge(charged);
    } else if (verified.outcome === "success") {
      status = "review";
      chargedAmount = reportedCharge(charged);
    } else if (verified.outcome === "pending") {
      status = "pending";
    } else {
      status = "failed";
    }

    cardLast4 = digits(verified.card?.last4Digits);
    const month = digits(verified.card?.expiryMonth);
    const year = digits(verified.card?.expiryYear).slice(-2);
    cardExpiry = month && year ? `${month}/${year}` : "";
    paymentReference = text(verified.paymentId, 80);
  } else if (
    input.outcome === "pay_later" &&
    input.paymentMethod === "PAY LATER"
  ) {
    status = "pay_on_delivery";
  } else {
    return {
      ok: false,
      error: "A card payment has to be verified before the email is sent",
    };
  }

  const reference =
    text(input.merchantTransactionId, 80) ||
    text(verified?.merchantTransactionId, 80) ||
    `BR-${Date.now()}`;
  const invoiceNumber = reference.replace(/[^\w.-]+/g, "-");

  const booking: PreparedBooking = {
    status,
    reference,
    invoiceNumber,
    invoiceDate: dayjs().tz("Asia/Amman").format("MMM DD, YYYY"),
    customerName: `${firstName} ${lastName}`,
    firstName,
    customerEmail: email,
    customerPhone: phone,
    vehicleModel: text(input.vehicleModel, 80) || "Rental vehicle",
    vehicleType: text(input.vehicleType, 80),
    bundleLabel: text(input.bundleLabel, 80) || "Rental",
    days: Math.max(0, Math.min(366, Math.round(Number(input.days) || 0))),
    deliveryWhen: text(input.deliveryWhen, 80),
    deliveryLocation: text(input.deliveryLocation, 160),
    pickupWhen: text(input.pickupWhen, 80),
    pickupLocation: text(input.pickupLocation, 160),
    lines,
    subtotal,
    discount,
    amountDue,
    chargedAmount,
    cardLast4,
    cardExpiry,
    paymentReference,
    dedupeKey: "",
  };
  if (
    booking.status === "paid" &&
    booking.chargedAmount !== null &&
    booking.chargedAmount > 0
  ) {
    booking.amountDue = booking.chargedAmount;
  }
  booking.dedupeKey = [
    "pay-later",
    booking.customerEmail,
    booking.deliveryWhen,
    booking.pickupWhen,
    booking.vehicleModel,
    booking.amountDue.toFixed(2),
  ].join("|");

  return { ok: true, booking };
}

export function formatMoney(amount: number) {
  return `${amount.toFixed(2)} JOD`;
}

function roundMoney(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100) / 100;
}

function reportedCharge(value: number) {
  if (!Number.isFinite(value) || value <= 0) return null;
  return roundMoney(value);
}

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function digits(value: string | null | undefined) {
  return (value ?? "").replace(/\D/g, "").slice(0, 6);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
