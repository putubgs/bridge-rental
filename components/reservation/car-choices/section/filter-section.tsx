import CarTypeFilter from "../filters/car-type-filter";
import FiveSeatsFilter from "../filters/five-seats-filter";
import { ICarModel } from "@/lib/types";

interface FilterSectionProps {
  vehiclesData: ICarModel[];
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  showMoreThanFiveSeats: boolean;
  setShowMoreThanFiveSeats: (state: boolean) => void;
}

export default function FilterSection({
  vehiclesData,
  selectedType,
  setSelectedType,
  showMoreThanFiveSeats,
  setShowMoreThanFiveSeats,
}: FilterSectionProps) {
  return (
    <div className="flex items-center border border-[#D9D9D9] bg-white">
      <CarTypeFilter
        vehiclesData={vehiclesData}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <FiveSeatsFilter
        showMoreThanFiveSeats={showMoreThanFiveSeats}
        setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
      />
    </div>
  );
}
