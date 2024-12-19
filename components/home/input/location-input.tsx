"use client";

import { Autocomplete, TextField } from "@mui/material";
import { MapPinIcon } from "lucide-react";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useState, useCallback, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [showSharedDropdown, setShowSharedDropdown] = useState(false);
  const [dropdownContent, setDropdownContent] = useState<React.ReactNode>(null);
  const [dropdownProps, setDropdownProps] = useState<any>(null);
  const [activeField, setActiveField] = useState<"delivery" | "return" | null>(
    null,
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (showSharedDropdown) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showSharedDropdown]);

  const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[-\s]/g, "");
  };

  const handlePaperRender = useCallback(
    ({ children, ...props }: any) => {
      if (isMobile) {
        requestAnimationFrame(() => {
          setDropdownContent(children);
          setDropdownProps(props);
        });
        return null;
      }

      return (
        <div
          {...props}
          className="mt-1 flex flex-col rounded-md bg-white shadow-lg"
        >
          <div className="max-h-[200px] overflow-auto">{children}</div>
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
      );
    },
    [isMobile],
  );

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

  // Handle delivery location change
  const handleDeliveryLocationChange = (_: any, newLocation: string | null) => {
    if (newLocation) {
      setDeliveryLocation(newLocation);
      formik.setFieldValue("delivery_location", newLocation);
      setIsTypingDelivery(false);
      setDeliveryInputValue(newLocation);

      // Only sync return location if same_return_location is true AND user is not actively editing return
      if (formik.values.same_return_location && !isTypingReturn) {
        setReturnLocation(newLocation);
        formik.setFieldValue("return_location", newLocation);
        setReturnInputValue(newLocation);
      }
    } else {
      setDeliveryLocation("");
      formik.setFieldValue("delivery_location", "");
      setDeliveryInputValue("");
    }
  };

  // Handle return location change
  const handleReturnLocationChange = (_: any, newLocation: string | null) => {
    if (newLocation) {
      // If user explicitly changes return location, they probably want different locations
      formik.setFieldValue("same_return_location", false);

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

  // Handle input change for delivery
  const handleInputChangeDelivery = (_: any, inputValue: string) => {
    setDeliveryInputValue(inputValue);
    setIsTypingDelivery(true); // Start typing
    if (inputValue) {
      fetchDeliveryOptions(inputValue);
    } else {
      setDeliveryOptions([]);
    }
  };

  // Handle input change for return
  const handleInputChangeReturn = (_: any, inputValue: string) => {
    setReturnInputValue(inputValue);
    setIsTypingReturn(true); // Start typing
    if (inputValue) {
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
    <>
      <div className="h-13 flex basis-[40%] items-center gap-1 border border-neutral-400 bg-white text-black">
        <div className="flex h-full items-end p-2 pb-2.5 pr-1">
          <MapPinIcon className="size-[14px]" strokeWidth={1.5} />
        </div>
        <div className="flex w-full flex-col pb-0 pr-2 pt-2">
          <span className="text-[10px] text-neutral-400">
            CAR DELIVERY LOCATION
          </span>
          <Autocomplete<string>
            inputValue={deliveryInputValue}
            value={formik.values["delivery_location"] || deliveryLocation || ""}
            onChange={handleDeliveryLocationChange}
            onInputChange={handleInputChangeDelivery}
            onClick={() => {
              if (isMobile) {
                setActiveField("delivery");
                setShowSharedDropdown(true);
                setIsTypingDelivery(true);
              }
            }}
            disablePortal
            options={deliveryOptions}
            open={!isMobile && isTypingDelivery}
            onClose={() => {
              setIsTypingDelivery(false);
              if (isMobile) setShowSharedDropdown(false);
            }}
            noOptionsText={renderNoOptions(isLoadingDelivery, isTypingDelivery)}
            filterOptions={(options, { inputValue }) => {
              const normalizedInput = normalizeString(inputValue);
              return options.filter((option) =>
                normalizeString(option).includes(normalizedInput),
              );
            }}
            renderInput={(params) => (
              <div
                onClick={() => {
                  if (isMobile) {
                    setActiveField("delivery");
                    setShowSharedDropdown(true);
                  }
                }}
              >
                <TextField
                  {...params}
                  error={
                    formik.touched["delivery_location"] &&
                    Boolean(formik.errors["delivery_location"])
                  }
                  placeholder="Search location"
                  size="small"
                  variant="standard"
                  disabled={isMobile}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "1px 0",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: isMobile ? "pointer" : "text",
                      opacity: "1 !important",
                      WebkitTextFillColor: "black !important",
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
              </div>
            )}
            PaperComponent={handlePaperRender}
            ListboxProps={{
              style: { maxHeight: isMobile ? "300px" : "200px" },
            }}
            slotProps={{
              listbox: { className: "max-h-[300px] overflow-auto" },
            }}
          />
        </div>

        {!formik?.values["same_return_location"] && (
          <div className="flex w-full flex-col border-l border-neutral-300 p-2 pb-0 pl-2">
            <span className="text-[10px] text-neutral-400">
              CAR RETURN LOCATION
            </span>
            <Autocomplete<string>
              inputValue={returnInputValue}
              value={formik.values["return_location"] || returnLocation || ""}
              onChange={handleReturnLocationChange}
              onInputChange={handleInputChangeReturn}
              onClick={() => {
                if (isMobile) {
                  setActiveField("return");
                  setShowSharedDropdown(true);
                  setIsTypingReturn(true);
                }
              }}
              disablePortal
              options={returnOptions}
              open={!isMobile && isTypingReturn}
              onClose={() => {
                setIsTypingReturn(false);
                if (isMobile) setShowSharedDropdown(false);
              }}
              noOptionsText={renderNoOptions(isLoadingReturn, isTypingReturn)}
              filterOptions={(options, { inputValue }) => {
                const normalizedInput = normalizeString(inputValue);
                return options.filter((option) =>
                  normalizeString(option).includes(normalizedInput),
                );
              }}
              renderOption={(props, option: string) => { 
                const { key, ...otherProps } = props;
                return (
                  <li key={key} {...otherProps} style={{ fontSize: "14px" }}>
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <div
                  onClick={() => {
                    if (isMobile) {
                      setActiveField("return");
                      setShowSharedDropdown(true);
                    }
                  }}
                >
                  <TextField
                    {...params}
                    error={
                      formik.touched["return_location"] &&
                      Boolean(formik.errors["return_location"])
                    }
                    placeholder="Search location"
                    size="small"
                    variant="standard"
                    disabled={isMobile}
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "1px 0",
                        fontWeight: 500,
                        fontSize: "14px",
                        cursor: isMobile ? "pointer" : "text",
                        opacity: "1 !important",
                        WebkitTextFillColor: "black !important",
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
                </div>
              )}
              PaperComponent={handlePaperRender}
              ListboxProps={{
                style: { maxHeight: isMobile ? "300px" : "200px" },
              }}
              slotProps={{
                listbox: { className: "max-h-[300px] overflow-auto" },
              }}
            />
          </div>
        )}
      </div>

      {showSharedDropdown && isMobile && (
        <>
          <div
            className="fixed inset-0 z-[999] bg-black bg-opacity-50"
            onClick={() => {
              setShowSharedDropdown(false);
              setIsTypingDelivery(false);
              setIsTypingReturn(false);
              setActiveField(null);
            }}
          ></div>

          <div className="fixed inset-x-0 top-20 z-[1000] bg-white shadow-lg">
            <div className="relative z-10 flex items-center justify-between border-b p-4">
              <span className="text-sm font-medium">
                {activeField === "delivery"
                  ? "Car Delivery Location"
                  : "Car Return Location"}
              </span>
              <button
                onClick={() => {
                  setShowSharedDropdown(false);
                  setIsTypingDelivery(false);
                  setIsTypingReturn(false);
                  setActiveField(null);
                }}
                className="text-neutral-400"
              >
                Close
              </button>
            </div>

            <div className="p-4">
              <TextField
                fullWidth
                autoFocus
                placeholder="Search location"
                size="small"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value);

                  if (activeField === "delivery") {
                    setDeliveryInputValue(value);
                    if (value) fetchDeliveryOptions(value);
                  } else {
                    setReturnInputValue(value);
                    if (value) fetchReturnOptions(value);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between border-b border-t px-4 py-2">
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

            <div className="h-[calc(100vh-280px)] overflow-y-auto">
              <ul>
                {(activeField === "delivery"
                  ? deliveryOptions
                  : returnOptions
                ).map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer border-b border-gray-100 px-4 py-3 text-black hover:bg-gray-100"
                    onClick={() => {
                      if (activeField === "delivery") {
                        handleDeliveryLocationChange(null, option);
                      } else {
                        handleReturnLocationChange(null, option);
                      }
                      setShowSharedDropdown(false);
                      setActiveField(null);
                    }}
                  >
                    {option}
                  </li>
                ))}
                {(activeField === "delivery" ? deliveryOptions : returnOptions)
                  .length === 0 && (
                  <li className="px-4 py-3 text-gray-500">
                    {(
                      activeField === "delivery"
                        ? isLoadingDelivery
                        : isLoadingReturn
                    )
                      ? "Loading..."
                      : "No locations found"}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
