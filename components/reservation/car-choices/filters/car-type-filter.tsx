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
  const vehicleTypes = Array.from(new Set(vehiclesData.map((car) => car.car_type)));

  return (
    <div
      className="flex items-center gap-5 border-r border-[#D9D9D9] px-5 py-5"
      style={{ flexBasis: "25%" }}
    >
      <div>
        <SteeringWheelIcon size={32} />
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
              "& .MuiInputBase-input": { padding: "1px 0", fontWeight: 500, fontSize: "14px" },
              "& .MuiInput-underline:before": { borderBottom: "none" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
              "& .MuiInput-underline:after": { borderBottom: "none" },
            }}
          />
        )}
      />
    </div>
  );
}
