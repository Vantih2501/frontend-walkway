"use client";

import React, { useCallback, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  Input,
  message,
  Button,
  Avatar,
  Dropdown,
  MenuProps,
  Image as AntdImage,
  Empty,
} from "antd";
import logo from "#/public/icons/logo.svg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  getCheckoutToken,
  removeCheckoutToken,
  removeTokens,
  setCheckoutToken,
} from "#/utils/token";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { useCart } from "#/hooks/cart";
import { config } from "#/config/app";
import Image from "next/image";
import { useProduct } from "#/hooks/product";

export default function Navbar({ user }: { user?: User }) {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const { getCartItem } = useCart();
  const { genCheckoutToken } = useProduct();
  const { items: cartItem } = getCartItem(user?.cartId);
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
      label: <Link className="hover:text-primary/80" href="/">Sneakers</Link>,
    },
    {
      key: "Casual",
      label: <Link className="hover:text-primary/80" href="/">Casual</Link>,
    },
    {
      key: "Sport",
      label: <Link className="hover:text-primary/80" href="/">Sport</Link>,
    },
    {
      key: "Auction",
      label: <Link className="hover:text-primary/80" href="/">Auction</Link>,
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: user?.name,
      className: "pointer-events-none",
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: <Link href="/profiles">Profile</Link>,
    },
    {
      key: 3,
      label: <button onClick={handleLogout}>Logout</button>,
    },
  ];

  const handleCheckout = async (data: ProductDetail[]) => {
    const token = getCheckoutToken();

    if (token) {
      removeCheckoutToken();
    }

    try {
      setLoading(true);

      console.log(data);
      const response = await genCheckoutToken(data);
      // return console.log(response.checkout_token);
      setCheckoutToken(response.checkout_token);
      // localStorage.setItem('checkout_token', response.checkout_token)

      window.location.href = "/checkout";
    } catch (error) {
      message.error("Error saat proses checkout");
      console.error(error);
      setLoading(false);
    }
  };

  const cartItems: MenuProps["items"] = [
    {
      key: 1,
      label: `${user?.name}'s Cart`,
      className: "pointer-events-none",
    },
    { type: "divider" },
    ...(cartItem && cartItem.length > 0
      ? [
          ...cartItem.map((item) => ({
            key: item.id,
            label: (
              <div className="flex gap-2 py-5">
                <AntdImage
                  src={`${config.apiUrl}/product/uploads/${
                    item.productDetail.product.productPhotos.find(
                      (p) => p.photoType === "front"
                    )?.image
                  }`}
                  alt="photo"
                  preview={false}
                  className="object-contain aspect-square"
                  width={90}
                />
                <div className="flex items-start justify-between flex-1">
                  <div>
                    <h2 className="w-3/5 line-clamp-2">
                      {item.productDetail.product.name}
                    </h2>
                    {/* <p className="text-gray-500">
                      Size: {item.productDetail.size}
                    </p> */}
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <h2 className="font-medium tracking-wide text-green-700">
                    Rp{" "}
                    {(
                      item.productDetail.product.price * item.quantity
                    ).toLocaleString("en-US")}
                  </h2>
                </div>
              </div>
            ),
            className: "pointer-events-none",
          })),
          {
            key: "checkout",
            label: (
              <Button
                className="pointer-events-auto"
                block
                size="large"
                type="primary"
                onClick={() =>
                  handleCheckout(cartItem.map((c) => c.productDetail))
                }
              >
                Checkout
              </Button>
            ),
            className: "pointer-events-none",
          },
        ]
      : [
          {
            key: "no-data",
            label: <Empty description="No items" />,
            className: "text-gray-500 pointer-events-none",
          },
        ]),
  ];

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
              <Dropdown
                menu={{ items: cartItems }}
                placement="bottomRight"
                className="cursor-pointer"
              >
                <HiOutlineShoppingBag size={32} />
              </Dropdown>
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                className="cursor-pointer"
              >
                <Avatar icon={<User />}>{user.name}</Avatar>
              </Dropdown>
            </>
          ) : (
            <>
              <Button href="/register" className="rounded-full" type="primary">
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
