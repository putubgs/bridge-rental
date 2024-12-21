import { SvgIcon } from "@mui/material";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface IDateTimePicker {
  dateLabel?: string;
  timeLabel?: string;
  minDate?: Dayjs;
  minTime?: Dayjs;
  value: Dayjs;
  timeValue: Dayjs | null;
  onDateChange:
    | ((
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>,
      ) => void)
    | undefined;
  onTimeChange: (value: Dayjs | null) => void;
}

export default function DateTimePicker({
  value,
  onDateChange,
  minTime,
  onTimeChange,
  dateLabel = "DATE",
  timeLabel = "TIME",
  minDate = dayjs.tz(),
}: IDateTimePicker) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      console.log("Is Mobile:", mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="relative flex basis-[30%] justify-between rounded-md text-black md:gap-0 md:rounded-none md:border md:border-neutral-400">
      <div className="flex h-[60px] items-end justify-center bg-[#F3F3F3] p-2 pb-3.5 pr-0 md:h-[52.5px] md:bg-white md:pb-2.5 rounded-tl-md rounded-bl-md md:rounded-tl-none md:rounded-bl-none">
        <CalendarIcon
          className="size-[14px]"
          strokeWidth={1.5}
          stroke={isMobile ? "#868686" : "#000000"}
        />
      </div>
      <div className="r-2 mr-2 flex h-[60px] shrink-0 basis-[50%] flex-col justify-center bg-[#F3F3F3] p-2 pb-0 md:mr-0 md:h-[52.5px] md:border-r md:border-neutral-300 md:bg-white md:rounded-none rounded-tr-md rounded-br-md md:rounded-tr-none md:rounded-br-none">
        <span className="text-[10px] text-[#A0A0A0] md:text-neutral-400">
          {dateLabel}
        </span>
        <DatePicker
          value={value}
          onChange={onDateChange}
          format="MMM DD, YYYY"
          minDate={minDate}
          slots={{
            openPickerIcon: () => (
              <SvgIcon
                component={ChevronDownIcon}
                className="size-4 stroke-none"
              />
            ),
          }}
          slotProps={{
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
                    // Conditional styling for mobile
                    color: isMobile ? "#868686 !important" : "black",
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
      <div className="flex h-[60px] w-fit flex-col justify-center bg-[#F3F3F3] p-2 pb-1 pl-3 md:h-[52.5px] md:bg-white md:rounded-none rounded-md">
        <span className="text-[10px] text-[#A0A0A0] md:text-neutral-400">
          {timeLabel}
        </span>
        <TimePicker
          // ampm={false}
          value={value}
          minTime={minTime}
          onChange={onTimeChange}
          slots={{
            openPickerIcon: () => (
              <SvgIcon
                component={ChevronDownIcon}
                className="size-4 stroke-none"
              />
            ),
          }}
          slotProps={{
            popper: {
              className: minTime && minTime.hour() >= 12 ? "hide-am" : "",
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
                    color: isMobile ? "#868686 !important" : "black",
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
