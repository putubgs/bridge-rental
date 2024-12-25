import FaqCard from "@/components/help/card/faq-card";
import { faqData } from "@/lib/static/faq-dummy";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="relative md:-top-20 -top-5 bg-[#F9F9F9]">
      <main className="mx-auto flex max-w-screen-2xl flex-col items-center md:gap-16 gap-8 px-4 md:pb-32 md:pt-40 pt-20 pb-16 md:px-20">
        <section className="text-center">
          <h2 className="font-poppins text-xl font-semibold md:text-5xl">
            FAQs & Support
          </h2>
          <p className="mt-5 text-xs text-neutral-500/80 md:text-xl">
            Help is just a click away—find quick answers or get support
            instantly
          </p>
        </section>
        <section className="grid w-full grid-cols-1 gap-3 md:w-4/5 md:grid-cols-2">
          {faqData.map((faq, index) => (
            <FaqCard key={index} {...faq} />
          ))}
        </section>
        <section className="mt-5 w-full px-4 text-center text-neutral-500 md:w-2/3 md:px-0">
          <p className="py-2 text-xs md:py-4 md:text-base">
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
