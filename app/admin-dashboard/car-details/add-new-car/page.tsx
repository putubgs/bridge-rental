"use client";

import { useState } from "react";
import CarForm from "@/components/admin-dashboard/car-details/car-crud-form";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AddNewCar() {
  const [carData, setCarData] = useState<{
    carModel: string;
    carType: string;
    availability: string;
    doors: string;
    passengers: string;
    luggage: string;
    grabAndDrive: string;
    completeFeeRate: string;
    packedToTheBrim: string;
    vehicleImage?: string | File | null;
  }>({
    carModel: "",
    carType: "",
    availability: "Not Available",
    doors: "",
    passengers: "",
    luggage: "",
    grabAndDrive: "",
    completeFeeRate: "",
    packedToTheBrim: "",
    vehicleImage: null,
  });

  const handleFormSubmit = async (formData: typeof carData) => {
    console.log("Submitted Data:", formData);
    try {
      let imageUrl = null;

      // Upload image if present
      if (formData.vehicleImage instanceof File) {
        const { data, error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(`cars/${formData.vehicleImage.name}`, formData.vehicleImage);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("car-images")
          .getPublicUrl(`cars/${formData.vehicleImage.name}`);

        imageUrl = publicUrlData.publicUrl;
      }

      // Convert availability to boolean
      const availabilityBoolean = formData.availability === "Available";

      // Insert data into Supabase
      const { error: insertError } = await supabase.from("CarModel").insert([
        {
          car_model: formData.carModel,
          car_type: formData.carType,
          availability: availabilityBoolean,
          doors: parseInt(formData.doors) || null,
          passengers: parseInt(formData.passengers) || null,
          luggage: parseInt(formData.luggage) || null,
          grab_and_drive: parseFloat(formData.grabAndDrive) || null,
          complete_fee_rate: parseFloat(formData.completeFeeRate) || null,
          packed_to_the_brim: parseFloat(formData.packedToTheBrim) || null,
          vehicle_image: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
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
