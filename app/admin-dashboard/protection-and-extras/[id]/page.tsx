"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProtectionExtraForm from "@/components/admin-dashboard/protection-and-extras/pe-crud-form";

const supabase = createClient();

export default function EditOffer() {
  const router = useRouter();
  const { id } = useParams();
  const offerId = Array.isArray(id) ? id[0] : id;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferData = async () => {
      if (!offerId) {
        console.error("No offer ID provided in the query.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("AdditionalOffers")
          .select("*")
          .eq("id", offerId)
          .single();

        if (error) throw error;

        setOfferData({
          offerDetail: data.offer_name || "",
          price: data.price?.toString() || "",
          type:
            data.type === "Extras" &&
            data.description === null &&
            data.image_url === null
              ? "Extras (Baby Seats)"
              : data.type || "Protection",
          availability: data.availability ? "Available" : "Not Available",
          description: data.description || "",
          offerImage: data.image_url || null,
        });
      } catch (error) {
        console.error("Error fetching offer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [offerId]);

  const handleFormSubmit = async (formData: typeof offerData) => {
    console.log("Submitted Data:", formData);

    try {
      let imageUrl = formData.offerImage;

      if (formData.offerImage instanceof File) {
        const { data: storageData, error: uploadError } = await supabase.storage
          .from("additional-offers")
          .upload(`offers/${formData.offerImage.name}`, formData.offerImage, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw new Error("Image upload failed: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("additional-offers")
          .getPublicUrl(`offers/${formData.offerImage.name}`);
        imageUrl = publicUrlData?.publicUrl || null;

        console.log("New image uploaded successfully:", imageUrl);
      }

      const { data: updatedOffer, error: updateError } = await supabase
        .from("AdditionalOffers")
        .update({
          offer_name: formData.offerDetail,
          price: parseFloat(formData.price),
          type:
            formData.type === "Extras (Baby Seats)" ? "Extras" : formData.type,
          availability: formData.availability === "Available",
          description: formData.description,
          image_url: imageUrl,
        })
        .eq("id", offerId)
        .select()
        .single();

      if (updateError) {
        throw new Error("Failed to update offer: " + updateError.message);
      }

      console.log("Offer updated successfully:", updatedOffer);
      alert("Offer updated successfully!");
      router.push("/admin-dashboard/protection-and-extras");
    } catch (error) {
      console.error("Error updating offer data:", error);
      alert("Failed to update offer. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="text-[24px]">Edit Offer</div>
      <div className="flex w-full gap-6 rounded-md bg-white p-8">
        <ProtectionExtraForm
          initialValues={offerData}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
