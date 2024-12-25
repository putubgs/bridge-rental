"use client";

import FaqCard from "@/components/help/card/faq-card";
import { faqData } from "@/lib/static/faq-dummy";
import Link from "next/link";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function HelpPage() {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time for language change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [language]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative -top-5 bg-[#F9F9F9] md:-top-20">
      <main
        className={`mx-auto flex max-w-screen-2xl flex-col items-center gap-8 px-4 pb-16 pt-20 md:gap-16 md:px-20 md:pb-32 md:pt-40 ${isArabic ? "rtl" : "ltr"}`}
      >
        <section className="text-center">
          <h2 className="font-poppins text-xl font-semibold md:text-5xl">
            {isArabic ? "الأسئلة الشائعة والدعم" : "FAQs & Support"}
          </h2>
          <p className="mt-5 text-xs text-neutral-500/80 md:text-xl">
            {isArabic
              ? "المساعدة على بعد نقرة واحدة - احصل على إجابات سريعة أو دعم فوري"
              : "Help is just a click away—find quick answers or get support instantly"}
          </p>
        </section>
        <section className="grid w-full grid-cols-1 gap-3 md:w-4/5 md:grid-cols-2">
          {faqData.map((faq, index) => (
            <FaqCard
              key={index}
              question={faq.question}
              questionAr={faq.questionAr}
              answer={faq.answer}
              answerAr={faq.answerAr}
            />
          ))}
        </section>
        <section className="mt-5 w-full px-4 text-center text-neutral-500 md:w-2/3 md:px-0">
          <p className="py-2 text-xs md:py-4 md:text-base">
            {isArabic ? (
              <>
                إذا كان لديك أي أسئلة أخرى، لا تتردد في الاتصال بنا على
                <span className="text-primary-variant-2">
                  {" "}
                  890-7790-6-962+
                </span>{" "}
                أو البريد الإلكتروني{" "}
                <Link
                  href={"mailto:customer@bridge.co.com"}
                  target="_blank"
                  className="text-primary-variant-2 hover:underline"
                >
                  customer@bridge.co.com
                </Link>{" "}
                . نحن هنا للمساعدة في كل ما تحتاجه!
              </>
            ) : (
              <>
                If you have any further questions, don't hesitate to call us at
                <span className="text-primary-variant-2">
                  {" "}
                  +962-6-7790-890
                </span>{" "}
                or email at{" "}
                <Link
                  href={"mailto:customer@bridge.co.com"}
                  target="_blank"
                  className="text-primary-variant-2 hover:underline"
                >
                  customer@bridge.co.com
                </Link>{" "}
                . We're here to help with whatever you need!
              </>
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
