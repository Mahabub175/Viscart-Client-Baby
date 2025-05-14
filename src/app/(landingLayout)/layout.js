"use client";

import BackToTop from "@/components/Shared/BackToTop";
import FloatingContact from "@/components/Shared/FloatingContact";
import LandingFooter from "@/components/Shared/Footer/LandingFooter";
import BottomNavigation from "@/components/Shared/Navbar/BottomNavigation";
import LandingHeader from "@/components/Shared/Navbar/LandingHeader";
import PopupBanner from "@/components/Shared/PopupBanner";
import GlobalCart from "@/components/Shared/Product/GlobalCart";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";

const LandingLayout = ({ children }) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  return (
    <>
      <LandingHeader />
      <div
        className={`${
          globalData?.results?.announcement ? "mt-[0.5rem]" : "mt-[0.5rem]"
        }`}
      >
        {children}
      </div>
      <PopupBanner />
      <GlobalCart />
      <FloatingContact />
      <BackToTop />
      <BottomNavigation />
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
