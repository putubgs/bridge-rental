"use client";

import useDialog from "@/hooks/useDialog";
import { Dialog, IconButton } from "@mui/material";
import { XIcon } from "lucide-react";
import Image from "next/image";

export default function BestDealSection() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <section className="md:px-20 md:py-12 px-0 py-0">
      {/* Desktop Version (md and up) */}
      <div className="relative mx-auto hidden w-full max-w-screen-2xl space-y-5 px-16 pb-20 pt-14 text-white md:block">
        <Image
          src={"/assets/img/best-deal-banner.png"}
          alt="Banner Image"
          fill
          className="-z-10 object-cover"
          sizes="(max-width: 768px) 90vw, 100vw"
        />
        <div className="absolute -top-5 right-1 bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-7 py-3 text-lg font-bold">
          BEST DEAL!
        </div>
        <div className="absolute bottom-11 right-12 h-[33px] w-[109px]">
          <Image
            src="/assets/img/brand-logo-white.png"
            alt="Brand Logo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
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
        <p>Your adventure is just a click away. Enjoy worry-free travels.</p>
        <div className="pt-14">
          <button
            onClick={handleOpen}
            className="border border-white px-14 pb-2 pt-3 text-[20px] font-medium text-white"
          >
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Mobile Version (below md) */}
      <div className="relative block space-y-5 bg-black p-6 text-white md:hidden">
        {/* BEST DEAL label */}
        <div className="absolute md:right-4 md:top-4 right-0 top-0 rounded bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-4 py-2 text-sm font-bold">
          BEST DEAL!
        </div>

        {/* Car Image (Optional: can use a different image or styling) */}

        <h2 className="font-poppins text-3xl font-semibold italic">
          GRAB AND <span className="text-primary">DRIVE</span>
        </h2>
        <p className="text-sm">
          All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm font-semibold text-primary">
          <li>Full Tank of Fuel</li>
          <li>Free Cancellation</li>
          <li>Full Cover Insurance (Zero Excess)</li>
          <li>Free Delivery</li>
          <li>Unlimited Mileage</li>
        </ul>
        <p className="text-sm">
          Your adventure is just a click away. Enjoy worry-free travels.
        </p>
        <button
          onClick={handleOpen}
          className="mt-4 w-full border border-white py-3 text-center text-base font-medium text-white"
        >
          LEARN MORE
        </button>
      </div>

      {/* Dialog (shared for both versions) */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rounded-none border-2 border-black" }}
      >
        <div className="space-y-1 rounded-none bg-primary">
          <div className="flex w-full justify-end p-3 pb-0">
            <IconButton onClick={handleClose} className="border-2">
              <XIcon />
            </IconButton>
          </div>
          <div className="md:p-20 p-5 pt-10">
            <h3 className="text-5xl font-semibold">BUNDLE COMPARISON POSTER</h3>
            <p className="text-3xl font-medium">(WILL BE EDITED SOON)</p>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
