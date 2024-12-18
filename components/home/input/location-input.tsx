"use client";

import { Autocomplete, TextField } from "@mui/material";
import { MapPinIcon } from "lucide-react";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { autocomplete } from "@/lib/google";
import Image from "next/image";

export default function LocationInput({ formik }: { formik: any }) {
  const {
    setDeliveryLocation,
    setReturnLocation,
    deliveryLocation,
    returnLocation,
  } = useRentDetailsStore();

  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [returnOptions, setReturnOptions] = useState<string[]>([]);
  const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
  const [isLoadingReturn, setIsLoadingReturn] = useState(false);
  const [isTypingDelivery, setIsTypingDelivery] = useState(false);
  const [isTypingReturn, setIsTypingReturn] = useState(false);
  const [deliveryInputValue, setDeliveryInputValue] = useState("");
  const [returnInputValue, setReturnInputValue] = useState("");

  const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[-\s]/g, "");
  };

  const fetchDeliveryOptions = useCallback(
    debounce(async (input: string) => {
      if (input) {
        setIsLoadingDelivery(true);
        try {
          const results = await autocomplete(input);
          setDeliveryOptions(results.map((item) => item.description));
        } finally {
          setIsLoadingDelivery(false);
        }
      } else {
        setDeliveryOptions([]);
      }
    }, 500),
    [],
  );

  const fetchReturnOptions = useCallback(
    debounce(async (input: string) => {
      if (input) {
        setIsLoadingReturn(true);
        try {
          const results = await autocomplete(input);
          setReturnOptions(results.map((item) => item.description));
        } finally {
          setIsLoadingReturn(false);
        }
      } else {
        setReturnOptions([]);
      }
    }, 500),
    [],
  );

  const handleDeliveryLocationChange = (_: any, newLocation: string | null) => {
    if (newLocation) {
      setDeliveryLocation(newLocation);
      formik.setFieldValue("delivery_location", newLocation);
      setIsTypingDelivery(false);
      setDeliveryInputValue(newLocation);

      if (formik.values.same_return_location) {
        setReturnLocation(newLocation);
        formik.setFieldValue("return_location", newLocation);
        setReturnInputValue(newLocation);
      }
    } else {
      setDeliveryLocation("");
      formik.setFieldValue("delivery_location", "");
      setDeliveryInputValue("");

      if (formik.values.same_return_location) {
        setReturnLocation("");
        formik.setFieldValue("return_location", "");
        setReturnInputValue("");
      }
    }
  };

  const handleReturnLocationChange = (_: any, newLocation: string | null) => {
    if (newLocation) {
      setReturnLocation(newLocation);
      formik.setFieldValue("return_location", newLocation);
      setIsTypingReturn(false);
      setReturnInputValue(newLocation);
    } else {
      setReturnLocation("");
      formik.setFieldValue("return_location", "");
      setReturnInputValue("");
    }
  };

  const handleInputChangeDelivery = (_: any, inputValue: string) => {
    setDeliveryInputValue(inputValue);
    const shouldOpenDropdown =
      normalizeString(inputValue) !==
      normalizeString(formik.values["delivery_location"] || "");
    setIsTypingDelivery(shouldOpenDropdown);

    if (shouldOpenDropdown) {
      fetchDeliveryOptions(inputValue);
    } else {
      setDeliveryOptions([]);
    }
  };

  const handleInputChangeReturn = (_: any, inputValue: string) => {
    setReturnInputValue(inputValue);
    const shouldOpenDropdown =
      normalizeString(inputValue) !==
      normalizeString(formik.values["return_location"] || "");
    setIsTypingReturn(shouldOpenDropdown);

    if (shouldOpenDropdown) {
      fetchReturnOptions(inputValue);
    } else {
      setReturnOptions([]);
    }
  };

  const renderNoOptions = (isLoading: boolean, isTyping: boolean) => {
    if (isLoading) {
      return <div className="p-2 text-gray-500">Loading...</div>;
    }
    if (isTyping) {
      return <div className="p-2 text-gray-500">No locations found</div>;
    }
    return null;
  };

  return (
    <div className="h-13 flex basis-[40%] items-center gap-1 border border-neutral-400 bg-white text-black">
      <div className="flex h-full items-end p-2 pb-2.5 pr-1">
        <MapPinIcon className="size-[14px]" strokeWidth={1.5} />
      </div>
      <div className="flex w-full flex-col pb-0 pr-2 pt-2">
        <span className="text-[10px] text-neutral-400">
          CAR DELIVERY LOCATION
        </span>
        <Autocomplete
          inputValue={deliveryInputValue}
          value={formik.values["delivery_location"] || deliveryLocation || ""}
          onChange={handleDeliveryLocationChange}
          onInputChange={handleInputChangeDelivery}
          disablePortal
          options={deliveryOptions}
          open={isTypingDelivery}
          onClose={() => setIsTypingDelivery(false)}
          noOptionsText={renderNoOptions(isLoadingDelivery, isTypingDelivery)}
          filterOptions={(options, { inputValue }) => {
            const normalizedInput = normalizeString(inputValue);
            return options.filter((option) =>
              normalizeString(option).includes(normalizedInput),
            );
          }}
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
          PaperComponent={({ children, ...props }) => (
            <div
              {...props}
              className="mt-1 flex flex-col rounded-md bg-white shadow-lg"
            >
              <div className="flex-grow">{children}</div>
              <div className="flex items-center justify-between border-t p-2">
                <span className="text-[10px] text-gray-400">
                  Powered by Google Maps
                </span>
                <Image
                  src="/assets/img/google-maps-pin.png"
                  width={10}
                  height={10}
                  alt="Maps Pin"
                />
              </div>
            </div>
          )}
        />
      </div>

      {!formik?.values["same_return_location"] && (
        <div className="flex w-full flex-col border-l border-neutral-300 p-2 pb-0 pl-2">
          <span className="text-[10px] text-neutral-400">
            CAR RETURN LOCATION
          </span>
          <Autocomplete
            inputValue={returnInputValue}
            value={formik.values["return_location"] || returnLocation || ""}
            onChange={handleReturnLocationChange}
            onInputChange={handleInputChangeReturn}
            disablePortal
            options={returnOptions}
            open={isTypingReturn}
            onClose={() => setIsTypingReturn(false)}
            noOptionsText={renderNoOptions(isLoadingReturn, isTypingReturn)}
            filterOptions={(options, { inputValue }) => {
              const normalizedInput = normalizeString(inputValue);
              return options.filter((option) =>
                normalizeString(option).includes(normalizedInput),
              );
            }}
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
            PaperComponent={({ children, ...props }) => (
              <div
                {...props}
                className="mt-1 flex flex-col rounded-md bg-white shadow-lg"
              >
                <div className="flex-grow">{children}</div>
                <div className="flex items-center justify-between border-t p-2">
                  <span className="text-[10px] text-gray-400">
                    Powered by Google Maps
                  </span>
                  <Image
                    src="/assets/img/google-maps-pin.png"
                    width={10}
                    height={10}
                    alt="Maps Pin"
                  />
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
