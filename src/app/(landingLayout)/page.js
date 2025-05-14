import Banner from "@/components/LandingPages/Home/Banner";
import Brands from "@/components/LandingPages/Home/Brands";
import FeaturedProducts from "@/components/LandingPages/Home/Products/FeaturedProducts";
import RecentlyViewedProducts from "@/components/LandingPages/Home/Products/RecentlyViewedProducts";
import SmallFeature from "@/components/LandingPages/Home/SmallFeature";
import Categories from "@/components/LandingPages/Home/Categories";
import ProductTab from "@/components/LandingPages/Home/Products/ProductTab";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <SmallFeature />
      <Categories />
      <ProductTab />
      <FeaturedProducts />
      <Brands />
      <RecentlyViewedProducts />
    </div>
  );
};

export default page;
