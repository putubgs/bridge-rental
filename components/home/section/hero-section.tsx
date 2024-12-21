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
      <section className="relative z-0 flex h-screen max-h-[850px] w-full items-center justify-center bg-gray-200 px-20 pb-16 text-white">
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
      <section className="relative z-0 w-full px-0 md:pb-16 pb-5 text-white md:h-screen md:max-h-[850px] md:px-20 pt-10">
        <div className="hidden md:block">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt="Banner Image"
              fill
              className="-z-10 md:object-cover"
              sizes="(max-width: 768px) 90vw, 100vw"
              priority
            />
          )}
        </div>
        <h2 className="flex md:hidden text-[20px] text-black my-[15px] px-4">Car rentals at your doorstep</h2>
        <div className="block md:hidden w-full">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt="Banner Image"
              width={100}
              height={100}
              sizes="(max-width: 768px) 90vw, 100vw"
              className="w-full"
            />
          )}
        </div>
        <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-end gap-6 px-4">
          <h2 className="hidden font-poppins text-[64px] font-semibold leading-none md:flex">
            Car Rentals <br /> At Your Doorstep
          </h2>
          <p className="hidden text-[28px] font-medium text-primary md:flex">
            Looking for a vehicle in Jordan?
          </p>
          <CarSearchForm />
        </div>
      </section>
    </>
  );
}
