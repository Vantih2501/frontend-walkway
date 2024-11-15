"use client";
import { Bid, BidOutline, Product, ProductOutline } from "#/components/Icons/Icons";
import logo from "#/public/icons/logo.svg";
import { removeTokens } from "#/utils/token";
import { Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  HiArrowLeftOnRectangle,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineUser,
} from "react-icons/hi2";

interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
  roles?: string[];
}

export default function Sidebar({ role }: { role?: string | any }) {
  const pathname = usePathname();
  const [messageApi, contextHolder] = message.useMessage();

  // Define menus with role restrictions and dynamic icons based on pathname
  const allMenus: MenuItem[] = useMemo(() => [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <HiOutlineSquares2X2 />,
      roles: ["admin", "superadmin"]
    },
    {
      label: "Account",
      path: "/dashboard/account",
      icon: <HiOutlineUser />,
      roles: ["superadmin"]
    },
    {
      label: "Category & Brand",
      path: "/dashboard/categories",
      icon: <HiOutlineTag />,
      roles: ["admin", "superadmin"]
    },
    {
      label: "Product",
      path: "/dashboard/product",
      icon: pathname === "/dashboard/product" ? <Product /> : <ProductOutline />,
      roles: ["admin", "superadmin"]
    },
    {
      label: "Bid",
      path: "/dashboard/bid",
      icon: pathname === "/dashboard/bid" ? <Bid /> : <BidOutline />,
      roles: ["admin", "superadmin"]
    },
    {
      label: "Order",
      path: "/dashboard/order",
      icon: <HiOutlineShoppingBag />,
      roles: ["admin", "superadmin"]
    },
  ], [pathname]);

  // Filter menus based on user role
  const visibleMenus = useMemo(() => {
    return allMenus.filter(menu => {
      if (!menu.roles) return true;
      if (!role) return false;
      return menu.roles.includes(role.toLowerCase());
    });
  }, [role, allMenus]);

  const handleLogout = useCallback(async () => {
    try {
      removeTokens();
      messageApi.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      messageApi.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      <aside className="flex flex-col items-center gap-6 px-4 py-6 w-72 bg-zinc-50">
        <Link href="/dashboard">
          <Image src={logo} alt="Logo" priority />
        </Link>

        <div className="flex flex-col flex-1 w-full gap-4 mt-10 border-b">
          {visibleMenus.map((menu) => (
            <Link
              key={menu.label}
              href={menu.path}
              className={`
                flex items-center gap-2 justify-start py-3 px-4 text-base 
                rounded-md transition duration-75
                ${pathname === menu.path
                  ? "bg-[#4E7772] text-white"
                  : "text-gray-800 hover:bg-zinc-100"}
              `}
            >
              {menu.icon}
              {menu.label}
            </Link>
          ))}
        </div>

        <Button
          type="text"
          block
          className="flex items-center justify-start gap-2 py-6 text-base border hover:text-red-500"
          onClick={handleLogout}
        >
          <HiArrowLeftOnRectangle />
          Logout
        </Button>
      </aside>
    </>
  );
}
