"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/reservation/car-choices/section/hero-section";
import FilterSection from "@/components/reservation/car-choices/section/filter-section";
import CarCardsSection from "@/components/reservation/car-choices/section/car-cards-section";
import InfoSection from "@/components/reservation/car-choices/section/info-section";
import { ICarModel } from "@/lib/types";
import { useRentDetailsStore } from "@/store/reservation-store";
import { createClient } from "@/utils/supabase/client";
import { useCarStore } from "@/store/car-store";
import useLanguageStore from "@/store/useLanguageStore";
import LoadingSpinner from "@/components/shared/loading-spinner";

const supabase = createClient();

interface Translations {
  carTypes: Record<string, string>;
  commonPhrases: Record<string, string>;
}

export default function ReservationPage() {
  const { carModels, fetchCars } = useCarStore();
  const [showMoreThanFiveSeats, setShowMoreThanFiveSeats] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<ICarModel[]>([]);
  const { language } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState<Translations>({
    carTypes: {},
    commonPhrases: {},
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      if (carModels.length === 0) {
        await fetchCars();
      }

      if (language === "ar") {
        const carTypes = new Set(carModels.map((car) => car.car_type));
        console.log("Car types to translate:", Array.from(carTypes));

        const commonPhrases = new Set([
          "or similar",
          "NOT AVAILABLE",
          "Automatic",
        ]);

        try {
          const carTypeTranslations = await Promise.all(
            Array.from(carTypes).map(async (type) => {
              const response = await fetch("/api/translate", {
                method: "POST",
                body: JSON.stringify({ text: type, targetLang: "ar" }),
                headers: { "Content-Type": "application/json" },
              });
              const { translation } = await response.json();
              console.log(`Translation received - ${type}: ${translation}`);
              return [type, translation];
            }),
          );

          const phraseTranslations = await Promise.all(
            Array.from(commonPhrases).map(async (phrase) => {
              const response = await fetch("/api/translate", {
                method: "POST",
                body: JSON.stringify({ text: phrase, targetLang: "ar" }),
                headers: { "Content-Type": "application/json" },
              });
              const { translation } = await response.json();
              return [phrase, translation];
            }),
          );

          const newTranslations = {
            carTypes: Object.fromEntries(carTypeTranslations),
            commonPhrases: Object.fromEntries(phraseTranslations),
          };
          console.log("Setting translations:", newTranslations);
          setTranslations(newTranslations);
        } catch (error) {
          console.error("Translation error:", error);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, [language, fetchCars, carModels.length]);

  useEffect(() => {
    const filtered = carModels.filter(
      (car) =>
        (!selectedType || car.car_type === selectedType) &&
        (!showMoreThanFiveSeats || car.passengers > 5),
    );
    setFilteredCars(filtered);
  }, [selectedType, showMoreThanFiveSeats, carModels]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main
      className={`space-y-6 py-2 md:space-y-12 md:p-20 ${
        language === "ar" ? "rtl" : "ltr"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <HeroSection />
      <FilterSection
        vehiclesData={carModels}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showMoreThanFiveSeats={showMoreThanFiveSeats}
        setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
        translations={translations.carTypes}
      />
      <CarCardsSection
        filteredCars={filteredCars}
        translations={{
          ...translations.carTypes,
          ...translations.commonPhrases,
        }}
      />
      <div className="px-2 md:px-0">
        <InfoSection />
      </div>
    </main>
  );
}
