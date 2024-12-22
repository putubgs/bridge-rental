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
    <>
      <div className="flex items-center md:border md:border-[#D9D9D9] md:bg-white md:px-0 px-2">
        <div
          className="bg-white md:basis-1/4 basis-2/4 border md:border md:border-transparent border border-[#D9D9D9] md:rounded-none rounded-lg"
        >
          <CarTypeFilter
            vehiclesData={vehiclesData}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div
          className="bg-transparent md:bg-white md:basis-3/4 basis-2/4"
        >
          <FiveSeatsFilter
            showMoreThanFiveSeats={showMoreThanFiveSeats}
            setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
          />
        </div>
      </div>
    </>
  );
}
