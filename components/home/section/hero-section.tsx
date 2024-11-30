"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import CarSearchForm from "../form/car-search-form";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function HeroSection() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("HomepageImage")
          .select("image_url")
          .single();

        if (fetchError) throw fetchError;

        if (data?.image_url) {
          setHeroImageUrl(data.image_url);
        } else {
          setError("No hero image found in the database.");
        }
      } catch (err) {
        console.error("Error fetching hero image URL:", err);
        setError("Failed to fetch hero image.");
      }
    };

    fetchHeroImage();
  }, []);

  if (error) {
    return (
      <section className="relative z-0 w-full h-screen max-h-[850px] px-20 pb-16 text-white bg-gray-200 flex items-center justify-center">
        <p className="text-center text-gray-600">{error}</p>
      </section>
    );
  }

  return (
    <>
      {heroImageUrl && (
        <Head>
          <link rel="preload" as="image" href={heroImageUrl} />
        </Head>
      )}
      <section className="relative z-0 w-full h-screen max-h-[850px] px-20 pb-16 text-white">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Banner Image"
            fill
            className="-z-10 object-cover"
            sizes="(max-width: 768px) 90vw, 100vw"
            priority
          />
        )}
        <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-end gap-6">
          <h2 className="font-poppins text-[64px] font-semibold leading-none">
            Car Rentals <br /> At Your Doorstep
          </h2>
          <p className="text-[28px] font-medium text-primary">
            Looking for a vehicle in Jordan?
          </p>
          <CarSearchForm />
        </div>
      </section>
    </>
  );
}
