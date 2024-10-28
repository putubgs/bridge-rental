import { childrenExtras, extras } from "@/lib/static/extras-dummy";
import { Button } from "@mui/material";
import Image from "next/image";

export default function ExtrasSection() {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Available Extras</h2>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {extras.map(({ icon, name, description, price }) => (
          <div className="flex flex-col justify-between gap-5 border-2 bg-[#F9F9F9] p-5">
            <div>
              <div className="relative aspect-square w-16">
                <Image src={icon} alt="Extras Icon" fill />
              </div>
              <div className="mb-10 mt-10 space-y-2">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-[#727272]">{description}</p>
              </div>
            </div>
            <div className="mt-5 flex w-full items-end justify-between gap-5">
              <Button
                variant="contained"
                className="!rounded !bg-[#DCDCDC] !font-overpass !text-[#7F7F7F]"
              >
                SELECT
              </Button>
              <p className="text-end text-sm font-medium">
                {price === 0 ? "FREE" : `${price.toFixed(2)} JOD/DAY`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-2 bg-[#F9F9F9] p-5">
        <div className="flex items-center gap-5">
          <div className="relative aspect-square w-16">
            <Image
              src={"/assets/img/baby-car-seat.png"}
              alt="Baby Car Seat Icon"
              fill
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
        <div className="mt-7 flex flex-col gap-2 divide-y">
          {childrenExtras.map(({ name, price }, index) => (
            <div className="flex items-center justify-between gap-5 pt-2">
              <div>
                <h3>{name}</h3>
              </div>
              <div className="flex items-center gap-4">
                <p>{price.toFixed(2)} JOD/DAY</p>
                <Button
                  variant="contained"
                  className="!rounded !bg-[#DCDCDC] !font-overpass !text-[#7F7F7F]"
                >
                  ADD
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
