import Image from "next/image";
import useLanguageStore from "@/store/useLanguageStore";

export default function HeroSection() {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  const content = {
    en: {
      title: "Choose your vehicle",
      description:
        "Our fleet is ready to roll with rides to match your vibe! Whether you're cruising in the light and cozy ECONOMY, zipping around in the small but mighty COMPACT, ruling the road in the sleek SUV or rolling deep in the spacious FAMILY MPV, we've got the perfect match for your journey. Check availability at your next stop by booking now!",
    },
    ar: {
      title: "اختر سيارتك",
      description:
        "أسطولنا جاهز للانطلاق مع رحلات تناسب أسلوبك! سواء كنت تتجول في سيارة اقتصادية مريحة، أو تتنقل في سيارة مدمجة قوية، أو تسيطر على الطريق في سيارة دفع رباعي أنيقة، أو تسافر مع العائلة في سيارة عائلية واسعة، لدينا السيارة المثالية لرحلتك. تحقق من التوفر في وجهتك التالية عن طريق الحجز الآن!",
    },
  };

  const currentContent = content[language === "ar" ? "ar" : "en"];

  return (
    <section
      className={`flex flex-col gap-3 pt-1 md:gap-12 md:pt-0 ${isRTL ? "rtl" : "ltr"}`}
    >
      <h1 className="block px-2 text-[20px] text-black md:hidden md:px-0">
        {currentContent.title}
      </h1>
      <div className="relative h-[40vw] max-h-[600px] min-h-[100px] w-full">
        <Image
          src="/assets/img/reservation-page-banner.png"
          alt="Reservation Banner"
          fill
          className="object-cover"
        />
      </div>

      <div
        className={`flex hidden flex-col gap-5 md:block ${isRTL ? "text-right" : "text-left"}`}
      >
        <h1 className="text-[24px] font-semibold">{currentContent.title}</h1>
        <p>{currentContent.description}</p>
      </div>
    </section>
  );
}
