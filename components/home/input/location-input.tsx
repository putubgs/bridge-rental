import { Autocomplete, TextField } from "@mui/material";
import { MapPinIcon } from "lucide-react";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useState } from "react";
import debounce from "lodash.debounce";
import { autocomplete } from "@/lib/google";

export default function LocationInput({ formik }: { formik: any }) {
  const { 
    setDeliveryLocation, 
    setReturnLocation, 
    deliveryLocation, 
    returnLocation 
  } = useRentDetailsStore();

  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [returnOptions, setReturnOptions] = useState<string[]>([]);  

  const fetchDeliveryOptions = debounce(async (input: string) => {
    if (input) {
      const results = await autocomplete(input);
      setDeliveryOptions(results.map((item) => item.description));
    }
  }, 500);

  const fetchReturnOptions = debounce(async (input: string) => {
    if (input) {
      const results = await autocomplete(input);
      setReturnOptions(results.map((item) => item.description));
    }
  }, 500);

  const handleDeliveryLocationChange = (_: any, newLocation: string | null) => {
    if (newLocation) {
      setDeliveryLocation(newLocation);
      formik.setFieldValue("delivery_location", newLocation);

      if (formik.values.same_return_location) {
        setReturnLocation(newLocation);
        formik.setFieldValue("return_location", newLocation);
      }
    }
  };

  const handleInputChangeDelivery = (_: any, inputValue: string) => {
    fetchDeliveryOptions(inputValue);
  };

  const handleInputChangeReturn = (_: any, inputValue: string) => {
    fetchReturnOptions(inputValue);
  };

  return (
    <div className="h-13 flex basis-[40%] gap-1 border border-neutral-400 bg-white text-black items-center">
      <div className="flex h-full items-end p-2 pb-2.5 pr-1">
        <MapPinIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex w-full flex-col pb-0 pr-2 pt-2">
        <span className="text-[10px] text-neutral-400">
          CAR DELIVERY LOCATION
        </span>
        <Autocomplete
          value={formik.values["delivery_location"] || deliveryLocation || ""}
          onChange={handleDeliveryLocationChange}
          onInputChange={handleInputChangeDelivery}
          disablePortal
          options={deliveryOptions}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <li key={key} {...otherProps} style={{ fontSize: "14px" }}>
                {option}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={
                formik.touched["delivery_location"] &&
                Boolean(formik.errors["delivery_location"])
              }
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

      {!formik?.values["same_return_location"] && (
        <div className="flex w-full flex-col border-l border-neutral-300 p-2 pb-0 pl-2">
          <span className="text-[10px] text-neutral-400">
            CAR RETURN LOCATION
          </span>
          <Autocomplete
            value={formik.values["return_location"] || returnLocation || ""}
            onChange={(_, newVal) => {
              setReturnLocation(newVal);
              formik.setFieldValue("return_location", newVal);
            }}
            onInputChange={handleInputChangeReturn}
            disablePortal
            options={returnOptions}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <li key={key} {...otherProps} style={{ fontSize: "14px" }}>
                  {option}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched["return_location"] &&
                  Boolean(formik.errors["return_location"])
                }
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
