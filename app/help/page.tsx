import FaqCard from "@/components/help/card/faq-card";
import { faqData } from "@/lib/static/faq-dummy";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="bg-[#F9F9F9]">
      <main className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 px-20 pb-32 pt-40">
        <section className="text-center">
          <h2 className="font-poppins text-5xl font-semibold">
            FAQs & Support
          </h2>
          <p className="mt-5 text-xl text-neutral-500/80">
            Help is just a click away—find quick answers or get support
            instantly
          </p>
        </section>
        <section className="grid w-4/5 grid-cols-2 gap-3">
          {faqData.map((faq, index) => (
            <FaqCard key={index} {...faq} />
          ))}
        </section>
        <section className="mt-5 w-2/3 text-center text-neutral-500">
          <p>
            If you have any further questions, don't hesitate to call us at
            <span className="text-primary-variant-2"> +962-6-7790-890</span> or
            email at{" "}
            <Link
              href={"mailto:customer@bridge.co.com"}
              target="_blank"
              className="text-primary-variant-2 hover:underline"
            >
              customer@bridge.co.com
            </Link>{" "}
            . We're here to help with whatever you need!
          </p>
        </section>
      </main>
    </div>
  );
}
