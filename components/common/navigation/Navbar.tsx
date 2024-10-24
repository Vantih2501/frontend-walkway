"use client";

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Input, message, Button, Avatar } from "antd";
import Image from "next/image";
import logo from "#/public/icons/logo.svg";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Navbar({ user }: { user?: User }) {
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

  const [value, setValue] = useState("");

  const onSearch = (value: string) => {
    message.info(`Searching for: ${value}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="sticky top-0 flex flex-col w-screen gap-6 py-6 bg-white shadow-lg z-[100] px-14">
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
              <Avatar>{user.name}</Avatar>
            </>
          ) : (
            <>
              <Button
                href="/register"
                className="bg-green-600 rounded-full text-zinc-50"
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
