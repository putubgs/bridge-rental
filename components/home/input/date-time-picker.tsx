import { SvgIcon } from "@mui/material";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

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
  return (
    <div className="relative flex basis-[30%] justify-between border border-neutral-400 bg-white text-black">
      <div className="flex h-full items-end p-2 pb-2.5 pr-0">
        <CalendarIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex shrink-0 basis-[50%] flex-col border-r border-neutral-300 p-2 pb-0">
        <span className="text-[10px] text-neutral-400">{dateLabel}</span>
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
        <span className="text-[10px] text-neutral-400">{timeLabel}</span>
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