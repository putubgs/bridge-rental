"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import CarForm from "@/components/admin-dashboard/car-details/car-crud-form";
import { createClient } from "@/utils/supabase/client";
import { useCarStore } from "@/store/car-store";

const supabase = createClient();

export default function EditCar() {
  const router = useRouter();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const carId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (carId) {
      fetchCarData(carId);
    }
  }, [carId]);

  const fetchCarData = async (carId: string) => {
    try {
      const { data, error } = await supabase
        .from("CarModel")
        .select("*")
        .eq("car_id", carId)
        .single();

      if (error) throw error;

      setCarData({
        carModel: data.car_model,
        carType: data.car_type,
        availability: data.availability ? "Available" : "Not Available",
        doors: data.doors.toString(),
        passengers: data.passengers.toString(),
        luggage: data.luggage.toString(),
        grabAndDrive: data.grab_and_drive.toString(),
        completeFeeRate: data.complete_fee_rate.toString(),
        packedToTheBrim: data.packed_to_the_brim.toString(),
        vehicleImage: data.car_image || null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleFormSubmit = async (formData: typeof carData) => {
    console.log("Submitted Data:", formData);
  
    try {
      let imageUrl = formData.vehicleImage;
  
      const { data: currentCarData, error: fetchError } = await supabase
        .from("CarModel")
        .select("car_image")
        .eq("car_id", carId)
        .single();
  
      if (fetchError) throw fetchError;
  
      const oldImageUrl = currentCarData?.car_image;
  
      if (formData.vehicleImage instanceof File) {
        const { data: storageData, error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(`cars/${formData.vehicleImage.name}`, formData.vehicleImage, {
            cacheControl: "3600",
            upsert: true,
          });
  
        if (uploadError) {
          throw new Error("Image upload failed: " + uploadError.message);
        }
  
        const { data: publicUrlData } = supabase.storage
          .from("car-images")
          .getPublicUrl(`cars/${formData.vehicleImage.name}`);
        imageUrl = publicUrlData?.publicUrl || null;
  
        console.log("New image uploaded successfully:", imageUrl);
      }
  
      if (oldImageUrl && oldImageUrl !== imageUrl) {
        const { data: otherUses, error: checkError } = await supabase
          .from("CarModel")
          .select("car_image")
          .neq("car_id", carId)
          .eq("car_image", oldImageUrl);
  
        if (checkError) throw checkError;
  
        if (!otherUses || otherUses.length === 0) {
          const encodedOldImagePath = oldImageUrl.split("car-images/")[1];
          const oldImagePath = decodeURIComponent(encodedOldImagePath);
  
          if (oldImagePath) {
            const { error: deleteError } = await supabase.storage
              .from("car-images")
              .remove([oldImagePath]);
  
            if (deleteError) {
              console.error("Error deleting old image from storage:", deleteError);
            } else {
              console.log("Old image deleted successfully from storage.");
            }
          }
        } else {
          console.log("Old image is still in use by other data. Not deleting.");
        }
      }
  
      const { data: updatedCar, error: updateError } = await supabase
        .from("CarModel")
        .update({
          car_model: formData.carModel,
          car_type: formData.carType,
          availability: formData.availability === "Available",
          doors: parseInt(formData.doors),
          passengers: parseInt(formData.passengers),
          luggage: parseInt(formData.luggage),
          grab_and_drive: parseFloat(formData.grabAndDrive),
          complete_fee_rate: parseFloat(formData.completeFeeRate),
          packed_to_the_brim: parseFloat(formData.packedToTheBrim),
          car_image: imageUrl,
        })
        .eq("car_id", carId)
        .select()
        .single();
  
      if (updateError) {
        throw new Error("Failed to update car data: " + updateError.message);
      }
  
      useCarStore.getState().updateCar(updatedCar);
  
      alert("Car updated successfully!");
      router.push("/admin-dashboard/car-details");
    } catch (error) {
      console.error("Error updating car data:", error);
      alert("Failed to update car. Please try again.");
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="text-[24px]">Edit Vehicle Categories</div>
      <div className="flex w-full gap-6 rounded-md bg-white p-8">
        <CarForm initialValues={carData} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
