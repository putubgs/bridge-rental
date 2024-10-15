"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import TestimonyCard from "../card/testimony-card";
import { testimonies } from "@/lib/static/testimonies-dummy";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";

export default function TestimoniesSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const setSwiperState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="mb-10 px-[4.5rem] py-12">
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            The community reviews about our car hire
          </h2>
          <p className="font-medium">
            More thanks to everyone who&apos;s sent us their feedback and
            appreciation.
          </p>
        </div>

        <div className="flex items-center justify-between gap-5">
          <IconButton
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeftIcon className="size-10" strokeWidth={0.8} />
          </IconButton>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setSwiperState(swiper);
            }}
            onSlideChange={(swiper) => setSwiperState(swiper)}
            slidesPerView={3}
            spaceBetween={25}
            className="!px-2"
          >
            {testimonies.map(({ review_id, review_date, ...resProps }) => (
              <SwiperSlide className="overflow-y-visible py-2">
                <TestimonyCard
                  key={review_id}
                  review_date={dayjs(review_date).format("MMM YYYY")}
                  {...resProps}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <IconButton
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRightIcon className="size-10" strokeWidth={0.8} />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
