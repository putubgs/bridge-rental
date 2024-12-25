import Image from "next/image";
import EmailForm from "../form/email-form";
import useLanguageStore from "@/store/useLanguageStore";

export default function EmailSection() {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  const content = {
    en: {
      title: "We Value our Customers",
      subtitle: "Your thoughts matter",
      privacy: "*Please refer to our Privacy for more details.",
    },
    ar: {
      title: "نحن نقدر عملائنا",
      subtitle: "رأيك يهمنا",
      privacy: "يرجى الرجوع إلى سياسة الخصوصية للمزيد من التفاصيل*",
    },
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section
      className={`flex flex-col items-center justify-between gap-5 md:flex-row md:items-end ${isArabic ? "md:flex-row-reverse" : ""}`}
    >
      <div className="w-full space-y-3 md:basis-1/2">
        <h2
          className={`text-sm text-neutral-500 md:text-xl ${isArabic ? "text-right" : ""}`}
        >
          <span className="font-semibold">{currentContent.title}</span>{" "}
          {currentContent.subtitle}
        </h2>
        <EmailForm />
        <p
          className={`pt-2 text-[10px] text-neutral-500 md:text-xs ${isArabic ? "text-right" : ""}`}
        >
          {currentContent.privacy}
        </p>
      </div>
      <div className="relative hidden h-[200px] w-full md:block md:w-[416px]">
        <Image
          src={"/assets/img/black-suv.png"}
          alt="Black SUV Illustration"
          fill
          sizes="(max-width: 768px) 90vw, 100vw"
          className={isArabic ? "scale-x-[-1]" : ""}
        />
      </div>
    </section>
  );
}
