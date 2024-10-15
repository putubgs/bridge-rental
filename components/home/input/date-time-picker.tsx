import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

interface IDateTimePicker {
  date_label?: string;
  time_label?: string;
}

export default function DateTimePicker({
  date_label = "DATE",
  time_label = "TIME",
}: IDateTimePicker) {
  return (
    <div className="relative flex basis-[30%] justify-between border border-neutral-400 bg-white text-black">
      <div className="flex h-full items-end p-2 pb-2.5 pr-0">
        <CalendarIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex shrink-0 basis-[50%] flex-col border-r border-neutral-300 p-2 pb-0">
        <span className="text-[10px] text-neutral-400">{date_label}</span>
        <DatePicker
          defaultValue={dayjs()}
          format="MMM DD, YYYY"
          slots={{
            openPickerIcon: ChevronDownIcon,
          }}
          slotProps={{
            openPickerIcon: {
              width: "15px",
              height: "15px",
              color: "transparent",
              fill: "#999999",
            },
            openPickerButton: {
              size: "small",
            },
            textField: {
              InputProps: {
                sx: {
                  padding: 0,
                  fontWeight: 500,
                  fontSize: "14px",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-input": {
                    padding: "0px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
            },
          }}
        />
      </div>
      <div className="flex w-fit flex-col p-2 pb-1 pl-3">
        <span className="text-[10px] text-neutral-400">{time_label}</span>
        <TimePicker
          defaultValue={dayjs()}
          slots={{
            openPickerIcon: ChevronDownIcon,
          }}
          slotProps={{
            openPickerIcon: {
              width: "15px",
              height: "15px",
              color: "transparent",
              fill: "#999999",
            },
            openPickerButton: {
              size: "small",
            },
            textField: {
              InputProps: {
                sx: {
                  padding: 0,
                  fontWeight: 500,
                  fontSize: "14px",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-input": {
                    padding: "0px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
