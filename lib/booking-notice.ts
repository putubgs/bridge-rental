export type BookingOutcome = "success" | "failed" | "pending" | "pay_later";

export interface BookingLine {
  label: string;
  amount: number;
}

export interface BookingNotice {
  outcome: BookingOutcome;
  resourcePath?: string;
  merchantTransactionId?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  vehicleModel: string;
  vehicleType: string;
  bundleLabel: string;
  days: number;
  deliveryWhen: string;
  deliveryLocation: string;
  pickupWhen: string;
  pickupLocation: string;
  lines: BookingLine[];
  paymentMethod: "PAY NOW" | "PAY LATER";
  cardLast4?: string;
  cardExpiry?: string;
  paymentReference?: string;
  invoicePdf?: string;
}

const sentNoticeKeys = new Set<string>();

export async function notifyBooking(notice: BookingNotice) {
  const key =
    notice.resourcePath ||
    [
      notice.outcome,
      notice.customer.email,
      notice.deliveryWhen,
      notice.pickupWhen,
      notice.vehicleModel,
    ].join("|");
  if (sentNoticeKeys.has(key)) return;
  sentNoticeKeys.add(key);

  try {
    const response = await fetch("/api/email/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notice),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      console.error("Booking email was not sent", data?.error ?? response.status);
    }
  } catch (error) {
    console.error("Booking email request failed", error);
  }
}
