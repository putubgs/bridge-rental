// Result code groups from https://hyperpay.docs.oppwa.com/reference/resultCodes
const SUCCESS_PATTERN = /^(000\.000\.|000\.100\.1|000\.[36]|000\.400\.[1][12]0)/;
const SUCCESS_REVIEW_PATTERN = /^(000\.400\.0[^3]|000\.400\.100)/;
const PENDING_PATTERN = /^(000\.200)/;

export type HyperPayOutcome = "success" | "pending" | "failed";

export function getHyperPayOutcome(code: string | undefined): HyperPayOutcome {
  if (!code) return "failed";
  if (SUCCESS_PATTERN.test(code) || SUCCESS_REVIEW_PATTERN.test(code)) {
    return "success";
  }
  if (PENDING_PATTERN.test(code)) return "pending";
  return "failed";
}

export function isHyperPayTestMode(baseUrl: string | undefined) {
  return Boolean(baseUrl?.includes("test.oppwa.com"));
}

// A completed payment can only be read back for a short time. The next lookup
// then returns 200.300.404 / "No payment session found" even though the charge
// already succeeded. JoLimo treats that the same way.
export function isHyperPaySessionExpired(
  code: string | undefined,
  description: string | undefined,
) {
  return (
    code === "200.300.404" ||
    /no payment session/i.test(description ?? "") ||
    /session (has )?expired/i.test(description ?? "")
  );
}

export interface HyperPayVerifiedPayment {
  outcome: HyperPayOutcome;
  code: string;
  description: string;
  paymentId: string | null;
  merchantTransactionId: string | null;
  amount: string | null;
  currency: string | null;
  card: {
    last4Digits: string | null;
    expiryMonth: string | null;
    expiryYear: string | null;
    holder: string | null;
    brand: string | null;
  } | null;
}
