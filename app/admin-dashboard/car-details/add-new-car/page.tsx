"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CarForm from "@/components/admin-dashboard/car-details/car-crud-form";
import { createClient } from "@/utils/supabase/client";
import { useCarStore } from "@/store/car-store";

const supabase = createClient();

export default function AddNewCar() {
  const router = useRouter();
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
    try {
      if (!formData.carType) {
        alert("Car Type is required. Please fill it in.");
        return;
      }

      let imageUrl = null;

      if (formData.vehicleImage instanceof File) {
        const { data: existingImage, error: checkError } =
          await supabase.storage.from("car-images").list("cars", {
            search: formData.vehicleImage.name,
          });

        if (checkError) throw checkError;

        if (existingImage && existingImage.length > 0) {
          const { data: publicUrlData } = supabase.storage
            .from("car-images")
            .getPublicUrl(`cars/${formData.vehicleImage.name}`);
          imageUrl = publicUrlData.publicUrl;
        } else {
          const { data, error: uploadError } = await supabase.storage
            .from("car-images")
            .upload(
              `cars/${formData.vehicleImage.name}`,
              formData.vehicleImage,
            );

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from("car-images")
            .getPublicUrl(`cars/${formData.vehicleImage.name}`);
          imageUrl = publicUrlData.publicUrl;
        }
      } else if (typeof formData.vehicleImage === "string") {
        imageUrl = formData.vehicleImage;
      }

      const newCarData = {
        car_model: formData.carModel,
        car_type: formData.carType,
        availability: formData.availability === "Available",
        doors: parseInt(formData.doors) || 0,
        passengers: parseInt(formData.passengers) || 0,
        luggage: parseInt(formData.luggage) || 0,
        grab_and_drive: parseFloat(formData.grabAndDrive) || 0,
        complete_fee_rate: parseFloat(formData.completeFeeRate) || 0,
        packed_to_the_brim: parseFloat(formData.packedToTheBrim) || 0,
        car_image: imageUrl,
      };

      const { error: insertError, data: insertedData } = await supabase
        .from("CarModel")
        .insert([newCarData])
        .select()
        .single();

      if (insertError) throw insertError;

      useCarStore.getState().addCar(insertedData);

      alert("Car added successfully!");
      router.push("/admin-dashboard/car-details");
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
