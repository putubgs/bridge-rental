import { useRentDetailsStore } from "@/store/reservation-store";
import { Checkbox, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";

export default function PaymentForm({
  formik,
  handlePayNow,
  handlePayLater,
}: {
  formik: any;
  handlePayNow: () => void;
  handlePayLater: () => void;
}) {
  const { totalBundlePrice, totalExtrasPrice, totalProtectionPrice } =
    useRentDetailsStore();

  const totalPrice = totalBundlePrice + totalExtrasPrice + totalProtectionPrice;
  const discountedPrice = totalPrice - totalPrice * 0.05;

  return (
    <div className="bg-primary-variant-1 p-5">
      <div>
        <h2 className="text-xl font-semibold">Complete your booking</h2>
        <p className="text-neutral-400">
          You can pay your booking now or pay later upon collection of the
          vehicle
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-10">
        <div>
          <div className="space-y-2">
            <Stack spacing={1}>
              <TextField
                size="medium"
                placeholder="Card number"
                className="w-full bg-white"
                required
                value={formik.values ? formik.values["cardNumber"] : ""}
                onChange={(event) =>
                  formik.setFieldValue("cardNumber", event.target.value)
                }
                error={Boolean(formik.errors["cardNumber"])}
              />
              {formik.errors["cardNumber"] && (
                <Typography className="text-red-700" fontSize={"12px"}>
                  {formik.errors["cardNumber"]}
                </Typography>
              )}
            </Stack>

            <div className="flex gap-2">
              <Stack spacing={1} className="basis-4/5">
                <DatePicker
                  format="MMM DD, YYYY"
                  value={formik.values["expiryDate"] || null}
                  onChange={(value) =>
                    formik.setFieldValue("expiryDate", value)
                  }
                  slotProps={{
                    textField: {
                      placeholder: "Expiry date",
                      InputProps: {
                        readOnly: true,
                        sx: {
                          backgroundColor: "white",
                        },
                      },
                      error: Boolean(formik.errors["expiryDate"]),
                    },
                  }}
                />
                {formik.errors["expiryDate"] && (
                  <Typography className="text-red-700" fontSize={"12px"}>
                    {formik.errors["expiryDate"]}
                  </Typography>
                )}
              </Stack>
              <Stack spacing={1} className="basis-1/5">
                <TextField
                  size="medium"
                  placeholder="CVV"
                  className="w-full bg-white"
                  required
                  value={formik.values ? formik.values["cvv"] : ""}
                  onChange={(event) =>
                    formik.setFieldValue("cvv", event.target.value)
                  }
                  error={Boolean(formik.errors["cvv"])}
                />
                {formik.errors["cvv"] && (
                  <Typography className="text-red-700" fontSize={"12px"}>
                    {formik.errors["cvv"]}
                  </Typography>
                )}
              </Stack>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-7">
            <Stack spacing={1}>
              <div className="flex gap-2">
                <Checkbox
                  checked={formik.values ? formik.values["agreement"] : false}
                  onChange={(e) =>
                    formik.setFieldValue("agreement", e.target.checked)
                  }
                  id="agreement"
                  className="!h-fit !border-2 !bg-white !p-0"
                />
                <label htmlFor="agreement" className="text-xs text-neutral-400">
                  I acknowledge that I have read, understood and agree to Bridge
                  Rent-A-Car Terms and Conditions and Privacy Policy
                </label>
              </div>
              {formik.errors["agreement"] && (
                <Typography className="text-red-700" fontSize={"12px"}>
                  {formik.errors["agreement"]}
                </Typography>
              )}
            </Stack>
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
            <div className="absolute right-0 top-0 bg-[#FF8181] px-4 py-[1px] text-sm text-white">
              -5%
            </div>
            <h3 className="font-semibold">Pay Now</h3>
            <p className="text-sm">
              Pay your booking now and get a 5% discount
            </p>
            <p className="mb-5 mt-4 font-semibold">
              {discountedPrice.toFixed(2)} JOD
            </p>
            <button
              onClick={handlePayNow}
              className="w-full rounded bg-primary-variant-2 px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-primary-variant-3"
            >
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
            <button
              onClick={handlePayLater}
              className="w-full rounded bg-[#CBCBCB] px-5 py-3 font-medium !text-white transition-all duration-150 hover:bg-neutral-400"
            >
              PAY LATER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
