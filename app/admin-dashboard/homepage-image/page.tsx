"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin-dashboard/img-uploder";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function HomepageImage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  const fetchCurrentImage = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("HomepageImage")
        .select("image_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data?.image_url) {
        setCurrentImage(data?.image_url);
      } else {
        setCurrentImage(null);
        setError("No image found in the database.");
      }
    } catch (err) {
      console.error("Error fetching current image URL:", err);
      setError("Failed to fetch current image.");
    }
  };
  

  const saveImage = async () => {
    if (!newImage) {
      alert("No new image selected!");
      return;
    }
  
    try {
      const newImageName = `${Date.now()}_${newImage.name.replace(/\s+/g, "-")}`;

      const { data: existingImages } = await supabase
        .from("HomepageImage")
        .select("image_url");

      const oldPaths = (existingImages ?? [])
        .map((row) => {
          const encodedPath = row.image_url?.split("/homepage-image/")[1];
          return encodedPath ? decodeURIComponent(encodedPath) : null;
        })
        .filter((path): path is string => Boolean(path));

      if (oldPaths.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from("homepage-image")
          .remove(oldPaths);
        if (deleteError) {
          console.error("Error deleting old image:", deleteError);
        }
      }

      await supabase.from("HomepageImage").delete().neq("image_url", "");
  
      const { error: uploadError } = await supabase.storage
        .from("homepage-image")
        .upload(newImageName, newImage);
  
      if (uploadError) throw uploadError;
  
      const { data: publicUrlData } = supabase.storage
        .from("homepage-image")
        .getPublicUrl(newImageName);
  
      const newImageUrl = publicUrlData.publicUrl || null;
  
      const { error: insertError } = await supabase
        .from("HomepageImage")
        .insert({ image_url: newImageUrl });
  
      if (insertError) throw insertError;
  
      setCurrentImage(newImageUrl);
      setNewImage(null);
      alert("Image saved successfully!");
    } catch (err) {
      console.error("Error saving image:", err);
      setError("Failed to save image.");
    }
  };
  

  const handleImageChange = (file: File | null) => {
    setNewImage(file);
    if (!file) {
      setError("No image selected.");
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="flex items-center justify-between">
        <div className="text-[24px]">Homepage Image</div>
        <div
          className="cursor-pointer rounded-md bg-[#5E8EFF] px-3 py-2 text-white"
          onClick={saveImage}
        >
          + Save Image
        </div>
      </div>
      <div className="flex h-full w-full gap-6 rounded-md bg-white p-8">
        <ImageUploader
          error={error || undefined}
          onFileChange={handleImageChange}
          initialImage={currentImage || ""}
        />
      </div>
    </div>
  );
}
