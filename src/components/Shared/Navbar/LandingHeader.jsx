"use client";

import { useCurrentUser } from "@/redux/services/auth/authSlice";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { MenuOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { useSelector } from "react-redux";
import BottomNavigation from "./BottomNavigation";
import CategoryNavigation from "./CategoryNavigation";
import LandingTopHeader from "./LandingTopHeader";

const LandingHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: globalData } = useGetAllGlobalSettingQuery();
  const user = useSelector(useCurrentUser);

  const { data: products } = useGetAllProductsQuery();

  const [options, setOptions] = useState([]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const top = (
    <div className="bg-primary">
      <div className="xl:container mx-auto flex items-center justify-between px-5 py-2 text-white font-bold">
        <Link href={"/track-order"} className="flex items-center gap-2">
          <FaLocationDot />
          Track Order
        </Link>
        <div className="hidden md:block">
          {!user && (
            <Link
              href={"/sign-in"}
              className="flex items-center gap-2 text-primary"
            >
              <Button type="default" className="!px-6 !py-4 !font-bold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    const filteredOptions = products?.results?.filter(
      (product) =>
        product?.name?.toLowerCase().includes(value.toLowerCase()) ||
        product?.category?.name?.toLowerCase().includes(value.toLowerCase())
    );

    setOptions(
      filteredOptions?.map((product) => ({
        value: product.name,
        label: (
          <Link
            href={`/products/${product?.slug}`}
            className="flex items-center gap-4 hover:text-primary pb-2 border-b border-b-gray-300"
          >
            <Image
              src={formatImagePath(product?.mainImage)}
              alt="product"
              width={30}
              height={30}
              className="object-cover"
            />
            <div className="ml-2">
              <p className="text-lg font-medium">{product?.name}</p>
              <p>
                Price: {globalData?.results?.currency}
                {product?.offerPrice > 0
                  ? product?.offerPrice
                  : product?.sellingPrice}
              </p>
              <p>Category: {product?.category?.name}</p>
            </div>
          </Link>
        ),
      })) || []
    );
  };

  return (
    <header>
      <nav className="lg:mb-5">
        {isMobile ? (
          <>
            {top}
            <div className="flex items-center justify-between -my-3">
              <Link href={"/"}>
                <Image
                  src={globalData?.results?.logo}
                  priority
                  alt="logo"
                  width={80}
                  height={80}
                  className="w-fit h-fit py-3"
                />
              </Link>
              <div className="flex items-center">
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
                  style={{ margin: 16 }}
                />
              </div>
            </div>
            <Drawer
              title="Menu"
              placement="left"
              onClose={onClose}
              open={drawerVisible}
            >
              <div className="flex items-center justify-between gap-4 mb-5 -mt-5">
                <Link href={"/"}>
                  <Image
                    src={globalData?.results?.logo}
                    alt="logo"
                    width={80}
                    height={80}
                  />
                </Link>
                <button
                  className="mt-1 bg-gray-200 hover:scale-110 duration-500 rounded-full p-1"
                  onClick={onClose}
                >
                  <GiCancel className="text-xl text-gray-700" />
                </button>
              </div>
              <div className="relative mb-8">
                <AutoComplete
                  options={options}
                  onSearch={handleSearch}
                  placeholder="Search for Products..."
                  size="large"
                  className="w-full"
                />
                <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xl" />
              </div>

              <CategoryNavigation onClose={onClose} />
            </Drawer>
            <BottomNavigation />
          </>
        ) : (
          <div>
            {top}
            <LandingTopHeader />
            <CategoryNavigation />
          </div>
        )}
      </nav>
    </header>
  );
};

export default LandingHeader;
