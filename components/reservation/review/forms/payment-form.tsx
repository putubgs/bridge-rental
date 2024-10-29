import { useRentDetailsStore } from "@/store/reservation-store";
import { Checkbox, TextField } from "@mui/material";
import Image from "next/image";
import { FormEvent } from "react";

export default function PaymentForm() {
  const { totalBundlePrice, totalExtrasPrice, totalProtectionPrice } =
    useRentDetailsStore();

  const totalPrice = totalBundlePrice + totalExtrasPrice + totalProtectionPrice;
  const discountedPrice = totalPrice - totalPrice * 0.05;

  const handleSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <div className="bg-primary-variant-1 p-5">
      <div>
        <h2 className="text-xl font-semibold">Complete your booking</h2>
        <p className="text-neutral-400">
          You can pay your booking now or pay later upon collection of the
          vehicle
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-2 gap-10">
        <div>
          <div className="space-y-2">
            <TextField
              size="medium"
              placeholder="Card number"
              className="w-full bg-white"
            />
            <div className="flex gap-2">
              <TextField
                size="medium"
                placeholder="Expiry date"
                className="w-4/5 bg-white"
              />
              <TextField
                size="medium"
                placeholder="CVV"
                className="w-1/5 bg-white"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-7">
            <div className="flex gap-2">
              <Checkbox
                id="agreement"
                className="!h-fit !border-2 !bg-white !p-0"
              />
              <label htmlFor="agreement" className="text-xs text-neutral-400">
                I acknowledge that I have read, understood and agree to Bridge
                Rent-A-Car Terms and Conditions and Privacy Policy
              </label>
            </div>
            <div className="flex gap-1">
              <div className="relative h-[38px] w-[59px]">
                <Image
                  src={"/assets/img/visa-logo.png"}
                  alt="Visa Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
              <div className="relative h-[38px] w-[59px]">
                <Image
                  src={"/assets/img/mastercard-logo.png"}
                  alt="Visa Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative w-1/2 border-2 border-primary bg-white px-6 pb-5 pt-14">
            <div className="absolute -right-2 top-0 bg-[#FF8181] px-4 py-[1px] text-sm text-white">
              -5%
            </div>
            <h3 className="font-semibold">Pay Now</h3>
            <p className="text-sm">
              Pay your booking now and get a 5% discount
            </p>
            <p className="mb-5 mt-4 font-semibold">
              {discountedPrice.toFixed(2)} JOD
            </p>
            <button className="w-full rounded bg-primary-variant-2 px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3">
              PAY NOW
            </button>
          </div>
          <div className="relative w-1/2 border-2 bg-white px-6 pb-5 pt-14">
            <h3 className="font-semibold">Pay on Delivery</h3>
            <p className="text-sm">
              Book now and pay when you collect the vehicle
            </p>
            <p className="mb-5 mt-4 font-semibold">
              {totalPrice.toFixed(2)} JOD
            </p>
            <button className="w-full rounded bg-[#CBCBCB] px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-neutral-400">
              PAY LATER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
