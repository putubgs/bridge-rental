import { Dialog } from "@mui/material";
import { ClockIcon, XIcon } from "lucide-react";

interface IPaymentFailedDialog {
  open: boolean;
  message: string;
  pending?: boolean;
  handleClose: () => void;
}

export default function PaymentFailedDialog({
  open,
  message,
  pending = false,
  handleClose,
}: IPaymentFailedDialog) {
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
      <div className="flex flex-col items-center space-y-6 px-12 py-5 pb-12 pt-12 text-center sm:px-24">
        {pending ? (
          <div className="flex size-20 items-center justify-center rounded-full bg-[#FFF4DB]">
            <ClockIcon className="size-10 text-[#E0A100]" strokeWidth={2.5} />
          </div>
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full bg-[#FFE5E5]">
            <XIcon className="size-10 text-[#FF4040]" strokeWidth={2.5} />
          </div>
        )}
        <h3 className="text-xl font-bold">
          {pending ? "Payment Pending" : "Payment Unsuccessful"}
        </h3>
        <p className="max-w-xs text-xs text-[#838383]">{message}</p>
        <button
          onClick={handleClose}
          className="rounded bg-primary-variant-2 px-8 py-3 text-sm font-medium text-white hover:bg-primary-variant-3"
        >
          {pending ? "Close" : "Try again"}
        </button>
      </div>
    </Dialog>
  );
}
