import { Button } from "@mui/material";
import Image from "next/image";

export default function BookingSection() {
  return (
    <div className="relative z-0 h-screen w-full px-20 py-11 text-white">
      <Image
        src={"/assets/img/jordan-road-trip-banner.png"}
        alt="Banner Image"
        fill
        className="-z-10 object-cover"
      />
      <section className="flex h-full flex-col items-center justify-end gap-3 text-center">
        <Button className="bg-white px-14 font-medium uppercase text-black hover:bg-neutral-200">
          Book Now
        </Button>
        <p className="w-1/4 leading-none">
          Your adventure is just a click away, enjoy worry-free travels.
        </p>
      </section>
    </div>
  );
}
