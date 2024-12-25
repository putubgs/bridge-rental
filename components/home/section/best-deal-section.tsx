"use client";

import useDialog from "@/hooks/useDialog";
import { Dialog, IconButton } from "@mui/material";
import { XIcon } from "lucide-react";
import Image from "next/image";

export default function BestDealSection() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <section className="px-4 sm:px-6 md:px-20 md:py-12">
      <div className="max-w-screen relative mx-auto w-full space-y-5 text-white">
        {/* Banner Image */}
        <div className="relative flex h-48 w-full flex-col items-start justify-center gap-2 px-[30px] sm:h-64 md:h-[600px] lg:gap-6">
          <Image
            src="/assets/img/best-deal-banner.png"
            alt="Best Deal Banner"
            fill
            className="-z-10 rounded-lg object-cover md:rounded-none"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          <h2 className="font-poppins text-[16px] font-semibold italic md:text-[58px]">
            GRAB AND <span className="text-primary">DRIVE</span>
          </h2>

          {/* Description - visible on desktop only */}
          <p className="hidden text-base md:block lg:text-lg">
            All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
          </p>

          {/* Features List */}
          <ul className="list-inside list-disc space-y-1 text-[8px] font-semibold text-primary md:text-base lg:text-lg">
            <li>Full Tank of Fuel</li>
            <li>Free Cancellation</li>
            <li>Full Cover Insurance (Zero Excess)</li>
            <li>Free Delivery</li>
            <li>Unlimited Mileage</li>
          </ul>

          {/* Additional Description - visible on desktop only */}
          <p className="hidden text-base md:block lg:text-lg">
            Your adventure is just a click away. Enjoy worry-free travels.
          </p>

          {/* Learn More Button */}
          <div className="mt-2 md:mt-8 lg:mt-12">
            <button
              onClick={handleOpen}
              className="rounded-sm border border-white bg-white px-4 py-1 text-[6px] font-medium text-gray-500 transition-colors duration-300 hover:bg-white hover:text-gray-500 sm:px-8 sm:py-3 md:border-2 md:bg-transparent md:px-20 md:py-4 md:text-base md:tracking-wider md:text-white lg:text-lg"
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* "BEST DEAL!" Badge */}
        <div className="absolute -top-5 right-0 rounded-bl-md rounded-tr-md bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-4 py-2 text-[7px] font-bold md:rounded-none md:bg-[#FF7F7F] md:bg-none md:text-lg">
          BEST DEAL!
        </div>

        {/* Brand Logo - visible on desktop only */}
        <div className="absolute bottom-8 right-8 hidden h-8 w-24 md:block">
          <Image
            src="/assets/img/brand-logo-white.png"
            alt="Brand Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className:
            "rounded-none border-2 border-black w-11/12 sm:w-3/4 md:w-1/2",
        }}
      >
        <div className="space-y-1 bg-primary">
          {/* Close Button */}
          <div className="flex w-full justify-end p-3 pb-0">
            <IconButton onClick={handleClose} className="border-2">
              <XIcon />
            </IconButton>
          </div>

          {/* Dialog Content */}
          <div className="p-6 sm:p-10">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              BUNDLE COMPARISON POSTER
            </h3>
            <p className="mt-2 text-lg sm:text-xl">(WILL BE EDITED SOON)</p>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
