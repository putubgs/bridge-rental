import { locationOptions } from "@/lib/static/locations-dummy";
import { Autocomplete, TextField } from "@mui/material";
import { MapPinIcon } from "lucide-react";

interface ILocationInput {
  sameReturnLocation: boolean;
}

export default function LocationInput({ sameReturnLocation }: ILocationInput) {
  return (
    <div className="h-13 flex basis-[40%] gap-1 border border-neutral-400 bg-white text-black">
      <div className="flex h-full items-end p-2 pb-2.5 pr-1">
        <MapPinIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex w-full flex-col pb-0 pt-2">
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
      {!sameReturnLocation && (
        <div className="flex w-full flex-col border-l border-neutral-300 p-2 pb-0 pl-2">
          <span className="text-[10px] text-neutral-400">
            CAR RETURN LOCATION
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
      )}
    </div>
  );
}
