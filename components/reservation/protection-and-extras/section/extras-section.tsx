import { ChildrenExtrasType, ExtrasType } from "@/lib/enums";
import { childrenExtras, extras } from "@/lib/static/extras-dummy";
import { useRentDetailsStore } from "@/store/reservation-store";
import { countDays } from "@/utils/utils";
import { MenuItem, Select } from "@mui/material";
import Image from "next/image";

export default function ExtrasSection() {
  const {
    selected_extras,
    selected_children_extras,
    setSelectedExtras,
    setSelectedChildrenExtras,
    totalExtrasPrice,
    setTotalExtrasPrice,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    childrenSeatsQuantity,
    setChildrenSeatsQuantity,
  } = useRentDetailsStore();

  const handleSelectExtra = (extra: ExtrasType, price: number) => {
    const totalDays = countDays(
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
    );

    const isExtraSelected = selected_extras.includes(extra);

    if (isExtraSelected) {
      setSelectedExtras(selected_extras.filter((item) => item !== extra));
      setTotalExtrasPrice(totalExtrasPrice - totalDays * price);
    } else {
      setSelectedExtras([...selected_extras, extra]);
      setTotalExtrasPrice(totalExtrasPrice + totalDays * price);
    }
  };

  const handleSelectChildrenExtra = (
    extra: ChildrenExtrasType,
    price: number,
  ) => {
    const totalDays = countDays(
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
    );

    const quantity = childrenSeatsQuantity[extra];
    const isExtraSelected = selected_children_extras.includes(extra);

    if (isExtraSelected) {
      setSelectedChildrenExtras(
        selected_children_extras.filter((item) => item !== extra),
      );
      setTotalExtrasPrice(totalExtrasPrice - totalDays * quantity * price);
    } else {
      setSelectedChildrenExtras([...selected_children_extras, extra]);
      setTotalExtrasPrice(totalExtrasPrice + totalDays * quantity * price);
    }
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Available Extras</h2>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {extras.map(({ icon, name, description, price }) => {
          const isAdded = selected_extras.findIndex((val) => val === name) > -1;
          return (
            <div
              key={name}
              className="flex flex-col justify-between gap-5 border-2 bg-[#F9F9F9] p-5"
            >
              <div>
                <div className="relative aspect-square w-16">
                  <Image
                    src={icon}
                    alt="Extras Icon"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                <div className="mb-10 mt-10 space-y-2">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm text-[#727272]">{description}</p>
                </div>
              </div>
              <div className="mt-5 flex w-full items-end justify-between gap-5">
                <button
                  onClick={() => handleSelectExtra(name as ExtrasType, price)}
                  className={`rounded px-4 py-2 font-medium transition-all duration-150 ${isAdded ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3" : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"}`}
                >
                  {isAdded ? "ADDED" : "ADD"}
                </button>
                <p className="text-end text-sm font-medium">
                  {price === 0 ? "FREE" : `${price.toFixed(2)} JOD/DAY`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-2 bg-[#F9F9F9] p-5">
        <div className="flex items-center gap-5">
          <div className="relative aspect-square w-16">
            <Image
              src={"/assets/img/baby-car-seat.png"}
              alt="Baby Car Seat Icon"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Traveling with children? Travel Safety
            </h3>
            <p className="text-neutral-400">
              Select up to 3 baby seats from 0-36kg. Baby seats are fitted with
              a hygenic disposable cover.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 divide-y">
          {childrenExtras.map(({ name, price, supported_weight }) => {
            const isAdded =
              selected_children_extras.findIndex((val) => val === name) > -1;
            return (
              <div
                key={name}
                className="flex items-center justify-between gap-5 pt-3"
              >
                <div className="flex items-center gap-3">
                  <Select
                    size="small"
                    className="w-16 !border-none"
                    value={childrenSeatsQuantity[name]}
                    onChange={(e) =>
                      setChildrenSeatsQuantity({
                        ...childrenSeatsQuantity,
                        [name]: e.target.value as number,
                      })
                    }
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#999999",
                      },
                      backgroundColor: "#F4F4F4",
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                  <h3 className="capitalize">
                    {name.split("_").join(" ")} ({supported_weight})
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <p>{price.toFixed(2)} JOD/DAY</p>
                  <button
                    onClick={() =>
                      handleSelectChildrenExtra(
                        name as ChildrenExtrasType,
                        price,
                      )
                    }
                    className={`rounded px-4 py-2 font-medium transition-all duration-150 ${isAdded ? "bg-primary-variant-2 text-white hover:bg-primary-variant-3" : "bg-[#DCDCDC] text-[#7F7F7F] hover:bg-neutral-300"}`}
                  >
                    {isAdded ? "ADDED" : "ADD"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
