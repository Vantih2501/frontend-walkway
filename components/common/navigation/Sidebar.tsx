"use client";
import { Bid, BidOutline, Product, ProductOutline } from "#/components/Icons/Icons";
import logo from "#/public/icons/logo.svg";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiArrowLeftOnRectangle,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineUser,
} from "react-icons/hi2";

export default function Sidebar() {
  const pathname = usePathname();
  const menus = [
    { label: "Dashboard", path: "/dashboard", icon: <HiOutlineSquares2X2 /> },
    {
      label: "Account",
      path: "/dashboard/account",
      icon: <HiOutlineUser />,
    },
    {
      label: "Product",
      path: "/dashboard/product",
      icon: pathname === "/dashboard/product" ? <Product /> : <ProductOutline />,
    },
    {
      label: "Category & Brand",
      path: "/dashboard/categories",
      icon: <HiOutlineTag />,
    },
    { label: "Bid", path: "/dashboard/bid", icon: pathname === "/dashboard/bid" ? <Bid /> : <BidOutline /> },
    {
      label: "Order",
      path: "/dashboard/order",
      icon: <HiOutlineShoppingBag />,
    },
  ];

  return (
    <aside className="flex flex-col items-center gap-6 px-4 py-6 w-72 bg-zinc-50">
      <Image src={logo} alt="Logo" />
      <div className="flex flex-col flex-1 w-full gap-4 mt-10 border-b">
        {menus.map((menu) => (
          <Link
            key={menu.label}
            type={pathname === menu.path ? "primary" : "text"}
            href={menu.path}
            // block
            // className={`flex items-center justify-start py-6 text-base ${pathname === menu.path ? "" : "text-gray-800 hover:bg-zinc-100"
            //   }`}
            className={`flex items-center gap-2 justify-start py-3 px-4 text-base rounded-md transition duration-75 ${pathname === menu.path ? "bg-[#4E7772] text-white" : "text-gray-800 hover:bg-zinc-100"}`}
          >
            {menu.icon}
            {menu.label}
          </Link>
        ))}
      </div>
      <Button
        type="text"
        block
        className="flex items-center justify-start py-6 text-base border"
      >
        <HiArrowLeftOnRectangle />
        Logout
      </Button>
    </aside>
  );
}
