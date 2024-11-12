"use client";
import { Poppins } from "next/font/google";
import Sidebar from "#/components/common/navigation/Sidebar";
import { Avatar } from "antd";
import { usePathname } from "next/navigation";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/profile") return "Profile";
    if (pathname === "/dashboard/order") return "Order";
    if (pathname === "/dashboard/account") return "Account";
    if (pathname === "/dashboard/product") return "Product";
    if (pathname === "/dashboard/categories") return "Category & Brand";
    if (pathname === "/dashboard/bid") return "Bid";

    return "Dashboard";
  };

  const [isMounted, setIsMounted] = useState(false)
  const { getUser } = useAuth()
  const token = getAccessToken()
  const { user, isLoading, isError } = getUser(token)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isLoading) {
    return null
  }

  return (
    <div className={"flex " + poppins.className}>
      <Sidebar role={user?.role} />
      <div className="w-full h-screen px-4 overflow-y-auto">
        <div className="sticky top-0 py-7 border-b bg-white z-[100] flex justify-between items-center">
          <h1 className="mb-1 text-2xl font-medium tracking-tight">
            {getTitle()}
          </h1>

          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <Avatar size={43} icon={<User />} />
            <div className="-space-y-1">
              <h2 className="text-base font-medium leading-6">
                {user?.name}
              </h2>
              <p className="text-xs text-zinc-400">{user?.email}</p>
            </div>
          </Link>
        </div>

        <div className="py-7">{children}</div>
      </div>
    </div>
  );
}
