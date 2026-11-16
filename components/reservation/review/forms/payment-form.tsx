import { getDeliveryFee } from "@/lib/delivery-fee";
import { BILLING_COUNTRIES } from "@/lib/countries";
import { useRentDetailsStore } from "@/store/reservation-store";
import { PendingCheckout } from "@/store/pay-store";
import { Checkbox, Stack, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";

const HyperPayWidget = dynamic(
  () => import("@/components/reservation/review/payment/hyperpay-widget"),
  { ssr: false },
);

const inputSx = {
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", md: "16px" },
  },
};

function BillingField({
  formik,
  name,
  placeholder,
  className,
}: {
  formik: any;
  name: string;
  placeholder: string;
  className?: string;
}) {
  const error = formik.errors[name];
  return (
    <Stack spacing={1} className={className}>
      <TextField
        size="medium"
        placeholder={placeholder}
        className="w-full bg-white"
        sx={inputSx}
        value={formik.values[name]}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        error={Boolean(error)}
        inputProps={{ "aria-label": placeholder }}
      />
      {error && (
        <Typography className="text-red-700" fontSize={"12px"}>
          {error}
        </Typography>
      )}
    </Stack>
  );
}

export default function PaymentForm({
  formik,
  handlePayNow,
  handlePayLater,
  checkout,
  isStartingPayment,
  paymentError,
  onEditBilling,
  onWidgetError,
  onBeforeCardSubmit,
}: {
  formik: any;
  handlePayNow: () => void;
  handlePayLater: () => void;
  checkout: PendingCheckout | null;
  isStartingPayment: boolean;
  paymentError: string | null;
  onEditBilling: () => void;
  onWidgetError: (message: string) => void;
  onBeforeCardSubmit: () => boolean;
}) {
  const {
    totalBundlePrice,
    totalExtrasPrice,
    totalProtectionPrice,
    selected_bundle,
  } = useRentDetailsStore();

  const totalPrice =
    totalBundlePrice +
    totalExtrasPrice +
    totalProtectionPrice +
    getDeliveryFee(selected_bundle);
  const discountedPrice = totalPrice - totalPrice * 0.05;

  return (
    <div className="rounded-lg bg-primary-variant-1 p-3 sm:p-5 md:rounded-none">
      <div>
        <h2 className="text-[16px] font-semibold md:text-xl">
          Complete your booking
        </h2>
        <p className="text-[12px] text-neutral-400 md:text-[14px]">
          You can pay your booking now or pay later upon collection of the
          vehicle
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10">
        <div>
          {checkout ? (
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold md:text-base">
                  Card details
                </p>
                <button
                  type="button"
                  onClick={onEditBilling}
                  className="text-xs text-primary-variant-3 underline md:text-sm"
                >
                  Edit billing address
                </button>
              </div>
              <HyperPayWidget
                checkoutId={checkout.checkoutId}
                amount={checkout.amount}
                onError={onWidgetError}
                onBeforeSubmit={onBeforeCardSubmit}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-semibold md:text-base">
                Billing address
              </p>
              <BillingField
                formik={formik}
                name="billingStreet"
                placeholder="Street address"
              />
              <div className="flex gap-2">
                <BillingField
                  formik={formik}
                  name="billingCity"
                  placeholder="City"
                  className="basis-1/2"
                />
                <BillingField
                  formik={formik}
                  name="billingState"
                  placeholder="State / Province"
                  className="basis-1/2"
                />
              </div>
              <div className="flex gap-2">
                <Stack spacing={1} className="basis-1/2">
                  <TextField
                    select
                    size="medium"
                    className="w-full bg-white"
                    sx={inputSx}
                    value={formik.values["billingCountry"]}
                    onChange={(event) =>
                      formik.setFieldValue("billingCountry", event.target.value)
                    }
                    SelectProps={{ native: true }}
                    inputProps={{ "aria-label": "Country" }}
                    error={Boolean(formik.errors["billingCountry"])}
                  >
                    {BILLING_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </TextField>
                  {formik.errors["billingCountry"] && (
                    <Typography className="text-red-700" fontSize={"12px"}>
                      {formik.errors["billingCountry"]}
                    </Typography>
                  )}
                </Stack>
                <BillingField
                  formik={formik}
                  name="billingPostcode"
                  placeholder="Postal code"
                  className="basis-1/2"
                />
              </div>
            </div>
          )}
          {paymentError && (
            <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 md:text-sm">
              {paymentError}
            </p>
          )}
          {checkout && (
            <div className="mt-5 flex justify-between gap-4 sm:flex-row sm:gap-7">
              <Stack spacing={1} className="flex-1">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={formik.values ? formik.values["agreement"] : false}
                    onChange={(e) =>
                      formik.setFieldValue("agreement", e.target.checked)
                    }
                    id="agreement"
                    className="!h-fit !border-2 !bg-white !p-0"
                  />
                  <label htmlFor="agreement" className="md:text-xs text-[8px] text-neutral-400">
                    I acknowledge that I have read, understood and agree to Bridge
                    Rent-A-Car Terms and Conditions and Privacy Policy
                  </label>
                </div>
                {formik.errors["agreement"] && (
                  <Typography
                    className="text-red-700"
                    sx={{
                      fontSize: { xs: "8px", md: "12px" }
                    }}
                  >
                    {formik.errors["agreement"]}
                  </Typography>
                )}
              </Stack>
              <div className="flex justify-center gap-1 sm:justify-end">
                <div className="relative h-[28.5px] w-[44.25px]">
                  <Image
                    src={"/assets/img/visa-logo.png"}
                    alt="Visa Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="relative h-[28.5px] w-[44.25px]">
                  <Image
                    src={"/assets/img/mastercard-logo.png"}
                    alt="Mastercard Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`grid grid-cols-1 pt-5 transition-[grid-template-columns,gap] duration-500 ease-out md:pt-0 lg:h-fit ${
            checkout
              ? "gap-0 sm:grid-cols-[0fr_1fr] lg:self-center"
              : "gap-3 sm:grid-cols-[1fr_1fr] lg:self-end"
          }`}
        >
          <div
            className={`min-h-0 min-w-0 overflow-hidden transition-all duration-500 ease-out ${
              checkout
                ? "pointer-events-none max-h-0 opacity-0"
                : "max-h-[28rem] opacity-100"
            }`}
            aria-hidden={Boolean(checkout)}
          >
            <div className="relative flex h-full w-full flex-col justify-between border-2 border-primary bg-white px-4 pb-5 pt-14 sm:px-6">
              <div>
                <div className="absolute right-0 top-0 bg-[#FF8181] px-4 py-[1px] text-sm text-white">
                  -5%
                </div>
                <h3 className="font-semibold">Pay Now</h3>
                <p className="pt-1 text-sm">
                  Pay your booking now and get a 5% discount
                </p>
                <p className="pt-2 text-xs font-medium text-primary-variant-3">
                  Fill in the billing address first
                </p>
              </div>
              <div>
                <p className="mb-5 mt-4 font-semibold">
                  {discountedPrice.toFixed(2)} JOD
                </p>
                <button
                  onClick={handlePayNow}
                  disabled={isStartingPayment}
                  className="w-full rounded bg-primary-variant-2 px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-variant-2"
                >
                  {isStartingPayment ? "PREPARING…" : "PAY NOW"}
                </button>
              </div>
            </div>
          </div>
          <div className="h-full min-w-0">
            <div className="relative flex h-full w-full flex-col justify-between border-2 bg-white px-4 pb-5 pt-14 sm:px-6">
              <div>
                <h3 className="font-semibold">Pay on Delivery</h3>
                <p className="pt-1 text-justify text-sm">
                  Book now and pay by card upon vehicle collection. Cash
                  payments are not accepted
                </p>
                <p
                  className={`overflow-hidden text-xs text-neutral-500 transition-all duration-500 ${
                    checkout ? "max-h-0 pt-0 opacity-0" : "max-h-8 pt-2 opacity-100"
                  }`}
                >
                  No billing address needed
                </p>
              </div>
              <div>
                <p className="mb-5 mt-4 font-semibold">
                  {totalPrice.toFixed(2)} JOD
                </p>
                <button
                  onClick={handlePayLater}
                  disabled={isStartingPayment}
                  className="w-full rounded bg-[#CBCBCB] px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-neutral-400 disabled:cursor-not-allowed"
                >
                  PAY LATER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
