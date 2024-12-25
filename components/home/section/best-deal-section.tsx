"use client";

import useDialog from "@/hooks/useDialog";
import { Dialog, IconButton } from "@mui/material";
import { XIcon } from "lucide-react";
import Image from "next/image";
import useLanguageStore from "@/store/useLanguageStore";

export default function BestDealSection() {
  const { open, handleOpen, handleClose } = useDialog();
  const { language } = useLanguageStore();
  const isArabic = language === "ar";

  const translations = {
    en: {
      title: "GRAB AND",
      highlight: "DRIVE",
      description1:
        "All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!",
      features: [
        "Full Tank of Fuel",
        "Free Cancellation",
        "Full Cover Insurance (Zero Excess)",
        "Free Delivery",
        "Unlimited Mileage",
      ],
      description2:
        "Your adventure is just a click away. Enjoy worry-free travels.",
      learnMore: "LEARN MORE",
      bestDeal: "BEST DEAL!",
      dialogTitle: "BUNDLE COMPARISON POSTER",
      dialogDesc: "(WILL BE EDITED SOON)",
    },
    ar: {
      title: "احجز و",
      highlight: "انطلق",
      description1: "شامل كل شيء، كله لك! احجز الآن وانطلق في رحلتك بثقة!",
      features: [
        "خزان وقود ممتلئ",
        "إلغاء مجاني",
        "تأمين شامل (صفر تحمل)",
        "توصيل مجاني",
        "كيلومترات غير محدودة",
      ],
      description2: "مغامرتك على بعد نقرة واحدة. استمتع برحلات خالية من القلق.",
      learnMore: "اعرف المزيد",
      bestDeal: "!أفضل عرض",
      dialogTitle: "ملصق مقارنة الباقات",
      dialogDesc: "(سيتم التعديل قريباً)",
    },
  };

  const t = translations[isArabic ? "ar" : "en"];

  return (
    <section className="px-4 sm:px-6 md:px-20 md:py-12">
      <div className="max-w-screen relative mx-auto w-full space-y-5 text-white">
        {/* Banner Image */}
        <div
          className={`relative flex h-48 w-full flex-col ${isArabic ? "items-end" : "items-start"} justify-center gap-2 px-[30px] sm:h-64 md:h-[600px] lg:gap-6`}
        >
          <Image
            src="/assets/img/best-deal-banner.png"
            alt="Best Deal Banner"
            fill
            className={`-z-10 rounded-lg object-cover md:rounded-none ${isArabic ? "scale-x-[-1]" : ""}`}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          <h2
            className={`font-poppins text-[16px] font-semibold italic md:text-[58px] ${isArabic ? "text-right" : "text-left"}`}
          >
            {t.title} <span className="text-primary">{t.highlight}</span>
          </h2>

          {/* Description - visible on desktop only */}
          <p
            className={`hidden text-base md:block lg:text-lg ${isArabic ? "text-right" : "text-left"}`}
          >
            {t.description1}
          </p>

          {/* Features List */}
          <ul
            className={`list-inside list-disc space-y-1 text-[8px] font-semibold text-primary md:text-base lg:text-lg ${isArabic ? "text-right" : "text-left"}`}
          >
            {t.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {/* Additional Description - visible on desktop only */}
          <p
            className={`hidden text-base md:block lg:text-lg ${isArabic ? "text-right" : "text-left"}`}
          >
            {t.description2}
          </p>

          {/* Learn More Button */}
          <div className="mt-2 md:mt-8 lg:mt-12">
            <button
              onClick={handleOpen}
              className="rounded-sm border border-white bg-white px-4 py-1 text-[6px] font-medium text-gray-500 transition-colors duration-300 hover:bg-white hover:text-gray-500 sm:px-8 sm:py-3 md:border-2 md:bg-transparent md:px-20 md:py-4 md:text-base md:tracking-wider md:text-white lg:text-lg"
            >
              {t.learnMore}
            </button>
          </div>
        </div>

        {/* "BEST DEAL!" Badge */}
        <div
          className={`absolute -top-5 ${isArabic ? "left-0 rounded-br-md rounded-tl-md" : "right-0 rounded-bl-md rounded-tr-md"} bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-4 py-2 text-[7px] font-bold md:rounded-none md:bg-[#FF7F7F] md:bg-none md:text-lg`}
        >
          {t.bestDeal}
        </div>

        {/* Brand Logo - visible on desktop only */}
        <div
          className={`absolute bottom-8 ${isArabic ? "left-8" : "right-8"} hidden h-8 w-24 md:block`}
        >
          <Image
            src="/assets/img/brand-logo-white.png"
            alt="Brand Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className:
            "rounded-none border-2 border-black w-11/12 sm:w-3/4 md:w-1/2",
        }}
      >
        <div className="space-y-1 bg-primary">
          {/* Close Button */}
          <div className="flex w-full justify-end p-3 pb-0">
            <IconButton onClick={handleClose} className="border-2">
              <XIcon />
            </IconButton>
          </div>

          {/* Dialog Content */}
          <div className="p-6 sm:p-10">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              {t.dialogTitle}
            </h3>
            <p className="mt-2 text-lg sm:text-xl">{t.dialogDesc}</p>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
