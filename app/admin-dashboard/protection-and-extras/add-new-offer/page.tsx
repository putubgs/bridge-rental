"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ProtectionExtraForm from "@/components/admin-dashboard/protection-and-extras/pe-crud-form";

const supabase = createClient();

export default function AddNewOffer() {
  const router = useRouter();

  const [offerData, setOfferData] = useState<{
    offerDetail: string;
    price: string;
    type: string;
    availability: string;
    description: string;
    offerImage?: string | File | null;
  }>({
    offerDetail: "",
    price: "",
    type: "Protection",
    availability: "Not Available",
    description: "",
    offerImage: null,
  });

  const handleFormSubmit = async (formData: typeof offerData) => {
    try {

      let imageUrl = null;

      if (formData.offerImage instanceof File) {
        const { data: existingImage, error: checkError } =
          await supabase.storage.from("extra-images").list("additional-offers", {
            search: formData.offerImage.name,
          });

        if (checkError) throw checkError;

        if (existingImage && existingImage.length > 0) {
          const { data: publicUrlData } = supabase.storage
            .from("extra-images")
            .getPublicUrl(`additional-offers/${formData.offerImage.name}`);
          imageUrl = publicUrlData.publicUrl;
        } else {
          const { data, error: uploadError } = await supabase.storage
            .from("extra-images")
            .upload(
              `additional-offers/${formData.offerImage.name}`,
              formData.offerImage
            );

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from("extra-images")
            .getPublicUrl(`additional-offers/${formData.offerImage.name}`);
          imageUrl = publicUrlData.publicUrl;
        }
      } else if (typeof formData.offerImage === "string") {
        imageUrl = formData.offerImage;
      }

      const newOfferData = {
        offer_name: formData.offerDetail,
        price: parseFloat(formData.price),
        type: formData.type,
        availability: formData.availability === "Available",
        description: formData.description,
        image_url: imageUrl,
      };

      const { error: insertError } = await supabase
        .from("AdditionalOffers")
        .insert([newOfferData]);

      if (insertError) throw insertError;

      alert("Offer added successfully!");
      router.push("/admin-dashboard/protection-and-extras/");
    } catch (error) {
      console.error("Error adding offer:", error);
      alert("Failed to add the offer. Please try again.");
    }
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="text-[24px]">Add New Offer</div>
      <div className="flex w-full gap-6 rounded-md bg-white p-8">
        <ProtectionExtraForm
          initialValues={offerData}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
