import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import useLanguageStore from "@/store/useLanguageStore";

export default function InfoSection() {
  const { language } = useLanguageStore();

  const translations = {
    en: {
      remember: "Remember that each category includes several car models.",
      guarantee:
        "We can guarantee car availability within the booked category and, once upon arrival, we will provide you with the model that is available at that time.",
    },
    ar: {
      remember: "تذكر أن كل فئة تتضمن العديد من موديلات السيارات.",
      guarantee:
        "نحن نضمن توفر السيارة ضمن الفئة المحجوزة، وعند الوصول سنوفر لك الموديل المتاح في ذلك الوقت.",
    },
  };

  const currentLang = language === "ar" ? "ar" : "en";

  return (
    <div
      className="flex w-full items-center gap-4 border border-[#EBEBEB] bg-white p-5 text-[9px] md:text-[15px]"
    >
      <InfoRoundedIcon style={{ color: "#8BD6D6", fontSize: 35 }} />
      <p dir={language === "ar" ? "rtl" : "ltr"}>
        <span className="font-bold">{translations[currentLang].remember}</span>{" "}
        {translations[currentLang].guarantee}
      </p>
    </div>
  );
}
