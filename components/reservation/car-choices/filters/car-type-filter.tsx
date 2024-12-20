import { Autocomplete, TextField } from "@mui/material";
import SteeringWheelIcon from "@/components/shared/icons/steering-wheel";
import { ICarModel } from "@/lib/types";

interface CarTypeFilterProps {
  vehiclesData: ICarModel[];
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export default function CarTypeFilter({
  vehiclesData,
  selectedType,
  setSelectedType,
}: CarTypeFilterProps) {
  const vehicleTypes = Array.from(
    new Set(vehiclesData.map((car) => car.car_type)),
  );

  return (
    <div className="flex items-center gap-5 px-5 py-5 md:border-r md:border-[#D9D9D9]">
      <div className="flex-shrink-0">
        <SteeringWheelIcon className="h-6 w-6 md:h-10 md:w-10" />
      </div>

      <Autocomplete
        disablePortal
        options={vehicleTypes}
        value={selectedType}
        onChange={(event, value) => setSelectedType(value)}
        className="w-full"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="VEHICLE TYPE"
            size="small"
            variant="standard"
            sx={{
              "& .MuiInputBase-input": {
                padding: "1px 0",
                fontWeight: 500,
                fontSize: { xs: "14px", md: "14px" },
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
              width: "200%",
              backgroundColor: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {children}
          </div>
        )}
      />
    </div>
  );
}
