import IdForm from "../forms/id-form";
import PaymentForm from "../forms/payment-form";

export default function PaySection() {
  return (
    <section className="mt-5 space-y-5">
      <IdForm />
      <PaymentForm />
    </section>
  );
}
