import { useFormik } from "formik";
import * as yup from "yup";
import IdForm from "../forms/id-form";
import PaymentForm from "../forms/payment-form";
import { useCallback, useEffect, useState } from "react";
import ProcessingDialog from "../dialogs/processing-dialog";
import SuccessDialog from "../dialogs/success-dialog";
import PaymentFailedDialog from "../dialogs/payment-failed-dialog";
import { Dayjs } from "dayjs";
import {
  PaymentFormValues,
  PaymentMethod,
  PendingCheckout,
  usePayStore,
} from "@/store/pay-store";
import { useRentDetailsStore } from "@/store/reservation-store";
import { getDeliveryFee } from "@/lib/delivery-fee";
import {
  clearBookingSnapshot,
  saveBookingSnapshot,
} from "@/lib/booking-session";
import type { HyperPayVerifiedPayment } from "@/lib/hyperpay";

const emailRegex =
  /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .matches(emailRegex, "Invalid email format")
    .oneOf([yup.ref("email"), ""], "Emails must match")
    .required("Confirm email is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  idDocument: yup.string().required("ID document is required"),
  drivingLicense: yup.string().required("Driving license is required"),
  agreement: yup.boolean(),
  paymentMethod: yup.string().required("Payment status is required"),
});

const BILLING_FIELDS: { name: keyof PaymentFormValues; message: string }[] = [
  { name: "billingStreet", message: "Street address is required" },
  { name: "billingCity", message: "City is required" },
  { name: "billingState", message: "State / province is required" },
  { name: "billingCountry", message: "Country is required" },
  { name: "billingPostcode", message: "Postal code is required" },
];

// React strict mode runs effects twice; a payment result must only be
// verified once per redirect.
const handledResourcePaths = new Set<string>();

export default function PaySection() {
  const savePayment = usePayStore((state) => state.savePayment);
  const paymentReturn = usePayStore((state) => state.paymentReturn);
  const setPaymentReturn = usePayStore((state) => state.setPaymentReturn);
  const {
    totalBundlePrice,
    totalExtrasPrice,
    totalProtectionPrice,
    selected_bundle,
  } = useRentDetailsStore();

  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [checkout, setCheckout] = useState<PendingCheckout | null>(null);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const totalPrice =
    totalBundlePrice +
    totalExtrasPrice +
    totalProtectionPrice +
    getDeliveryFee(selected_bundle);
  const payNowAmount = (totalPrice * 0.95).toFixed(2);

  const formik = useFormik<PaymentFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      dateOfBirth: null as Dayjs | null,
      phoneNumber: "",
      idDocument: "",
      drivingLicense: "",
      agreement: false,
      billingStreet: "",
      billingCity: "",
      billingState: "",
      billingCountry: "JO",
      billingPostcode: "",
      paymentMethod: "" as PaymentMethod,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      savePayment({
        ...values,
        cardLast4: "",
        cardExpiry: "",
        paymentReference: "",
      });
      setIsProcessingDialogOpen(true);

      setTimeout(() => {
        setIsProcessingDialogOpen(false);
        setIsSuccessDialogOpen(true);
      }, 5000);
    },
  });

  const handlePayNow = async () => {
    setPaymentError(null);
    const values = { ...formik.values, paymentMethod: PaymentMethod.PAYNOW };
    await formik.setFieldValue("paymentMethod", PaymentMethod.PAYNOW, false);

    const errors: Record<string, string> = {
      ...((await formik.validateForm(values)) as Record<string, string>),
    };
    for (const field of BILLING_FIELDS) {
      if (!String(values[field.name] ?? "").trim()) {
        errors[field.name] = field.message;
      }
    }
    delete errors.agreement;
    formik.setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsStartingPayment(true);
    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payNowAmount,
          customer: {
            email: values.email,
            givenName: values.firstName,
            surname: values.lastName,
          },
          billing: {
            street1: values.billingStreet,
            city: values.billingCity,
            state: values.billingState,
            country: values.billingCountry,
            postcode: values.billingPostcode,
          },
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.checkoutId) {
        setPaymentError(data.error ?? "Payment could not be started.");
        return;
      }

      const pendingCheckout: PendingCheckout = {
        checkoutId: data.checkoutId,
        merchantTransactionId: data.merchantTransactionId,
        amount: data.amount,
      };
      saveBookingSnapshot(pendingCheckout, values);
      setCheckout(pendingCheckout);
    } catch {
      setPaymentError("Network error. Please try again.");
    } finally {
      setIsStartingPayment(false);
    }
  };

  const handlePayLater = () => {
    formik.setFieldValue("paymentMethod", PaymentMethod.PAYLATER);
    formik.submitForm();
  };

  const handleBeforeCardSubmit = useCallback(() => {
    if (!formik.values.agreement) {
      formik.setFieldError("agreement", "You must agree to the terms");
      return false;
    }
    if (checkout) saveBookingSnapshot(checkout, formik.values);
    return true;
  }, [checkout, formik]);

  const cancelCheckout = useCallback((message?: string) => {
    clearBookingSnapshot();
    setCheckout(null);
    setPaymentError(message ?? null);
  }, []);

  useEffect(() => {
    if (!paymentReturn) return;
    const { resourcePath, checkout: paidCheckout, formValues } = paymentReturn;
    if (handledResourcePaths.has(resourcePath)) return;
    handledResourcePaths.add(resourcePath);

    formik.setValues(formValues, false);
    window.history.replaceState(null, "", "/reservation/review");
    setIsProcessingDialogOpen(true);

    const verify = async () => {
      try {
        const response = await fetch(
          `/api/payment/status?resourcePath=${encodeURIComponent(resourcePath)}`,
        );
        const payment: HyperPayVerifiedPayment & { error?: string } =
          await response.json();

        const matchesCheckout =
          payment.merchantTransactionId === paidCheckout.merchantTransactionId &&
          Number(payment.amount) === Number(paidCheckout.amount) &&
          payment.currency === "JOD";

        if (payment.outcome === "success" && matchesCheckout) {
          const expiryYear = payment.card?.expiryYear ?? "";
          savePayment({
            ...formValues,
            paymentMethod: PaymentMethod.PAYNOW,
            cardLast4: payment.card?.last4Digits ?? "",
            cardExpiry: payment.card?.expiryMonth
              ? `${payment.card.expiryMonth}/${expiryYear.slice(-2)}`
              : "",
            paymentReference: payment.paymentId ?? "",
          });
          clearBookingSnapshot();
          setIsSuccessDialogOpen(true);
        } else if (payment.outcome === "pending") {
          setIsPaymentPending(true);
          setFailureMessage(
            "Your bank is still processing this payment. Please do not pay again; contact us and quote reference " +
              paidCheckout.merchantTransactionId +
              ".",
          );
        } else {
          clearBookingSnapshot();
          setFailureMessage(
            payment.outcome === "success"
              ? "We could not match this payment to your booking. Please contact us and quote reference " +
                  paidCheckout.merchantTransactionId +
                  "."
              : `${payment.description ?? payment.error ?? "Your card was declined."} Please try again or use another card.`,
          );
        }
      } catch {
        setFailureMessage(
          "We could not confirm your payment. Please contact us before trying again.",
        );
      } finally {
        setIsProcessingDialogOpen(false);
        setPaymentReturn(null);
      }
    };

    verify();
  }, [paymentReturn]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="mt-5 space-y-5">
      <IdForm formik={formik} />
      <PaymentForm
        formik={formik}
        handlePayNow={handlePayNow}
        handlePayLater={handlePayLater}
        checkout={checkout}
        isStartingPayment={isStartingPayment}
        paymentError={paymentError}
        onEditBilling={() => cancelCheckout()}
        onWidgetError={cancelCheckout}
        onBeforeCardSubmit={handleBeforeCardSubmit}
      />
      <ProcessingDialog
        open={isProcessingDialogOpen}
        email={formik.values["email"]}
      />
      <SuccessDialog
        open={isSuccessDialogOpen}
        handleClose={() => {}}
        email={formik.values["email"]}
      />
      <PaymentFailedDialog
        open={Boolean(failureMessage)}
        message={failureMessage ?? ""}
        pending={isPaymentPending}
        handleClose={() => {
          setFailureMessage(null);
          setIsPaymentPending(false);
        }}
      />
    </section>
  );
}
