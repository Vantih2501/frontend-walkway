"use client";

import React, { useCallback, useState } from "react";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
  Badge,
  Checkbox,
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
import {
  Cross,
  CrossIcon,
  Minus,
  Plus,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import { useCart } from "#/hooks/cart";
import { config } from "#/config/app";
import Image from "next/image";
import { useProduct } from "#/hooks/product";
import { DropdownProps } from "antd/lib";
import { compressJWT, decompressJWT } from "#/utils/compressor";

export default function Navbar({ user }: { user?: User }) {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState<CartItem[]>([]);
  const { getCartItem, reduceQty, addQty, removeItem } = useCart();
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
      label: (
        <Link className="hover:text-primary/80" href="/">
          Sneakers
        </Link>
      ),
    },
    {
      key: "Casual",
      label: (
        <Link className="hover:text-primary/80" href="/">
          Casual
        </Link>
      ),
    },
    {
      key: "Sport",
      label: (
        <Link className="hover:text-primary/80" href="/">
          Sport
        </Link>
      ),
    },
    {
      key: "Auction",
      label: (
        <Link className="hover:text-primary/80" href="/">
          Auction
        </Link>
      ),
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
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: 3,
      label: <button onClick={handleLogout}>Logout</button>,
    },
  ];

  const handleCheckout = async (data: CartItem[]) => {
    const token = getCheckoutToken();

    if (token) {
      removeCheckoutToken();
    }

    try {
      setLoading(true);

      const response = await genCheckoutToken(data);
      const compressedToken = compressJWT(response.checkout_token);
      setCheckoutToken(compressedToken);

      window.location.href = "/checkout";
    } catch (error) {
      message.error("Error saat proses checkout");
      console.error(error);
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const [processing, setProcessing] = useState(false);

  const handleRemove = async (id: string[]) => {
    try {
      setProcessing(true);
      await removeItem(id, user?.cartId);
      message.success("Item successfully removed")
    } catch (error) {
      setProcessing(false);
      throw error;
    } finally {
      setSelectedItem([])
      setProcessing(false);
    }
  };

  const handleReduce = async (id: string) => {
    try {
      setProcessing(true);
      await reduceQty(id, user?.cartId);
    } catch (error) {
      setProcessing(false);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const handleAdd = async (id: string) => {
    try {
      setProcessing(true);
      await addQty(id, user?.cartId);
    } catch (error) {
      setProcessing(false);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const cartItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-light">Cart</h1>
          <Button
            disabled={selectedItem.length <= 0 || processing}
            onClick={() => handleRemove(selectedItem.map(item => item.id))}
            icon={<Trash2 size={18} className="text-red-700" />}
            shape="circle"
            type="text"
            size="small"
            className={`pointer-events-auto ${
              selectedItem.length <= 0 && "hidden"
            }`}
          />
        </div>
      ),
      className: "pointer-events-none",
    },
    { type: "divider" as const },
    ...(cartItem && cartItem.length > 0
      ? [
          ...cartItem.map((item) => ({
            key: item.id,
            label: (
              <div className="flex items-center w-full gap-5">
                <Checkbox
                  checked={selectedItem.some((items) => items.id === item.id)}
                  onClick={() => {
                    setSelectedItem((prev) =>
                      prev.some((items) => items.id === item.id)
                        ? prev.filter((items) => items.id !== item.id)
                        : [...prev, item]
                    );
                  }}
                  className="pointer-events-auto"
                />
                <div className="flex flex-1 gap-2 py-5">
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
                  <div className="flex items-start justify-between flex-1 gap-5 pointer-events-auto">
                    <div className="flex-1 space-y-1">
                      <div className="-space-y-1">
                        <h2 className="w-40 line-clamp-2">
                          {item.productDetail.product.name}
                        </h2>
                        <p className="text-gray-500">
                          Size: {item.productDetail.size}
                        </p>
                      </div>
                      <div className="text-gray-500">
                        <span className="flex items-center gap-2">
                          <Button
                            onClick={() => handleReduce(item.id)}
                            className="pointer-events-auto"
                            disabled={item.quantity <= 1 || processing}
                            size="small"
                            shape="default"
                            icon={
                              <Minus className="text-zinc-800" size="14px" />
                            }
                          />
                          <p className="text-center basis-6">{item.quantity}</p>
                          <Button
                            onClick={() => handleAdd(item.id)}
                            className="pointer-events-auto"
                            size="small"
                            shape="default"
                            disabled={
                              processing ||
                              item.quantity == item.productDetail.stock
                            }
                            icon={
                              <Plus className="text-zinc-800" size="14px" />
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <h2 className="w-32 font-medium tracking-wide text-right text-green-700">
                      Rp{" "}
                      {(
                        item.productDetail.product.price * item.quantity
                      ).toLocaleString("en-US")}
                    </h2>
                  </div>
                </div>
              </div>
            ),
            className: "pointer-events-none",
          })),
          { type: "divider" as const },
          {
            key: "total",
            label: (
              <div className="flex items-center justify-between w-full">
                <h1>Order Subtotal:</h1>
                <h2 className="font-medium tracking-wide text-green-700">
                  Rp{" "}
                  {selectedItem
                    .reduce(
                      (accumulator, current) =>
                        accumulator +
                        current.productDetail.product.price * current.quantity,
                      0
                    )
                    .toLocaleString("en-US")}
                </h2>
              </div>
            ),
            className: "pointer-events-none",
          },
          {
            key: "checkout",
            label: (
              <Button
                loading={loading || processing}
                disabled={selectedItem.length <= 0}
                className="pointer-events-auto"
                block
                size="large"
                type="primary"
                onClick={() => handleCheckout(selectedItem)}
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
      {contextHolder}
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
                open={open}
                trigger={["click"]}
                onOpenChange={handleOpenChange}
                menu={{ items: cartItems }}
                placement="bottomRight"
                className="cursor-pointer nav-cart"
              >
                <Badge count={user.cartItemTotal}>
                  <HiOutlineShoppingBag size={32} />
                </Badge>
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
