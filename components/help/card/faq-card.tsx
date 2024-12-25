import Image from "next/image";
import useLanguageStore from "@/store/useLanguageStore";

interface IFaqCard {
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
}

export default function FaqCard({
  question,
  questionAr,
  answer,
  answerAr,
}: IFaqCard) {
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  return (
    <div
      className={`space-y-3 rounded border-2 border-neutral-200/80 bg-white p-5 ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div
        className={`w-fit rounded-sm bg-primary-variant-1 p-2 ${
          isArabic ? "ml-auto" : ""
        }`}
      >
        <div className="relative size-7">
          <Image
            src={"/assets/img/call-center-agent-icon.png"}
            alt="Call Center Agent Icon"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={isArabic ? "scale-x-[-1]" : ""}
          />
        </div>
      </div>
      <h3 className={`font-semibold ${isArabic ? "text-end" : "text-start"}`}>{isArabic ? questionAr : question}</h3>
      <p className={`text-sm text-neutral-400 ${isArabic ? "text-end" : "text-start"}`}>{isArabic ? answerAr : answer}</p>
    </div>
  );
}
