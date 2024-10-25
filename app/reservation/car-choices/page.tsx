"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/reservation/car-choices/section/hero-section";
import FilterSection from "@/components/reservation/car-choices/section/filter-section";
import CarCardsSection from "@/components/reservation/car-choices/section/car-cards-section";
import { vehiclesData } from "@/lib/static/vehicles-dummy";
import { ICarModel } from "@/lib/types";
import InfoSection from "@/components/reservation/car-choices/section/info-section";

export default function ReservationPage() {
  const [showMoreThanFiveSeats, setShowMoreThanFiveSeats] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<ICarModel[]>(vehiclesData);

  useEffect(() => {
    const filtered = vehiclesData.filter(
      (car) =>
        (!selectedType || car.car_type === selectedType) &&
        (!showMoreThanFiveSeats || car.passengers_capacity > 5)
    );
    setFilteredCars(filtered);
  }, [selectedType, showMoreThanFiveSeats]);

  return (
    <div className="bg-[#F9F9F9]">
      <main className="space-y-12 p-20 pt-32">
        <HeroSection />
        <FilterSection
          vehiclesData={vehiclesData}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          showMoreThanFiveSeats={showMoreThanFiveSeats}
          setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
        />
        <CarCardsSection filteredCars={filteredCars} />
        <InfoSection />
      </main>
    </div>
  );
}
