"use client";

import {
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { MapPinIcon } from "lucide-react";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { autocomplete } from "@/lib/google";
import Image from "next/image";
import useLanguageStore from "@/store/useLanguageStore";

interface PlaceOption {
  description: string;
  place_id: string;
}

export default function LocationInput({ formik }: { formik: any }) {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  const {
    setDeliveryLocation,
    setReturnLocation,
    deliveryLocation,
    returnLocation,
  } = useRentDetailsStore();

  // Main Autocomplete States
  const [deliveryOptions, setDeliveryOptions] = useState<PlaceOption[]>([]);
  const [returnOptions, setReturnOptions] = useState<PlaceOption[]>([]);
  const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
  const [isLoadingReturn, setIsLoadingReturn] = useState(false);
  const [isTypingDelivery, setIsTypingDelivery] = useState(false);
  const [isTypingReturn, setIsTypingReturn] = useState(false);
  const [deliveryInputValue, setDeliveryInputValue] = useState("");
  const [returnInputValue, setReturnInputValue] = useState("");

  // Dialog States
  const [isMobile, setIsMobile] = useState(false);
  const [activeField, setActiveField] = useState<"delivery" | "return" | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState("");
  const [modalDeliveryOptions, setModalDeliveryOptions] = useState<
    PlaceOption[]
  >([]);
  const [modalReturnOptions, setModalReturnOptions] = useState<PlaceOption[]>(
    [],
  );

  // Reference to track latest fetch requests
  const latestFetchRef = useRef<{ [key: string]: number }>({
    delivery: 0,
    return: 0,
  });

  // Reference for auto-scrolling to selected option
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  // Detect if the device is mobile
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

  // Reset internal states on component mount
  useEffect(() => {
    setDeliveryOptions([]);
    setReturnOptions([]);
    setModalDeliveryOptions([]);
    setModalReturnOptions([]);
    setIsTypingDelivery(false);
    setIsTypingReturn(false);
    setDeliveryInputValue("");
    setReturnInputValue("");
    setModalInputValue("");
    console.log("Internal states reset on mount");
  }, []);

  // Unified fetch function
  const fetchOptions = useCallback(
    debounce(async (input: string, target: "delivery" | "return") => {
      if (input) {
        latestFetchRef.current[target] += 1;
        const currentRequest = latestFetchRef.current[target];

        if (target === "delivery") {
          setIsLoadingDelivery(true);
        } else {
          setIsLoadingReturn(true);
        }
        console.log(`Fetching ${target} options for:`, input);
        try {
          const results = await autocomplete(input);
          console.log(`${target} options fetched:`, results);

          // Only update state if this is the latest request
          if (currentRequest === latestFetchRef.current[target]) {
            if (target === "delivery") {
              setDeliveryOptions(results);
              setModalDeliveryOptions(results);
            } else {
              setReturnOptions(results);
              setModalReturnOptions(results);
            }
          } else {
            console.log(`Discarding outdated ${target} options`);
          }
        } catch (error) {
          console.error(`Error fetching ${target} options:`, error);
        } finally {
          if (currentRequest === latestFetchRef.current[target]) {
            if (target === "delivery") {
              setIsLoadingDelivery(false);
            } else {
              setIsLoadingReturn(false);
            }
            console.log(`${target} loading state set to false`);
          }
        }
      } else {
        if (target === "delivery") {
          setDeliveryOptions([]);
          setModalDeliveryOptions([]);
          console.log(`Delivery options cleared due to empty input`);
        } else {
          setReturnOptions([]);
          setModalReturnOptions([]);
          console.log(`Return options cleared due to empty input`);
        }
      }
    }, 500),
    [],
  );

  // Cleanup debounced functions on unmount
  useEffect(() => {
    return () => {
      fetchOptions.cancel();
    };
  }, [fetchOptions]);

  const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[-\s]/g, "");
  };

  // Handle delivery location change (from Autocomplete)
  const handleDeliveryLocationChange = (
    _: any,
    newLocation: PlaceOption | null,
  ) => {
    if (newLocation) {
      setDeliveryLocation(newLocation.description);
      formik.setFieldValue("delivery_location", newLocation.description);
      setIsTypingDelivery(false);
      setDeliveryInputValue(newLocation.description);

      // If same_return_location is true, sync
      if (formik.values.same_return_location && !isTypingReturn) {
        setReturnLocation(newLocation.description);
        formik.setFieldValue("return_location", newLocation.description);
        setReturnInputValue(newLocation.description);
      }
    } else {
      setDeliveryLocation("");
      formik.setFieldValue("delivery_location", "");
      setDeliveryInputValue("");
    }
  };

  // Handle return location change (from Autocomplete)
  const handleReturnLocationChange = (
    _: any,
    newLocation: PlaceOption | null,
  ) => {
    if (newLocation) {
      formik.setFieldValue("same_return_location", false);
      setReturnLocation(newLocation.description);
      formik.setFieldValue("return_location", newLocation.description);
      setIsTypingReturn(false);
      setReturnInputValue(newLocation.description);
    } else {
      setReturnLocation("");
      formik.setFieldValue("return_location", "");
      setReturnInputValue("");
    }
  };

  // Handle input change for delivery
  const handleInputChangeDelivery = (_: any, inputValue: string) => {
    setDeliveryInputValue(inputValue);
    setIsTypingDelivery(true);
    if (inputValue) {
      fetchOptions(inputValue, "delivery");
    } else {
      setDeliveryOptions([]);
      setModalDeliveryOptions([]);
    }
  };

  // Handle input change for return
  const handleInputChangeReturn = (_: any, inputValue: string) => {
    setReturnInputValue(inputValue);
    setIsTypingReturn(true);
    if (inputValue) {
      fetchOptions(inputValue, "return");
    } else {
      setReturnOptions([]);
      setModalReturnOptions([]);
    }
  };

  const renderNoOptions = (isLoading: boolean, isTyping: boolean) => {
    if (isLoading) {
      return (
        <div className="p-2 text-gray-500">
          {isRTL ? "جارٍ التحميل..." : "Loading..."}
        </div>
      );
    }
    if (isTyping) {
      return (
        <div className="p-2 text-gray-500">
          {isRTL ? "لم يتم العثور على مواقع" : "No locations found"}
        </div>
      );
    }
    return null;
  };

  // Handle the modal for mobile
  const handleOpenModal = (field: "delivery" | "return") => {
    setActiveField(field);
    setModalOpen(true);
    const currentValue =
      field === "delivery" ? deliveryInputValue : returnInputValue;
    setModalInputValue(currentValue);
    if (currentValue) {
      fetchOptions(currentValue, field);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveField(null);
    setModalInputValue("");
    setModalDeliveryOptions([]);
    setModalReturnOptions([]);
  };

  // Handle selecting an option from modal
  const handleSelectOption = (option: PlaceOption) => {
    if (activeField === "delivery") {
      handleDeliveryLocationChange(null, option);
    } else {
      handleReturnLocationChange(null, option);
    }
  };

  // Auto-scroll to selected option when modal opens or selection changes
  useEffect(() => {
    if (modalOpen && activeField) {
      const selectedOption =
        activeField === "delivery" ? deliveryLocation : returnLocation;
      if (selectedOption && selectedOptionRef.current) {
        selectedOptionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [modalOpen, activeField, deliveryLocation, returnLocation]);

  return (
    <>
      {/* DELIVERY SECTION */}
      <div
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        className="h-13 flex basis-[40%] items-center gap-1 rounded-md bg-[#F3F3F3] text-black md:rounded-none md:border md:border-neutral-400 md:bg-white"
      >
        <div className="flex h-full items-end p-2 pb-2.5 pr-1">
          <MapPinIcon
            className="size-[14px]"
            strokeWidth={1.5}
            stroke={isMobile ? "#868686" : "#000000"}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-center pb-0 pr-2 pt-2 md:h-[52.5px]">
          <span className="text-[8px] text-neutral-400 md:text-[10px]">
            {isRTL ? "موقع تسليم السيارة" : "CAR DELIVERY LOCATION"}
          </span>
          <Autocomplete
            inputValue={deliveryInputValue}
            value={
              deliveryOptions.find(
                (option) =>
                  option.description === formik.values["delivery_location"],
              ) || null
            }
            onChange={handleDeliveryLocationChange}
            onInputChange={handleInputChangeDelivery}
            disablePortal
            options={deliveryOptions}
            open={!isMobile && isTypingDelivery}
            onClose={() => {
              setIsTypingDelivery(false);
            }}
            noOptionsText={isRTL ? "لم يتم العثور على مواقع" : "No locations found"}
            filterOptions={(options, { inputValue }) => {
              const normalizedInput = normalizeString(inputValue);
              return options.filter((option) =>
                normalizeString(option.description).includes(normalizedInput),
              );
            }}
            getOptionLabel={(option) => option.description}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.place_id}
                style={{ fontSize: "14px" }}
              >
                {option.description}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched["delivery_location"] &&
                  Boolean(formik.errors["delivery_location"])
                }
                placeholder={
                  isMobile 
                    ? (isRTL ? "انقر للبحث عن الموقع" : "Tap to search location")
                    : (isRTL ? "ابحث عن الموقع" : "Search location")
                }
                size="small"
                variant="standard"
                inputProps={{
                  ...params.inputProps,
                  readOnly: isMobile,
                  style: { textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" },
                }}
                onClick={() => {
                  if (isMobile) {
                    handleOpenModal("delivery");
                  }
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "1px 0",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: isMobile ? "pointer" : "text",
                    opacity: "1 !important",
                    WebkitTextFillColor: isMobile
                      ? "#868686 !important"
                      : "black !important",
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
            ListboxProps={{
              style: { maxHeight: 200 },
            }}
            slotProps={{
              listbox: {
                className: "max-h-[300px] overflow-auto",
              },
            }}
          />
        </div>
      </div>

      {/* RETURN SECTION */}
      {!formik?.values["same_return_location"] && (
        <div className="h-13 flex basis-[40%] items-center gap-1 rounded-md bg-[#F3F3F3] text-black md:rounded-none md:border md:border-neutral-400 md:bg-white">
          <div className="flex h-full items-end p-2 pb-2.5 pr-1">
            <MapPinIcon
              className="size-[14px]"
              strokeWidth={1.5}
              stroke={isMobile ? "#868686" : "#000000"}
            />
          </div>
          <div className="flex h-full w-full flex-col justify-center pb-0 pr-2 pt-2 md:h-[52.5px]">
            <span className="text-[8px] text-neutral-400 md:text-[10px]">
              {isRTL ? "موقع إعادة السيارة" : "CAR PICK-UP LOCATION"}
            </span>
            <Autocomplete
              inputValue={returnInputValue}
              value={
                returnOptions.find(
                  (option) =>
                    option.description === formik.values["return_location"],
                ) || null
              }
              onChange={handleReturnLocationChange}
              onInputChange={handleInputChangeReturn}
              disablePortal
              options={returnOptions}
              open={!isMobile && isTypingReturn}
              onClose={() => {
                setIsTypingReturn(false);
              }}
              noOptionsText={
                isRTL ? "لم يتم العثور على مواقع" : "No locations found"
              }
              filterOptions={(options, { inputValue }) => {
                const normalizedInput = normalizeString(inputValue);
                return options.filter((option) =>
                  normalizeString(option.description).includes(
                    normalizedInput,
                  ),
                );
              }}
              getOptionLabel={(option) => option.description}
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.place_id}
                  style={{ fontSize: "14px" }}
                >
                  {option.description}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    formik.touched["return_location"] &&
                    Boolean(formik.errors["return_location"])
                  }
                  placeholder={
                    isMobile
                      ? isRTL
                        ? "انقر للبحث عن موقع"
                        : "Tap to search location"
                      : isRTL
                        ? "ابحث عن موقع"
                        : "Search location"
                  }
                  size="small"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: isMobile,
                    style: { textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }
                  }}
                  onClick={() => {
                    if (isMobile) {
                      handleOpenModal("return");
                    }
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "1px 0",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: isMobile ? "pointer" : "text",
                      opacity: "1 !important",
                      WebkitTextFillColor: isMobile
                        ? "#868686 !important"
                        : "black !important",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                      {
                        borderBottom: "none",
                      },
                    "& .MuiInput-underline:after": {
                      borderBottom: "none",
                    },
                  }}
                />
              )}
              ListboxProps={{
                style: { maxHeight: 200 },
              }}
              slotProps={{
                listbox: { className: "max-h-[300px] overflow-auto" },
              }}
            />
          </div>
        </div>
      )}

      {/* Shared Dropdown as a Dialog for Mobile */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle
          sx={{
            textAlign: isRTL ? "right" : "left",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {activeField === "delivery"
            ? isRTL
              ? "موقع استلام السيارة"
              : "Car Delivery Location"
            : isRTL
              ? "موقع إعادة السيارة"
              : "Car Pick-up Location"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            placeholder={isRTL ? "ابحث عن موقع" : "Search location"}
            size="small"
            value={modalInputValue}
            onChange={(e) => {
              const value = e.target.value;
              setModalInputValue(value);

              if (!value.trim()) {
                if (activeField === "delivery") {
                  setModalDeliveryOptions([]);
                } else {
                  setModalReturnOptions([]);
                }
                return;
              }

              if (activeField === "delivery") {
                fetchOptions(value, "delivery");
              } else {
                fetchOptions(value, "return");
              }
            }}
            inputProps={{
              style: {
                textAlign: isRTL ? "right" : "left",
                direction: isRTL ? "rtl" : "ltr",
                padding: isRTL ? "8px 14px 8px 8px" : "8px 8px 8px 14px"
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
          <div className={`flex flex-grow gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-[10px] text-gray-400">
              {isRTL ? "مدعوم من خرائط جوجل" : "Powered by Google Maps"}
            </span>
            <Image
              src="/assets/img/google-maps-pin.png"
              width={10}
              height={10}
              alt="Maps Pin"
            />
          </div>
          <Button
            onClick={handleCloseModal}
            variant="text"
            sx={{
              color: "#166534",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {isRTL ? "إغلاق" : "Close"}
          </Button>
        </DialogActions>
        <DialogContent dividers>
          <ul style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {(activeField === "delivery"
              ? modalDeliveryOptions
              : modalReturnOptions
            ).map((option) => {
              const isSelected =
                option.description ===
                (activeField === "delivery"
                  ? deliveryLocation
                  : returnLocation);
              return (
                <li
                  key={option.place_id}
                  ref={isSelected ? selectedOptionRef : null}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 ${
                    isSelected
                      ? `${isRTL ? "border-r-4" : "border-l-4"} border-green-500 bg-green-200`
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    handleSelectOption(option);
                  }}
                >
                  <span
                    className={`${
                      isSelected
                        ? "font-semibold text-green-800"
                        : "font-normal text-black"
                    }`}
                  >
                    {option.description}
                  </span>
                  {isSelected && <CheckIcon sx={{ color: "#166534" }} />}
                </li>
              );
            })}
            {(activeField === "delivery"
              ? modalDeliveryOptions
              : modalReturnOptions
            ).length === 0 && (
              <li className="px-4 py-3 text-gray-500">
                {activeField === "delivery"
                  ? isLoadingDelivery
                    ? isRTL
                      ? "جارٍ التحميل..."
                      : "Loading..."
                    : isRTL
                      ? "لم يتم العثور على مواقع"
                      : "No locations found"
                  : isLoadingReturn
                    ? isRTL
                      ? "جارٍ التحميل..."
                      : "Loading..."
                    : isRTL
                      ? "لم يتم العثور على مواقع"
                      : "No locations found"}
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
