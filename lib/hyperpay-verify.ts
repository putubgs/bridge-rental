import {
  getHyperPayOutcome,
  type HyperPayVerifiedPayment,
} from "@/lib/hyperpay";

export const RESOURCE_PATH_PATTERN =
  /^\/v1\/checkouts\/[A-Za-z0-9.\-_]+\/payment$/;

export async function verifyHyperPayResource(resourcePath: string): Promise<
  | { ok: true; payment: HyperPayVerifiedPayment }
  | { ok: false; status: number; error: string }
> {
  const baseUrl = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;
  const accessToken = process.env.PAYMENT_ACCESS_TOKEN;
  const entityId = process.env.PAYMENT_ENTITY_ID;

  if (!baseUrl || !accessToken || !entityId) {
    console.error("HyperPay: payment environment is not configured");
    return { ok: false, status: 500, error: "Payment is not configured" };
  }

  if (!RESOURCE_PATH_PATTERN.test(resourcePath)) {
    return { ok: false, status: 400, error: "Invalid resourcePath" };
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

    return { ok: true, payment };
  } catch (error) {
    console.error("HyperPay status network error", error);
    return {
      ok: false,
      status: 502,
      error: "Could not verify the payment. Please contact support.",
    };
  }
}
