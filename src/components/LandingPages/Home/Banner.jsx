"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import LinkButton from "@/components/Shared/LinkButton";
import { sendGTMEvent } from "@next/third-parties/google";
import { useAddServerTrackingMutation } from "@/redux/services/serverTracking/serverTrackingApi";
import useGetURL from "@/utilities/hooks/useGetURL";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/services/device/deviceSlice";

const Banner = () => {
  const dispatch = useDispatch();

  const swiperRef = useRef();
  const { data: sliders } = useGetAllSlidersQuery();

  const url = useGetURL();
  const [addServerTracking] = useAddServerTrackingMutation();

  useEffect(() => {
    sendGTMEvent({ event: "PageView", value: url });
    const data = {
      event: "PageView",
      data: {
        event_source_url: url,
      },
    };
    addServerTracking(data);
  }, [url]);

  const activeSliders = sliders?.results?.filter(
    (item) => item.status === "Active" && !item?.bottomBanner
  );

  const itemClickHandler = (item) => {
    if (item?.category?.name) {
      dispatch(setFilter(item?.category?.name));
    }
  };

  return (
    <section className="relative lg:container mx-auto">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        slidesPerView={1}
        navigation
        className="mySwiper"
        loop
      >
        {activeSliders?.map((item) => {
          return (
            <SwiperSlide key={item?._id}>
              <LinkButton
                href={
                  item?.name
                    ? item.name
                    : item?.category?.name
                    ? `/products`
                    : "/"
                }
              >
                <Image
                  src={
                    item?.attachment ??
                    "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                  }
                  alt={"Banner Image"}
                  width={2500}
                  height={450}
                  className="h-[200px] lg:h-[600px] w-full rounded-xl"
                  onClick={() => itemClickHandler(item)}
                />
              </LinkButton>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-between gap-5 mt-10">
        <button
          className="z-10 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl bg-white text-black border hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[40%] left-5 lg:left-10"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <FaAngleLeft className="text-xl" />
        </button>
        <button
          className="z-10 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl bg-white text-black border hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[40%] right-5 lg:right-10"
          onClick={() => swiperRef.current.slideNext()}
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default Banner;
