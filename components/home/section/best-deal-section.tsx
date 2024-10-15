"use client";

import useDialog from "@/hooks/useDialog";
import { Button, Dialog, IconButton } from "@mui/material";
import { XIcon } from "lucide-react";
import Image from "next/image";

export default function BestDealSection() {
  const { open, handleOpen, handleClose } = useDialog();

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
            onClick={handleOpen}
            variant="outlined"
            className="border-white px-14 font-medium text-white"
          >
            LEARN MORE
          </Button>
        </div>
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
            <div className="p-20 pt-10">
              <h3 className="text-5xl font-semibold">
                BUNDLE COMPARISON POSTER
              </h3>
              <p className="text-3xl font-medium">(WILL BE EDITED SOON)</p>
            </div>
          </div>
        </Dialog>
      </div>
    </section>
  );
}
