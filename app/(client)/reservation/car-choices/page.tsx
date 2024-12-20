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

const supabase = createClient();

export default function ReservationPage() {
  const { carModels, fetchCars } = useCarStore();
  const [showMoreThanFiveSeats, setShowMoreThanFiveSeats] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<ICarModel[]>([]);

  useEffect(() => {
    const filtered = carModels.filter(
      (car) =>
        (!selectedType || car.car_type === selectedType) &&
        (!showMoreThanFiveSeats || car.passengers > 5),
    );
    setFilteredCars(filtered);
  }, [selectedType, showMoreThanFiveSeats, carModels]);

  return (
    <main className="space-y-12 md:p-20 p-2">
      <HeroSection />
      <FilterSection
        vehiclesData={carModels}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showMoreThanFiveSeats={showMoreThanFiveSeats}
        setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
      />
      <CarCardsSection filteredCars={filteredCars} />
      <InfoSection />
    </main>
  );
}
