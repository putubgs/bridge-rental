import { NextResponse } from "next/server";
import type { BookingNotice } from "@/lib/booking-notice";
import { verifyHyperPayResource } from "@/lib/hyperpay-verify";
import { prepareBookingEmail } from "@/lib/prepare-booking";
import { sendBookingEmail } from "@/lib/send-booking-email";

const sentNotices = new Set<string>();

function readInvoicePdf(value: unknown) {
  if (typeof value !== "string") return null;
  const base64 = (value.includes(",") ? value.split(",").pop() : value) ?? "";
  const compact = base64.replace(/\s/g, "");
  if (!compact.startsWith("JVBERi") || compact.length > 20_000_000) return null;
  if (!/^[A-Za-z0-9+/=]+$/.test(compact)) return null;
  return compact;
}

export async function POST(request: Request) {
  let body: BookingNotice;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const resourcePath =
    typeof body?.resourcePath === "string" ? body.resourcePath : "";

  const verified = resourcePath
    ? await verifyHyperPayResource(resourcePath)
    : null;
  if (verified && !verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: verified.status });
  }

  const prepared = prepareBookingEmail(
    body,
    verified && verified.ok ? verified.payment : null,
  );
  if (!prepared.ok) {
    return NextResponse.json({ error: prepared.error }, { status: 400 });
  }

  const key = resourcePath || prepared.booking.dedupeKey;
  if (sentNotices.has(key)) {
    return NextResponse.json({ sent: true, duplicate: true });
  }

  try {
    const result = await sendBookingEmail(
      prepared.booking,
      readInvoicePdf(body.invoicePdf),
    );
    if (result.sent.length === 0) {
      return NextResponse.json(
        { error: "The booking email could not be sent." },
        { status: 502 },
      );
    }
    sentNotices.add(key);
    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Booking email", error);
    const message =
      error instanceof Error && error.message === "Email is not configured"
        ? "Email is not configured"
        : "The booking email could not be sent.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
