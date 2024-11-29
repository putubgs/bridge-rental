"use client"

import { useState } from "react";
import CarForm from "@/components/admin-dashboard/car-details/car-crud-form";

export default function AddNewCar() {
  const [carData, setCarData] = useState({
    carModel: "",
    carType: "",
    availability: "Not Available",
    doors: "",
    passengers: "",
    luggage: "",
    grabAndDrive: "",
    completeFeeRate: "",
    packedToTheBrim: "",
  });

  const handleFormSubmit = (formData: typeof carData) => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="text-[24px]">Add New Car</div>
      <div className="flex w-full gap-6 rounded-md bg-white p-8">
        <CarForm initialValues={carData} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
