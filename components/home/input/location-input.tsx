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
import CheckIcon from "@mui/icons-material/Check"; // Import CheckIcon from MUI
import { MapPinIcon } from "lucide-react";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { autocomplete } from "@/lib/google";
import Image from "next/image";

interface PlaceOption {
  description: string;
  place_id: string;
}

export default function LocationInput({ formik }: { formik: any }) {
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
        // Increment the request count
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
    console.log("Delivery location changed to:", newLocation);
    if (newLocation) {
      setDeliveryLocation(newLocation.description);
      formik.setFieldValue("delivery_location", newLocation.description);
      setIsTypingDelivery(false);
      setDeliveryInputValue(newLocation.description);
      console.log("Delivery input value set to:", newLocation.description);

      // Only sync return location if same_return_location is true AND user is not actively editing return
      if (formik.values.same_return_location && !isTypingReturn) {
        setReturnLocation(newLocation.description);
        formik.setFieldValue("return_location", newLocation.description);
        setReturnInputValue(newLocation.description);
        console.log(
          "Return location synced to delivery location:",
          newLocation.description,
        );
      }
    } else {
      setDeliveryLocation("");
      formik.setFieldValue("delivery_location", "");
      setDeliveryInputValue("");
      console.log("Delivery location cleared");
    }
  };

  // Handle return location change (from Autocomplete)
  const handleReturnLocationChange = (
    _: any,
    newLocation: PlaceOption | null,
  ) => {
    console.log("Return location changed to:", newLocation);
    if (newLocation) {
      // If user explicitly changes return location, they probably want different locations
      formik.setFieldValue("same_return_location", false);
      console.log("Same return location toggled to false");

      setReturnLocation(newLocation.description);
      formik.setFieldValue("return_location", newLocation.description);
      setIsTypingReturn(false);
      setReturnInputValue(newLocation.description);
      console.log("Return input value set to:", newLocation.description);
    } else {
      setReturnLocation("");
      formik.setFieldValue("return_location", "");
      setReturnInputValue("");
      console.log("Return location cleared");
    }
  };

  // Handle input change for delivery Autocomplete
  const handleInputChangeDelivery = (_: any, inputValue: string) => {
    console.log("Delivery input changed to:", inputValue);
    setDeliveryInputValue(inputValue);
    setIsTypingDelivery(true); // Start typing
    if (inputValue) {
      fetchOptions(inputValue, "delivery");
    } else {
      setDeliveryOptions([]);
      setModalDeliveryOptions([]);
    }
  };

  // Handle input change for return Autocomplete
  const handleInputChangeReturn = (_: any, inputValue: string) => {
    console.log("Return input changed to:", inputValue);
    setReturnInputValue(inputValue);
    setIsTypingReturn(true); // Start typing
    if (inputValue) {
      fetchOptions(inputValue, "return");
    } else {
      setReturnOptions([]);
      setModalReturnOptions([]);
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

  // Handle opening the modal
  const handleOpenModal = (field: "delivery" | "return") => {
    setActiveField(field);
    setModalOpen(true);
    setModalInputValue("");
    console.log(
      `${field.charAt(0).toUpperCase() + field.slice(1)} Autocomplete clicked on mobile`,
    );
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveField(null);
    setModalInputValue("");
    console.log("Shared Dropdown closed");
  };

  // Handle selecting an option from the modal
  const handleSelectOption = (option: PlaceOption) => {
    if (activeField === "delivery") {
      handleDeliveryLocationChange(null, option);
      console.log(
        "Selected delivery location from shared dropdown:",
        option.description,
      );
    } else {
      handleReturnLocationChange(null, option);
      console.log(
        "Selected return location from shared dropdown:",
        option.description,
      );
    }
    // Removed the handleCloseModal() to keep the modal open after selection
  };

  // Optional: Retain getSortedOptions() if you have another view that requires sorted options
  /*
  const getSortedOptions = () => {
    const options =
      activeField === "delivery" ? modalDeliveryOptions : modalReturnOptions;
    const selectedLocation =
      activeField === "delivery" ? deliveryLocation : returnLocation;

    if (!selectedLocation) return options;

    const selectedOption = options.find(
      (option) => option.description === selectedLocation,
    );

    if (!selectedOption) return options;

    // Move the selected option to the top
    return [
      selectedOption,
      ...options.filter((option) => option.place_id !== selectedOption.place_id),
    ];
  };
  */

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
      <div className="h-13 flex basis-[40%] items-center gap-1 rounded-md bg-[#F3F3F3] bg-white text-black md:rounded-none md:border md:border-neutral-400 md:bg-white">
        <div className="flex h-full items-end p-2 pb-2.5 pr-1">
          <MapPinIcon
            className="size-[14px]"
            strokeWidth={1.5}
            stroke={isMobile ? "#868686" : "#000000"}
          />
        </div>
        <div className="flex h-[60px] w-full flex-col justify-center pb-0 pr-2 pt-2 md:h-[52.5px]">
          <span className="text-[8px] text-neutral-400 md:text-[10px]">
            CAR DELIVERY LOCATION
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
              console.log("Delivery Autocomplete closed");
            }}
            noOptionsText={renderNoOptions(isLoadingDelivery, isTypingDelivery)}
            filterOptions={(options, { inputValue }) => {
              const normalizedInput = normalizeString(inputValue);
              return options.filter((option) =>
                normalizeString(option.description).includes(normalizedInput),
              );
            }}
            getOptionLabel={(option) => option.description}
            renderOption={(props, option) => (
              <li {...props} key={option.place_id} style={{ fontSize: "14px" }}>
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
                  isMobile ? "Tap to search location" : "Search location"
                }
                size="small"
                variant="standard"
                inputProps={{
                  ...params.inputProps,
                  readOnly: isMobile, // Make input read-only on mobile
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
            PaperComponent={isMobile ? undefined : undefined}
            ListboxProps={{
              style: { maxHeight: "200px" },
            }}
            slotProps={{
              listbox: { className: "max-h-[300px] overflow-auto" },
            }}
          />
        </div>

        {!formik?.values["same_return_location"] && (
          <div className="flex w-full flex-col border-l border-neutral-300 p-2 pb-0 pl-2">
          <span className="text-[8px] text-neutral-400 md:text-[10px]">
              CAR PICK-UP LOCATION
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
                console.log("Return Autocomplete closed");
              }}
              noOptionsText={renderNoOptions(isLoadingReturn, isTypingReturn)}
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
                    formik.touched["return_location"] &&
                    Boolean(formik.errors["return_location"])
                  }
                  placeholder={
                    isMobile ? "Tap to search location" : "Search location"
                  }
                  size="small"
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: isMobile, // Make input read-only on mobile
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
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "none",
                    },
                  }}
                />
              )}
              PaperComponent={isMobile ? undefined : undefined}
              ListboxProps={{
                style: { maxHeight: "200px" },
              }}
              slotProps={{
                listbox: { className: "max-h-[300px] overflow-auto" },
              }}
            />
          </div>
        )}
      </div>

      {/* Shared Dropdown as a Dialog for Mobile */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          {activeField === "delivery"
            ? "Car Delivery Location"
            : "Car Pick-up Location"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            placeholder="Search location"
            size="small"
            value={modalInputValue}
            onChange={(e) => {
              const value = e.target.value;
              setModalInputValue(value);
              console.log("Shared Dropdown input changed to:", value);

              // Fetch options based on active field
              if (activeField === "delivery") {
                fetchOptions(value, "delivery");
              } else {
                fetchOptions(value, "return");
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <div className="flex flex-grow gap-1">
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
          <Button
            onClick={handleCloseModal}
            variant="text"
            sx={{
              color: "#166534", // Custom dark blue color
              "&:hover": {
                // Slightly lighter shade on hover
                backgroundColor: "transparent", // Ensures no background on hover
              },
            }}
          >
            Close
          </Button>

          {/* Optional: Add a Confirm button if needed */}
          {/* 
          <Button
            onClick={() => {
              // Handle any additional confirm logic here if needed
              handleCloseModal();
            }}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
          */}
        </DialogActions>
        <DialogContent dividers>
          <ul>
            {(activeField === "delivery"
              ? modalDeliveryOptions
              : modalReturnOptions
            ).map((option) => (
              <li
                key={option.place_id}
                ref={
                  option.description ===
                  (activeField === "delivery"
                    ? deliveryLocation
                    : returnLocation)
                    ? selectedOptionRef
                    : null
                }
                role="option"
                aria-selected={
                  option.description ===
                  (activeField === "delivery"
                    ? deliveryLocation
                    : returnLocation)
                }
                className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 ${
                  option.description ===
                  (activeField === "delivery"
                    ? deliveryLocation
                    : returnLocation)
                    ? "border-l-4 border-green-500 bg-green-200" // Selected item styles
                    : "hover:bg-gray-100" // Non-selected item hover style
                }`}
                onClick={() => {
                  handleSelectOption(option);
                  // The modal remains open after selection
                }}
              >
                <span
                  className={`${
                    option.description ===
                    (activeField === "delivery"
                      ? deliveryLocation
                      : returnLocation)
                      ? "font-semibold text-green-800" // Bold and larger text for selected option
                      : "font-normal text-black"
                  }`}
                >
                  {option.description}
                </span>
                {option.description ===
                  (activeField === "delivery"
                    ? deliveryLocation
                    : returnLocation) && (
                  <CheckIcon
                    sx={{ color: "#166534" }} // MUI CheckIcon with green color
                  />
                )}
              </li>
            ))}
            {(activeField === "delivery"
              ? modalDeliveryOptions
              : modalReturnOptions
            ).length === 0 && (
              <li className="px-4 py-3 text-gray-500">
                {activeField === "delivery"
                  ? isLoadingDelivery
                    ? "Loading..."
                    : "No locations found"
                  : isLoadingReturn
                    ? "Loading..."
                    : "No locations found"}
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
