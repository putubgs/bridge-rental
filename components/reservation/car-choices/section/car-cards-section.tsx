import Image from "next/image";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import { ICarModel } from "@/lib/types";

interface CarCardsSectionProps {
  filteredCars: ICarModel[];
}

export default function CarCardsSection({ filteredCars }: CarCardsSectionProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full grid-cols-4 gap-3">
        {filteredCars.map((car) => (
          <div
            key={car.car_id}
            className="group relative flex h-auto w-full cursor-pointer flex-col border p-2"
          >
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
            <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-2">
              <p className="pt-1 text-[#535353]">{car.car_type}</p>
            </div>
            <div className="z-10 h-[200px]">
              <div className="relative h-full w-full">
                <Image src={car.car_image} alt={car.car_model} fill className="object-contain" />
              </div>
            </div>
            <div className="z-10 space-y-5 px-3">
              <p className="text-[18px]">
                {car.car_model} <span className="text-[#979797]">or similar</span>
              </p>
              <hr />
              <div className="flex w-full justify-between pb-2 pt-5">
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarDoorIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.doors}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarSeatIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.passengers_capacity}
                  </div>
                </div>
                <div className="relative flex h-fit w-fit items-end text-[12px]">
                  <CarLuggageIcon size={23} />
                  <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                    x{car.luggage_capacity}
                  </div>
                </div>
                <AirConditionerIcon size={23} />
                <div className="flex items-center gap-2 pr-[30px]">
                  <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                    A
                  </div>
                  <p className="pt-1">Automatic</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
