// "use client";

// import useDialog from "@/hooks/useDialog";
// import { Dialog, IconButton } from "@mui/material";
// import { XIcon } from "lucide-react";
// import Image from "next/image";

// export default function BestDealSection() {
//   const { open, handleOpen, handleClose } = useDialog();

//   return (
//     <section className="md:px-20 md:py-12 px-0 py-0">
//       {/* Desktop Version (md and up) */}
//       <div className="relative mx-auto hidden w-full max-w-screen-2xl space-y-5 px-16 pb-20 pt-14 text-white md:block">
//         <Image
//           src={"/assets/img/best-deal-banner.png"}
//           alt="Banner Image"
//           fill
//           className="-z-10 object-cover"
//           sizes="(max-width: 768px) 90vw, 100vw"
//         />
//         <div className="absolute -top-5 right-1 bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-7 py-3 text-lg font-bold">
//           BEST DEAL!
//         </div>
//         <div className="absolute bottom-11 right-12 h-[33px] w-[109px]">
//           <Image
//             src="/assets/img/brand-logo-white.png"
//             alt="Brand Logo"
//             fill
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//         </div>

//         <h2 className="font-poppins text-[58px] font-semibold italic">
//           GRAB AND <span className="text-primary">DRIVE</span>
//         </h2>
//         <p>
//           All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
//         </p>
//         <ul className="list-inside list-disc font-semibold text-primary">
//           <li>Full Tank of Fuel</li>
//           <li>Free Cancellation</li>
//           <li>Full Cover Insurance (Zero Excess)</li>
//           <li>Free Delivery</li>
//           <li>Unlimited Mileage</li>
//         </ul>
//         <p>Your adventure is just a click away. Enjoy worry-free travels.</p>
//         <div className="pt-14">
//           <button
//             onClick={handleOpen}
//             className="border border-white px-14 pb-2 pt-3 text-[20px] font-medium text-white"
//           >
//             LEARN MORE
//           </button>
//         </div>
//       </div>

//       {/* Mobile Version (below md) */}
//       <div className="relative block space-y-5 bg-black p-6 text-white md:hidden">
//         {/* BEST DEAL label */}
//         <div className="absolute md:right-4 md:top-4 right-0 top-0 rounded bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-4 py-2 text-sm font-bold">
//           BEST DEAL!
//         </div>

//         {/* Car Image (Optional: can use a different image or styling) */}

//         <h2 className="font-poppins text-3xl font-semibold italic">
//           GRAB AND <span className="text-primary">DRIVE</span>
//         </h2>
//         <p className="text-sm">
//           All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
//         </p>
//         <ul className="list-inside list-disc space-y-1 text-sm font-semibold text-primary">
//           <li>Full Tank of Fuel</li>
//           <li>Free Cancellation</li>
//           <li>Full Cover Insurance (Zero Excess)</li>
//           <li>Free Delivery</li>
//           <li>Unlimited Mileage</li>
//         </ul>
//         <p className="text-sm">
//           Your adventure is just a click away. Enjoy worry-free travels.
//         </p>
//         <button
//           onClick={handleOpen}
//           className="mt-4 w-full border border-white py-3 text-center text-base font-medium text-white"
//         >
//           LEARN MORE
//         </button>
//       </div>

//       {/* Dialog (shared for both versions) */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         PaperProps={{ className: "rounded-none border-2 border-black" }}
//       >
//         <div className="space-y-1 rounded-none bg-primary">
//           <div className="flex w-full justify-end p-3 pb-0">
//             <IconButton onClick={handleClose} className="border-2">
//               <XIcon />
//             </IconButton>
//           </div>
//           <div className="md:p-20 p-5 pt-10">
//             <h3 className="text-5xl font-semibold">BUNDLE COMPARISON POSTER</h3>
//             <p className="text-3xl font-medium">(WILL BE EDITED SOON)</p>
//           </div>
//         </div>
//       </Dialog>
//     </section>
//   );
// }

"use client";

import useDialog from "@/hooks/useDialog";
import { Dialog, IconButton } from "@mui/material";
import { XIcon } from "lucide-react";
import Image from "next/image";

export default function BestDealSection() {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <section className="px-4 md:py-8 sm:px-6 sm:py-12 lg:px-20">
      <div className="relative mx-auto w-full max-w-screen-xl space-y-5  text-white lg:px-16">
        {/* Banner Image */}
        <div className="relative flex items-start justify-center flex-col h-48 w-full sm:h-64 md:h-80 lg:h-96 px-[30px] gap-2">
          <Image
            src="/assets/img/best-deal-banner.png"
            alt="Best Deal Banner"
            fill
            className="-z-10 rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          <h2 className="font-poppins text-[16px] font-semibold italic">
            GRAB AND <span className="text-primary">DRIVE</span>
          </h2>

          {/* Description */}
          {/* <p className="text-sm sm:text-base">
          All-Inclusive, All Yours! Book Now & Hit the Road with Confidence!
        </p> */}

          {/* Features List */}
          <ul className="list-inside list-disc space-y-1 text-[8px] font-semibold text-primary">
            <li>Full Tank of Fuel</li>
            <li>Free Cancellation</li>
            <li>Full Cover Insurance (Zero Excess)</li>
            <li>Free Delivery</li>
            <li>Unlimited Mileage</li>
          </ul>

          {/* Additional Description */}
          {/* <p className="text-sm sm:text-base">
          Your adventure is just a click away. Enjoy worry-free travels.
        </p> */}

          {/* Learn More Button */}
          <div className="">
            <button
              onClick={handleOpen}
              className="rounded-sm border border-white bg-white px-4 py-1 text-[6px] font-medium text-gray-500 transition-colors duration-300 hover:bg-white sm:px-8 sm:py-3"
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* "BEST DEAL!" Badge */}
        <div className="absolute -top-5 right-0 bg-gradient-to-r from-[#FF8181] to-[#FF4040] px-4 py-2 text-[7px] font-bold rounded-tr-md rounded-bl-md">
          BEST DEAL!
        </div>

        {/* Brand Logo */}
        {/* <div className="absolute bottom-8 right-2 w-24 h-24 sm:w-32 sm:h-32">
          <Image
            src="/assets/img/brand-logo-white.png"
            alt="Brand Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div> */}

        {/* Heading */}

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
      </div>
    </section>
  );
}
