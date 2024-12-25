import {
  Autocomplete as MuiAutocomplete,
  TextField,
  createTheme,
  ThemeProvider,
  Popper,
} from "@mui/material";
import SteeringWheelIcon from "@/components/shared/icons/steering-wheel";
import { ICarModel } from "@/lib/types";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect, useState } from "react";

interface CarTypeFilterProps {
  vehiclesData: ICarModel[];
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  translations?: Record<string, string>;
}

export default function CarTypeFilter({
  vehiclesData,
  selectedType,
  setSelectedType,
  translations = {},
}: CarTypeFilterProps) {
  const { language } = useLanguageStore();

  console.log("CarTypeFilter - language:", language); // Debug log
  console.log("CarTypeFilter - translations:", translations); // Debug log

  const vehicleTypes = Array.from(
    new Set(vehiclesData.map((car) => car.car_type)),
  ).map((type) => {
    const translatedLabel =
      language === "ar" ? translations[type] || type : type;
    console.log(`Type: ${type}, Translated: ${translatedLabel}`); // Debug log
    return {
      value: type,
      label: translatedLabel,
    };
  });

  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

  const currentValue = selectedType
    ? {
        value: selectedType,
        label:
          language === "ar"
            ? translations[selectedType] || selectedType
            : selectedType,
      }
    : null;

  console.log("CarTypeFilter - vehicleTypes:", vehicleTypes); // Debug log
  console.log("CarTypeFilter - currentValue:", currentValue); // Debug log

  return (
    <ThemeProvider theme={theme}>
      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className={`flex items-center gap-5 px-5 py-2 md:border-[#D9D9D9] md:py-5 ${
          language === "ar"
            ? "flex-row-reverse md:border-l"
            : "flex-row md:border-r"
        }`}
      >
        {language !== "ar" && (
          <div className="flex-shrink-0">
            <SteeringWheelIcon className="h-6 w-6 md:h-10 md:w-10" />
          </div>
        )}

        <MuiAutocomplete
          disablePortal
          options={vehicleTypes}
          value={currentValue}
          onChange={(event, value) => setSelectedType(value?.value || null)}
          getOptionLabel={(option) => option.label}
          className="w-full"
          sx={{
            "& .MuiAutocomplete-root": {
              direction: language === "ar" ? "rtl" : "ltr",
            },
            "& .MuiInputBase-root": {
              direction: language === "ar" ? "rtl" : "ltr",
            },
            "& .MuiAutocomplete-popupIndicator": {
              transform: language === "ar" ? "rotate(180deg)" : "none",
            },
            "& .MuiAutocomplete-listbox": {
              direction: language === "ar" ? "rtl" : "ltr",
            },
          }}
          componentsProps={{
            popper: {
              placement: language === "ar" ? "bottom-end" : "bottom-start",
              modifiers: [
                {
                  name: "flip",
                  enabled: true,
                  options: {
                    altBoundary: true,
                    rootBoundary: "document",
                    padding: 8,
                  },
                },
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={language === "ar" ? "نوع السيارة" : "VEHICLE TYPE"}
              size="small"
              variant="standard"
              sx={{
                "& .MuiInputBase-root": {
                  direction: language === "ar" ? "rtl" : "ltr",
                },
                "& .MuiInputBase-input": {
                  padding: "1px 0",
                  fontWeight: 500,
                  fontSize: { xs: "10px", md: "14px" },
                  textAlign: language === "ar" ? "right" : "left",
                },
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": { borderBottom: "none" },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <div
              style={{
                width: language === "ar" ? "100%" : "200%",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              {children}
            </div>
          )}
        />

        {language === "ar" && (
          <div className="flex-shrink-0">
            <SteeringWheelIcon className="h-6 w-6 md:h-10 md:w-10" />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
