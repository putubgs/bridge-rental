import { NextResponse } from "next/server";
import {
  getHyperPayOutcome,
  type HyperPayVerifiedPayment,
} from "@/lib/hyperpay";

export const dynamic = "force-dynamic";

const RESOURCE_PATH_PATTERN = /^\/v1\/checkouts\/[A-Za-z0-9.\-_]+\/payment$/;

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;
  const accessToken = process.env.PAYMENT_ACCESS_TOKEN;
  const entityId = process.env.PAYMENT_ENTITY_ID;

  if (!baseUrl || !accessToken || !entityId) {
    console.error("HyperPay status: payment environment is not configured");
    return NextResponse.json(
      { error: "Payment is not configured" },
      { status: 500 },
    );
  }

  const resourcePath = new URL(request.url).searchParams.get("resourcePath");
  if (!resourcePath || !RESOURCE_PATH_PATTERN.test(resourcePath)) {
    return NextResponse.json({ error: "Invalid resourcePath" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${baseUrl}${resourcePath}?entityId=${encodeURIComponent(entityId)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );
    const data = await response.json().catch(() => null);
    const code: string = data?.result?.code ?? "";

    const payment: HyperPayVerifiedPayment = {
      outcome: getHyperPayOutcome(code),
      code,
      description: data?.result?.description ?? "Unknown payment result",
      paymentId: data?.id ?? null,
      merchantTransactionId: data?.merchantTransactionId ?? null,
      amount: data?.amount ?? null,
      currency: data?.currency ?? null,
      card: data?.card
        ? {
            last4Digits: data.card.last4Digits ?? null,
            expiryMonth: data.card.expiryMonth ?? null,
            expiryYear: data.card.expiryYear ?? null,
            holder: data.card.holder ?? null,
            brand: data.paymentBrand ?? null,
          }
        : null,
    };

    return NextResponse.json(payment);
  } catch (error) {
    console.error("HyperPay status network error", error);
    return NextResponse.json(
      { error: "Could not verify the payment. Please contact support." },
      { status: 502 },
    );
  }
}
