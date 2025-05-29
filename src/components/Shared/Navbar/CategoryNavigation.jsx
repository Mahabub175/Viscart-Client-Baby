import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import { Menu, Dropdown } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/services/device/deviceSlice";

const CategoryNavigation = ({ onClose }) => {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const { data: categories } = useGetAllCategoriesQuery();

  const parentCategories = categories?.results?.filter(
    (cat) => cat?.level === "parentCategory"
  );

  const itemClickHandler = (item) => {
    if (item?.name) {
      dispatch(setFilter(item?.name));
    }
  };

  const renderSubcategories = (subcategories) => {
    return subcategories?.map((subCat) => (
      <Menu.Item key={subCat._id}>
        <Link href={`/products`}>
          <p onClick={() => itemClickHandler(subCat)}>{subCat.name}</p>
        </Link>
      </Menu.Item>
    ));
  };

  const renderChildCategories = (parentCategory) => {
    return parentCategory?.categories?.map((category) => {
      const hasSub = category?.subcategories?.length > 0;
      return hasSub ? (
        <Menu.SubMenu
          key={category._id}
          title={
            <span className="flex justify-between items-center">
              <Link href={`/products`}>
                <p onClick={() => itemClickHandler(category)}>
                  {category.name}
                </p>
              </Link>
              <RightOutlined />
            </span>
          }
        >
          {renderSubcategories(category.subcategories)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={category._id}>
          <Link href={`/products`}>
            <p onClick={() => itemClickHandler(category)}>{category.name}</p>
          </Link>
        </Menu.Item>
      );
    });
  };

  const categoryMenu = (
    <Menu>
      {parentCategories?.map((parent) => (
        <Menu.SubMenu key={parent._id} title={<span>{parent.name}</span>}>
          {renderChildCategories(parent)}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Offers", link: "/offers" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <div className="bg-white lg:text-black lg:border-y mb-5">
      <div className="xl:container md:px-5 mx-auto flex flex-col md:flex-row gap-10 items-start md:items-center">
        <Dropdown overlay={categoryMenu} trigger={["click"]}>
          <div className="bg-primary py-4 px-8 font-medium flex items-center gap-2 text-white rounded cursor-pointer">
            <GiHamburgerMenu />
            Categories
          </div>
        </Dropdown>

        <div className="flex flex-col text-sm lg:text-base md:flex-row md:items-center gap-10">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={onClose}
              className={`font-medium duration-300 ${
                pathname === item.link
                  ? "text-primary hover:text-primary"
                  : "text-black hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
