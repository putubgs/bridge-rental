import CarTypeFilter from "../filters/car-type-filter";
import FiveSeatsFilter from "../filters/five-seats-filter";
import { ICarModel } from "@/lib/types";
import useLanguageStore from "@/store/useLanguageStore";

interface FilterSectionProps {
  vehiclesData: ICarModel[];
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  showMoreThanFiveSeats: boolean;
  setShowMoreThanFiveSeats: (value: boolean) => void;
  translations: Record<string, string>;
}

export default function FilterSection({
  vehiclesData,
  selectedType,
  setSelectedType,
  showMoreThanFiveSeats,
  setShowMoreThanFiveSeats,
  translations,
}: FilterSectionProps) {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  return (
    <>
      <div
        className="flex items-center px-2 md:border md:border-[#D9D9D9] md:bg-white md:px-0"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
            <div
              className={`basis-2/4 bg-white md:basis-1/4 rounded-lg border-[#D9D9D9] md:rounded-none`}
            >
          <CarTypeFilter
            vehiclesData={vehiclesData}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            translations={translations}
          />
        </div>
        <div className="basis-2/4 bg-transparent md:basis-3/4 md:bg-white">
          <FiveSeatsFilter
            showMoreThanFiveSeats={showMoreThanFiveSeats}
            setShowMoreThanFiveSeats={setShowMoreThanFiveSeats}
          />
        </div>
      </div>
    </>
  );
}
