import Image from "next/image";
import CarSearchForm from "../form/car-search-form";
import ExperienceSection from "./experience-section";

export default function HeroSection() {
  return (
<section className="relative z-0 w-full h-screen max-h-[850px] px-20 pb-16 text-white">
      <Image
        src={"/assets/img/home-page-hero-banner.png"}
        alt="Banner Image"
        fill
        className="-z-10 object-cover"
        sizes="(max-width: 768px) 90vw, 100vw"
      />

      <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-end gap-6">
        <h2 className="font-poppins text-[64px] font-semibold leading-none">
          Car Rentals <br /> At Your Doorstep
        </h2>
        <p className="text-[28px] font-medium text-primary">
          Looking for a vehicle in Jordan?
        </p>
        <CarSearchForm />
      </div>
    </section>
  );
}
