import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/components";
import BookingEmail from "@/emails/BookingEmail";
import PaymentFailedEmail, {
  paymentFailedText,
} from "@/emails/PaymentFailedEmail";
import { bookingIntro, bookingSubject } from "@/lib/booking-copy";
import { formatMoney, type PreparedBooking } from "@/lib/prepare-booking";

const COPY_TO = "putubaguswidia@gmail.com";

export async function sendBookingEmail(
  booking: PreparedBooking,
  invoicePdf: string | null,
) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    throw new Error("Email is not configured");
  }

  sgMail.setApiKey(apiKey);

  const paymentFailed = booking.status === "failed";
  const includeInvoice = Boolean(invoicePdf) && !paymentFailed;
  const html = await render(
    paymentFailed
      ? PaymentFailedEmail({ firstName: booking.firstName })
      : BookingEmail({ booking, includeInvoice }),
  );
  const logo = fs.readFileSync(
    path.join(process.cwd(), "public/assets/img/brand-logo-email.png"),
  );
  const recipients = Array.from(
    new Set(
      [booking.customerEmail, COPY_TO].map((email) => email.trim().toLowerCase()),
    ),
  );

  const inlineLogo = {
    content: logo.toString("base64"),
    filename: "bridge-logo.png",
    type: "image/png",
    disposition: "inline" as const,
    content_id: "bridge-email-logo",
  };
  const sent: string[] = [];
  const failed: string[] = [];

  for (const to of recipients) {
    try {
      await sgMail.send({
        to,
        from: {
          name: process.env.SENDGRID_FROM_NAME || "Bridge Rent-A-Car",
          email: fromEmail,
        },
        replyTo: {
          name: "Bridge Rent-A-Car",
          email: "info@bridgerentalcar.com",
        },
        subject: bookingSubject(booking.status, booking.reference),
        html,
        text: paymentFailed
          ? paymentFailedText(booking.firstName)
          : plainText(booking, includeInvoice),
        categories: ["bridge-booking", booking.status],
        headers: {
          "X-Entity-Ref-ID": booking.reference,
        },
        trackingSettings: {
          clickTracking: { enable: false },
          openTracking: { enable: true },
        },
        attachments: [
          ...(includeInvoice && invoicePdf
            ? [
                {
                  content: invoicePdf,
                  filename: `Invoice-${booking.invoiceNumber}.pdf`,
                  type: "application/pdf",
                  disposition: "attachment" as const,
                },
              ]
            : []),
          inlineLogo,
        ],
      });
      sent.push(to);
    } catch (error) {
      const details = sendGridError(error);
      console.error(`Booking email failed for ${to}`, details.join("; ") || error);
      failed.push(to);
    }
  }

  return { sent, failed };
}

function sendGridError(error: unknown) {
  if (!error || typeof error !== "object" || !("response" in error)) return [];
  const body = (error as { response?: { body?: { errors?: { message?: string; field?: string }[] } } })
    .response?.body;
  return (body?.errors ?? []).map((item) =>
    [item.field, item.message].filter(Boolean).join(": "),
  );
}

function plainText(booking: PreparedBooking, includeInvoice: boolean) {
  const lines = booking.lines
    .map((line) => `${line.label}: ${formatMoney(line.amount)}`)
    .join("\n");
  const discount =
    booking.discount > 0
      ? `Pay now discount (5%): - ${formatMoney(booking.discount)}\n`
      : "";

  return `${bookingIntro(booking.status, booking.firstName)}

Reference: ${booking.reference}
Vehicle: ${booking.vehicleModel}
Delivery: ${booking.deliveryWhen} · ${booking.deliveryLocation}
Pick-up: ${booking.pickupWhen} · ${booking.pickupLocation}

${lines}
Subtotal: ${formatMoney(booking.subtotal)}
${discount}Amount due: ${formatMoney(booking.amountDue)}
${includeInvoice ? "\nThe invoice is attached.\n" : ""}

Bridge Rent-A-Car
info@bridgerentalcar.com
`;
}
