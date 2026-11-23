import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isHyperPayTestMode } from "@/lib/hyperpay";

export const dynamic = "force-dynamic";

interface CheckoutRequestBody {
  amount: string | number;
  customer: {
    email: string;
    givenName: string;
    surname: string;
  };
  billing: {
    street1: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
}

const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;
const COUNTRY_PATTERN = /^[A-Z]{2}$/;

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;
  const accessToken = process.env.PAYMENT_ACCESS_TOKEN;
  const entityId = process.env.PAYMENT_ENTITY_ID;

  if (!baseUrl || !accessToken || !entityId) {
    console.error("HyperPay checkout: payment environment is not configured");
    return NextResponse.json(
      { error: "Payment is not configured" },
      { status: 500 },
    );
  }

  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const amount = Number(body.amount);
  const formattedAmount = amount.toFixed(2);
  if (!Number.isFinite(amount) || amount <= 0 || !AMOUNT_PATTERN.test(formattedAmount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const customer = {
    email: clean(body.customer?.email, 128),
    givenName: clean(body.customer?.givenName, 50),
    surname: clean(body.customer?.surname, 50),
  };
  const billing = {
    street1: clean(body.billing?.street1, 100),
    city: clean(body.billing?.city, 80),
    state: clean(body.billing?.state, 50),
    country: clean(body.billing?.country, 3).toUpperCase(),
    postcode: clean(body.billing?.postcode, 16),
  };

  const missing = [
    ...Object.entries(customer).filter(([, value]) => !value).map(([key]) => `customer.${key}`),
    ...Object.entries(billing).filter(([, value]) => !value).map(([key]) => `billing.${key}`),
  ];
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }
  if (!COUNTRY_PATTERN.test(billing.country)) {
    return NextResponse.json(
      { error: "Billing country must be a 2-letter ISO code" },
      { status: 400 },
    );
  }

  const merchantTransactionId = `BR-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const testMode = isHyperPayTestMode(baseUrl);
  // The test gateway only accepts whole amounts. That is the amount the bank
  // confirms, so the booking must remember this figure rather than the cents
  // that were rounded away.
  const gatewayAmount = testMode
    ? `${Math.round(amount)}.00`
    : formattedAmount;

  const params = new URLSearchParams({
    entityId,
    amount: gatewayAmount,
    currency: "JOD",
    paymentType: "DB",
    ...(testMode && { testMode: "EXTERNAL" }),
    merchantTransactionId,
    "customer.email": customer.email,
    "customer.givenName": customer.givenName,
    "customer.surname": customer.surname,
    "billing.street1": billing.street1,
    "billing.city": billing.city,
    "billing.state": billing.state,
    "billing.country": billing.country,
    "billing.postcode": billing.postcode,
    "customParameters[3DS2_enrolled]": "true",
  });

  try {
    const response = await fetch(`${baseUrl}/v1/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
      body: params.toString(),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.id) {
      console.error("HyperPay checkout failed", {
        status: response.status,
        code: data?.result?.code,
        description: data?.result?.description,
        parameterErrors: data?.result?.parameterErrors,
      });
      const parameterErrors: { name: string; message: string }[] =
        data?.result?.parameterErrors ?? [];
      const message = parameterErrors.length
        ? parameterErrors.map((error) => `${error.name}: ${error.message}`).join(", ")
        : data?.result?.description ?? "Payment could not be started";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({
      checkoutId: data.id as string,
      merchantTransactionId,
      amount: gatewayAmount,
    });
  } catch (error) {
    console.error("HyperPay checkout network error", error);
    return NextResponse.json(
      { error: "Could not reach the payment gateway. Please try again." },
      { status: 502 },
    );
  }
}
