import { Dialog } from "@mui/material";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ISuccessDialog {
  email: string;
  open: boolean;
  handleClose: () => void;
}

export default function SuccessDialog({
  open,
  handleClose,
  email,
}: ISuccessDialog) {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 0,
        },
      }}
    >
      <div className="flex flex-col items-center space-y-6 px-24 py-5 pb-14 pt-12 text-center">
        <div className="relative size-20">
          <Image src="/assets/img/check-circle.png" alt="Check Circle" fill />
        </div>
        <h3 className="text-xl font-bold">Booking Successful</h3>
        <p className="text-xs text-[#838383]">
          Booking confirmation and receipt sent to <br /> {email}
        </p>
        <div className="flex flex-col items-center space-y-[14px]">
          <div className="text-sm font-medium">
            download your booking confirmation{" "}
            <button className="text-primary-variant-3">click here</button>
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-xs text-[#727272]"
          >
            <ChevronLeftIcon
              size={20}
              className="-translate-y-[1px] fill-current stroke-none"
            />
            <span>Back to homepage</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
}
