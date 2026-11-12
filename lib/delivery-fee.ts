import { BundleType } from "@/lib/enums";

const DELIVERY_FEES: Partial<Record<BundleType, number>> = {
  [BundleType.bundle2]: 3,
  [BundleType.bundle3]: 5,
};

export function getDeliveryFee(
  bundle: BundleType | string | null | undefined,
): number {
  if (!bundle) return 0;
  return DELIVERY_FEES[bundle as BundleType] ?? 0;
}
