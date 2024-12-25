"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import CarSearchForm from "../form/car-search-form";
import { createClient } from "@/utils/supabase/client";
import useLanguageStore from "@/store/useLanguageStore";

const supabase = createClient();

export default function HeroSection() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("HomepageImage")
          .select("image_url")
          .single();

        if (fetchError) throw fetchError;

        if (data?.image_url) {
          setHeroImageUrl(data.image_url);
        } else {
          setError("No hero image found in the database.");
        }
      } catch (err) {
        console.error("Error fetching hero image URL:", err);
        setError("Failed to fetch hero image.");
      }
    };

    fetchHeroImage();
  }, []);

  if (error) {
    return (
      <section className="relative z-0 flex h-screen max-h-[850px] w-full items-center justify-center bg-gray-200 px-20 pb-16 text-white">
        <p className="text-center text-gray-600">{error}</p>
      </section>
    );
  }

  const contentByLanguage = {
    en: {
      mobileTitle: "Car rentals at your doorstep",
      title: "Car Rentals\nAt Your Doorstep",
      subtitle: "Looking for a vehicle in Jordan?",
    },
    ar: {
      mobileTitle: "تأجير السيارات عند عتبة داركم",
      title: "تأجير السيارات\nعند عتبة داركم",
      subtitle: "تبحث عن سيارة في الأردن؟",
    },
  };

  const content = contentByLanguage[language as keyof typeof contentByLanguage];

  return (
    <>
      {heroImageUrl && (
        <Head>
          <link rel="preload" as="image" href={heroImageUrl} />
        </Head>
      )}
      <section
        className={`relative z-0 w-full px-0 pb-5 pt-10 text-white md:h-screen md:max-h-[850px] md:px-20 md:pb-16 ${language === "ar" ? "rtl" : "ltr"}`}
      >
        <div className="hidden md:block">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt="Banner Image"
              fill
              className="-z-10 md:object-cover"
              sizes="(max-width: 768px) 90vw, 100vw"
              priority
            />
          )}
        </div>
        <h2
          className={`my-[15px] flex px-4 text-[20px] font-semibold text-[#494949] md:hidden w-full ${language === "ar" ? "text-end justify-end" : "text-start justify-start"}`}
        >
          {content.mobileTitle}
        </h2>
        <div className="block w-full md:hidden">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt="Banner Image"
              width={100}
              height={100}
              sizes="(max-width: 768px) 90vw, 100vw"
              className="w-full"
            />
          )}
        </div>
        <div
          className={`mx-auto flex h-full w-full max-w-screen-2xl flex-col justify-end gap-6 ${language === "ar" ? "items-end text-right" : "items-start text-left"}`}
        >
          <h2 className="hidden whitespace-pre-line px-4 font-poppins text-[64px] font-semibold leading-none md:flex md:px-0">
            {content.title}
          </h2>
          <p className="hidden px-4 text-[28px] font-medium text-primary md:flex md:px-0">
            {content.subtitle}
          </p>
          <div className="w-full px-4 md:px-0">
            <CarSearchForm />
          </div>
        </div>
      </section>
    </>
  );
}
