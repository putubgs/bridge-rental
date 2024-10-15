import { Switch } from "@mui/material";
import Image from "next/image";
import CarSearchForm from "../form/car-search-form";

export default function HeroSection() {
  return (
    <section className="relative z-0 h-screen w-full px-20 pb-16 text-white">
      <Image
        src={"/assets/img/home-page-hero-banner.png"}
        alt="Banner Image"
        fill
        className="-z-10 object-cover"
      />

      <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-end gap-6">
        <h2 className="font-poppins text-[64px] font-semibold leading-none">
          Car Rentals <br /> At Your Doorstep
        </h2>
        <p className="text-[28px] font-medium text-primary">
          Looking for a vehicle in Jordan?
        </p>
        <div className="space-y-3">
          <CarSearchForm />
          <div className="flex items-start justify-between gap-14 text-[11px]">
            <div className="flex items-center font-bold">
              <Switch color="primary" defaultChecked />
              <span className="whitespace-nowrap">RETURN TO SAME LOCATION</span>
            </div>
            <div className="text-end">
              <p>
                *KINDLY ENSURE THAT YOUR BOOKING IS MADE AT LEAST 2 HOURS PRIOR
                TO THE SCHEDULED VEHICLE DELIVERY. FOR IMMEDIATE BOOKINGS,
                PLEASE CONTACT OUR{" "}
                <span className="text-primary">CUSTOMER SERVICE</span> TEAM
              </p>
              <p>*BOOKINGS ARE COUNTED ON A PER-DAY BASIS (24 HOURS)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
