import { Rate, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import QuickViewHover from "../../Products/QuickViewHover";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import LinkButton from "@/components/Shared/LinkButton";

const ProductCard = ({ item }) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border hover:border-primary duration-300 rounded-xl shadow-xl relative group w-auto h-[320px] lg:w-[230px] lg:h-[400px] mx-auto bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        {item?.video && isHovered ? (
          <video
            src={formatImagePath(item?.video)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            autoPlay
            muted
            controls={false}
            className="w-full h-[160px] lg:h-[220px] rounded-t-xl object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={formatImagePath(item?.mainImage)}
            alt={item?.name}
            width={230}
            height={220}
            className="rounded-t-xl w-[250px] h-[160px] lg:h-[220px] group-hover:scale-110 duration-500"
          />
        )}

        <div className="hidden lg:block absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 duration-500 z-10">
          <QuickViewHover item={item} />
        </div>
        <div className="lg:hidden">
          <QuickViewHover item={item} />
        </div>
      </div>

      <div className="bg-white px-3 lg:p-5 rounded-b-xl">
        <div className="text-xs text-black/50">{item?.category?.name}</div>
        <LinkButton href={`/products/${item?.slug}`}>
          <Tooltip placement="top" title={item?.name}>
            <h2 className="text-sm lg:text-base text-start font-medium mt-2 mb-2 hidden md:block">
              {item?.name.length > 33
                ? item.name.slice(0, 33).concat("...")
                : item.name}
            </h2>
            <h2 className="text-sm lg:text-base text-start font-medium mt-2 mb-2 md:hidden">
              {item?.name.length > 30
                ? item.name.slice(0, 30).concat("...")
                : item.name}
            </h2>
          </Tooltip>

          <div className="lg:flex items-center mb-2 gap-4 font-bold hidden">
            <Rate
              disabled
              value={item?.ratings?.average}
              allowHalf
              className="text-sm"
            />
          </div>

          <div className="flex items-center gap-2 lg:gap-4 justify-start absolute bottom-4">
            {item?.offerPrice && (
              <p className="text-sm lg:text-base font-medium line-through text-red-500">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
            {item?.offerPrice ? (
              <p className="text-primary text-sm lg:text-xl font-medium">
                {globalData?.results?.currency + " " + item?.offerPrice}
              </p>
            ) : (
              <p className="text-primary text-sm lg:text-xl font-medium">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
          </div>
        </LinkButton>
      </div>
    </div>
  );
};

export default ProductCard;
