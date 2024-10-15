import { locationOptions } from "@/lib/static/locations-dummy";
import { Autocomplete, TextField } from "@mui/material";
import { MapPinIcon } from "lucide-react";

export default function LocationInput() {
  return (
    <div className="h-13 flex basis-[40%] gap-1 border border-neutral-400 bg-white p-2 pb-0 text-black">
      <div className="flex h-full items-end pb-2.5">
        <MapPinIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex w-full flex-col">
        <span className="text-[10px] text-neutral-400">
          CAR DELIVERY LOCATION
        </span>
        <Autocomplete
          disablePortal
          options={locationOptions}
          renderOption={(props, option) => (
            <li {...props} style={{ fontSize: "14px" }}>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search location"
              size="small"
              variant="standard"
              sx={{
                height: "100%",
                "& .MuiInputBase-input": {
                  padding: "1px 0",
                  fontWeight: 500,
                  fontSize: "14px",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
