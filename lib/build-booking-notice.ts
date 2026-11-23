import { getDeliveryFee } from "@/lib/delivery-fee";
import type { BookingNotice, BookingOutcome } from "@/lib/booking-notice";
import { useCarStore } from "@/store/car-store";
import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";

export function noticeFromStores(input: {
  outcome: BookingOutcome;
  customer: BookingNotice["customer"];
  paymentMethod: BookingNotice["paymentMethod"];
  resourcePath?: string;
  merchantTransactionId?: string;
  cardLast4?: string;
  cardExpiry?: string;
  paymentReference?: string;
  vehicle?: { model: string; type: string };
}): BookingNotice {
  const rent = useRentDetailsStore.getState();
  const car = useCarStore
    .getState()
    .carModels.find((vehicle) => vehicle.car_id === rent.car_id);
  const days = countDays(
    rent.deliveryDate,
    rent.deliveryTime,
    rent.returnDate,
    rent.returnTime,
  );
  const dayLabel = `${days} day${days === 1 ? "" : "s"}`;
  const bundleLabel = (rent.selected_bundle ?? "Rental").split("_").join(" ");
  const vehicleModel =
    car?.car_model || input.vehicle?.model || "Rental vehicle";
  const vehicleType = car?.car_type || input.vehicle?.type || "";

  const lines: BookingNotice["lines"] = [
    {
      label: `${bundleLabel} · ${vehicleModel} · ${dayLabel}`,
      amount: roundMoney(Number(rent.totalBundlePrice) || 0),
    },
  ];

  const deliveryFee = getDeliveryFee(rent.selected_bundle);
  if (deliveryFee > 0) {
    lines.push({ label: "Delivery fee", amount: roundMoney(deliveryFee) });
  }

  if (rent.selected_protection) {
    lines.push({
      label: `${rent.selected_protection} · ${dayLabel}`,
      amount: roundMoney(Number(rent.totalProtectionPrice) || 0),
    });
  }

  for (const name of rent.selected_extras) {
    const price =
      rent.extras.find((offer) => offer.offer_name === name)?.price ?? 0;
    lines.push({
      label: `${name} · ${dayLabel}`,
      amount: roundMoney(price * days),
    });
  }

  for (const name of rent.selected_children_extras) {
    const price =
      rent.childrenExtras.find((offer) => offer.offer_name === name)?.price ??
      0;
    const quantity = rent.childrenSeatsQuantity[name] || 1;
    lines.push({
      label: `${name.split("_").join(" ")} (${quantity}x) · ${dayLabel}`,
      amount: roundMoney(price * quantity * days),
    });
  }

  const when = (date: typeof rent.deliveryDate, time: typeof rent.deliveryTime) => {
    if (!date) return "";
    const clock = time ? time.format("hh:mm A") : "";
    return clock
      ? `${date.format("dddd, MMM DD, YYYY")} at ${clock}`
      : date.format("dddd, MMM DD, YYYY");
  };

  return {
    outcome: input.outcome,
    resourcePath: input.resourcePath,
    merchantTransactionId: input.merchantTransactionId,
    customer: input.customer,
    vehicleModel,
    vehicleType,
    bundleLabel,
    days,
    deliveryWhen: when(rent.deliveryDate, rent.deliveryTime),
    deliveryLocation: rent.deliveryLocation,
    pickupWhen: when(rent.returnDate, rent.returnTime),
    pickupLocation: rent.returnLocation,
    lines,
    paymentMethod: input.paymentMethod,
    cardLast4: input.cardLast4,
    cardExpiry: input.cardExpiry,
    paymentReference: input.paymentReference,
  };
}

function roundMoney(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100) / 100;
}
