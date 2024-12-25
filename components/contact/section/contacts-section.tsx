"use client";

import ContactCard from "../card/contact-card";
import useLanguageStore from "@/store/useLanguageStore";

export default function ContactsSection() {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  return (
    <section className={isRTL ? "rtl" : "ltr"}>
      <h2 className={`text-[20px] font-semibold md:text-2xl ${isRTL ? "text-right" : ""}`}>
        {isRTL ? "تواصل معنا" : "Get in touch with us"}
      </h2>

      <div
        className={`mt-2 grid grid-cols-1 gap-3 border-y-2 border-neutral-200/80 py-6 md:grid-cols-3 md:py-12 ${isRTL ? "direction-rtl" : ""}`}
      >
        <ContactCard
          title={isRTL ? "الحجز عبر الهاتف" : "Telephone Bookings"}
          description={
            isRTL
              ? "هل تفضل الحجز عبر الهاتف؟ لا مشكلة! اتصل بنا وسنقوم بترتيب كل شيء لك."
              : "Prefer to make a booking over the phone? No problem! Call us, and we'll get everything arranged for you."
          }
          onButtonClick={() => {}}
        />
        <ContactCard
          title={isRTL ? "خدمة العملاء" : "Customer Service"}
          description={
            isRTL
              ? "هل تفضل الحجز عبر الهاتف؟ لا مشكلة! اتصل بنا وسنقوم بترتيب كل شيء لك."
              : "Prefer to make a booking over the phone? No problem! Call us, and we'll get everything arranged for you."
          }
          onButtonClick={() => {}}
        />
        <ContactCard
          title={isRTL ? "المساعدة على الطريق" : "Roadside Assistance"}
          description={
            isRTL
              ? "إذا كنت تواجه مشكلة على الطريق، فريق المساعدة على الطريق متواجد على مدار الساعة طوال أيام الأسبوع لمساعدتك."
              : "If you're experiencing an issue on the road, our dedicated roadside assistance team is here 24/7 to help you get back on track."
          }
          onButtonClick={() => {}}
        />
      </div>
    </section>
  );
}
