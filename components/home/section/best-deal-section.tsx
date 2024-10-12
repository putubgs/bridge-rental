import { Button } from "@mui/material";
import Image from "next/image";

export default function BestDealSection() {
  return (
    <section className="px-20 py-12">
      <div className="relative mx-auto w-full max-w-screen-2xl space-y-5 px-16 pb-20 pt-14 text-white">
        <Image
          src={"/assets/img/best-deal-banner.png"}
          alt="Banner Image"
          fill
          className="-z-10 object-cover"
        />
        <div className="absolute -top-5 right-0 bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-7 py-3 text-lg font-bold">
          BEST DEAL!
        </div>
        <div className="absolute bottom-11 right-12 h-[33px] w-[109px]">
          <Image src="/assets/img/brand-logo.png" alt="Brand Logo" fill />
        </div>

        <h2 className="font-poppins text-[58px] font-semibold italic">
          GRAB AND <span className="text-primary">DRIVE</span>
        </h2>
        <p>
          All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
        </p>
        <ul className="list-inside list-disc font-semibold text-primary">
          <li>Full Tank of Fuel</li>
          <li>Free Cancellation</li>
          <li>Full Cover Insurance (Zero Excess)</li>
          <li>Free Delivery</li>
          <li>Unlimited Mileage</li>
        </ul>
        <p>Your adventure is just a click away. enjoy worry-free travels.</p>
        <div className="pt-14">
          <Button
            variant="outlined"
            className="border-white px-14 font-medium text-white"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  );
}
