import type { BookingEmailStatus } from "@/lib/prepare-booking";

export function bookingSubject(status: BookingEmailStatus, reference: string) {
  switch (status) {
    case "paid":
      return `Your Bridge booking is confirmed — ${reference}`;
    case "pay_on_delivery":
      return `Your Bridge booking is reserved — ${reference}`;
    case "pending":
      return `Your Bridge payment is still processing — ${reference}`;
    case "review":
      return `Your Bridge payment needs a review — ${reference}`;
    default:
      return `Your Bridge payment was not completed — ${reference}`;
  }
}

export function bookingIntro(status: BookingEmailStatus, firstName: string) {
  switch (status) {
    case "paid":
      return `Dear ${firstName}, your card payment is complete and the rental is confirmed. The invoice is attached.`;
    case "pay_on_delivery":
      return `Dear ${firstName}, your rental is reserved. Please pay the total when the car is delivered. The invoice is attached.`;
    case "pending":
      return `Dear ${firstName}, your bank is still processing this payment. Please do not pay again. The quote is attached; use the reference below if you contact us.`;
    case "review":
      return `Dear ${firstName}, a payment came back from the bank, but it did not match this booking. Please do not pay again. Contact us and quote the reference. The quote is attached.`;
    default:
      return `Dear ${firstName}, the card payment was not completed, so this booking is not confirmed. No charge has been made. You can try another card, or pay on delivery.`;
  }
}

export function amountLabel(status: BookingEmailStatus) {
  switch (status) {
    case "paid":
      return "Paid today";
    case "pay_on_delivery":
      return "Due on delivery";
    case "pending":
      return "Amount being processed";
    case "review":
      return "Booking total after discount";
    default:
      return "Amount not charged";
  }
}

export function statusLabel(status: BookingEmailStatus) {
  switch (status) {
    case "paid":
      return "Paid";
    case "pay_on_delivery":
      return "Pay on delivery";
    case "pending":
      return "Pending";
    case "review":
      return "Needs review";
    default:
      return "Not completed";
  }
}
