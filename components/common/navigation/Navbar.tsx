"use client";

import React, { useCallback, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Input, message, Button, Avatar, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import logo from "#/public/icons/logo.svg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { removeTokens } from "#/utils/token";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user?: User }) {
  const router = useRouter()

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = useCallback(async () => {
    try {
      removeTokens();

      messageApi.success("Logged out successfully");

      window.location.href = "/";
    } catch (error) {
      messageApi.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  }, [messageApi]);

  const menus = [
    {
      key: "Sneakers",
      label: <Link href="/">Sneakers</Link>,
    },
    {
      key: "Casual",
      label: <Link href="/">Casual</Link>,
    },
    {
      key: "Sport",
      label: <Link href="/">Sport</Link>,
    },
    {
      key: "Auction",
      label: <Link href="/">Auction</Link>,
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: user?.name,
      className: "pointer-events-none"
    },
    {
      type: 'divider'
    },
    {
      key: 2,
      label: <Link href="/profiles">Profile</Link>
    },
    {
      key: 3,
      label: <button onClick={handleLogout}>Logout</button>
    }
  ]

  return (
    <div className="sticky top-0 flex flex-col w-screen gap-6 py-5 bg-white shadow-lg z-[100] px-14">
      <div className="flex items-center justify-between gap-6">
        <Link href="/">
          <Image src={logo} alt="logo" className="" />
        </Link>

        <Input
          onFocus={() => console.log("click")}
          prefix={<SearchOutlined className="mr-1 text-gray-400" />}
          placeholder="Search for sneakers..."
          className="rounded-full cursor-pointer"
        />

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <HiOutlineShoppingBag size={32} />
              <Dropdown menu={{ items }} placement="bottomRight" className="cursor-pointer">
                <Avatar>{user.name}</Avatar>
              </Dropdown>
            </>
          ) : (
            <>
              <Button
                href="/register"
                className="rounded-full"
                type="primary"
              >
                Sign Up
              </Button>
              <Button href="/login" type="text" className="rounded-full">
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-12">
        {menus.map((menu) => (
          <div key={menu.key}>{menu.label}</div>
        ))}
      </div>
    </div>
  );
}
