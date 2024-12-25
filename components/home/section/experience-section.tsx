import ExperienceCard from "../card/experience-card";
import useLanguageStore from "@/store/useLanguageStore";

export default function ExperienceSection() {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  return (
    <div className="z-0 px-1 pb-6 md:px-20 md:py-12">
      <section
        className={`mx-auto flex max-w-screen-2xl ${isArabic ? "flex-row-reverse" : ""} justify-between gap-11`}
      >
        <div className="-z-10 grid grow grid-cols-3 gap-2 px-2">
          <ExperienceCard
            img="/assets/img/door.png"
            text={isArabic ? "سيارتك عند بابك" : "YOUR CAR AT YOUR DOOR"}
          />
          <ExperienceCard
            img="/assets/img/growing-fleet.png"
            text={
              isArabic
                ? "أسرع أسطول متنامي في البلاد"
                : "NATION FASTEST GROWING FLEET"
            }
          />
          <ExperienceCard
            img="/assets/img/car-group.png"
            text={isArabic ? "خيارات سيارات لا نهائية" : "ENDLESS CAR OPTION"}
          />
        </div>
        <div
          className={`hidden shrink-0 basis-2/5 space-y-1 md:block ${isArabic ? "text-right" : ""}`}
        >
          <h2 className="text-xl font-semibold">
            {isArabic
              ? "اختبر الراحة كما لم تختبرها من قبل"
              : "Experience Convenience Like Never Before"}
          </h2>
          <p className={`${isArabic ? "text-right" : "text-justify"}`}>
            {isArabic
              ? "نقوم بتوصيل السيارة إلى باب منزلك ونضمن عودة خالية من المتاعب، مع إعطاء الأولوية لراحتك ورضاك لكل من الرحلات البرية والاستخدام اليومي."
              : "We deliver the car to your doorstep and ensure a hassle-free return, prioritizing your comfort and satisfaction for both road trips and daily use."}
          </p>
        </div>
      </section>
    </div>
  );
}
