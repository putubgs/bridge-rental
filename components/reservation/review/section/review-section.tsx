import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import { childrenExtras, extras } from "@/lib/static/extras-dummy";
import { vehiclesData } from "@/lib/static/vehicles-dummy";
import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import Image from "next/image";

export default function ReviewSection() {
  const {
    car_id,
    selected_bundle,
    totalBundlePrice,
    selected_protection,
    totalProtectionPrice,
    selected_extras,
    selected_children_extras,
    totalExtrasPrice,
    deliveryLocation,
    deliveryDate,
    deliveryTime,
    returnLocation,
    returnDate,
    returnTime,
    childrenSeatsQuantity,
  } = useRentDetailsStore();

  const car = vehiclesData.find((vehicle) => vehicle.car_id === car_id);
  const totalDays = countDays(
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
  );

  if (!car) {
    return <p>Car not found</p>;
  }

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">
        Review and proceed to booking
      </h2>
      <hr />
      <div className="mt-5 flex gap-3">
        <div className="flex basis-3/4 divide-x-2 border-2">
          <div className="basis-2/3 p-5">
            <h3 className="text-xl font-medium">Vehicle</h3>
            <div className="relative aspect-video w-1/2">
              <Image
                src={car.car_image}
                alt={car.car_model}
                fill
                className="object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="z-10 space-y-5 px-3">
              <div className="flex flex-col gap-2">
                <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-1">
                  <p className="pt-1 text-[#535353]">{car.car_type} </p>
                </div>
                <p className="text-[18px]">
                  {car.car_model}
                  <span className="text-neutral-400"> or similar</span>
                </p>
              </div>
              <div className="flex w-3/4 gap-7 pb-2 pt-3">
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
                <div className="ml-1 flex items-center gap-2 pr-[30px]">
                  <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                    A
                  </div>
                  <p className="pt-1">Automatic</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400">VAT included</p>
            </div>
          </div>
          <div className="basis-1/3 space-y-5 p-5">
            <h3 className="text-xl font-medium">Drop-off & Return</h3>
            <div>
              <p className="mb-1 text-xs text-neutral-400">DROP-OFF :</p>
              <ul className="ml-4 list-disc text-sm marker:text-primary">
                <li>{deliveryDate?.format("dddd, MMM DD, YYYY")}</li>
                <li>{deliveryTime?.format("hh:mm A")}</li>
                <li>{deliveryLocation}</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs text-neutral-400">RETURN :</p>
              <ul className="ml-4 list-disc text-sm marker:text-primary">
                <li>{returnDate?.format("dddd, MMM DD, YYYY")}</li>
                <li>{returnTime?.format("hh:mm A")}</li>
                <li>{returnLocation}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="basis-1/4 border-2 p-5 text-end text-sm">
          <h4 className="text-xl font-medium">
            {totalBundlePrice.toFixed(2)} JOD
          </h4>
          <div className="pb-4 pt-7">
            <p>{selected_bundle?.split("_").join(" ")}</p>
            <p>{car.car_model}</p>
          </div>
          <p>*VAT included</p>
        </div>
      </div>

      <div className="my-4 border-2 p-5">
        <div className="flex items-center justify-between gap-5 text-xl font-medium">
          <h3>Protection & Extras</h3>
          <p>{(totalProtectionPrice + totalExtrasPrice).toFixed(2)} JOD</p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-5">
            <p>
              {selected_protection} ({totalDays} Day{totalDays > 1 && "s"})
            </p>
            <p>{totalProtectionPrice.toFixed(2)} JOD</p>
          </div>
          {selected_extras.map((extra, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-5"
            >
              <p>{extra}</p>
              <p>
                {(
                  (extras.find(({ name }) => name === extra)?.price ?? 0) *
                  totalDays
                ).toFixed(2)}{" "}
                JOD
              </p>
            </div>
          ))}
          {selected_children_extras.map((extra) => {
            const quantity = childrenSeatsQuantity[extra];

            return (
              <div
                key={extra}
                className="flex items-center justify-between gap-5"
              >
                <p className="capitalize">
                  {extra.split("_").join(" ")} ({quantity}x)
                </p>
                <p>
                  {(
                    (childrenExtras.find(({ name }) => name === extra)?.price ??
                      0) *
                    totalDays *
                    quantity
                  ).toFixed(2)}{" "}
                  JOD
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-4 flex items-center justify-between gap-5 bg-primary-variant-1 p-5 text-xl font-medium">
        <h3>Total</h3>
        <p>
          {(totalBundlePrice + totalProtectionPrice + totalExtrasPrice).toFixed(
            2,
          )}{" "}
          JOD
        </p>
      </div>
      <hr />
    </section>
  );
}
