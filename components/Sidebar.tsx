"use client";

import React from "react";
import {
  AppstoreOutlined,
  InboxOutlined,
  LogoutOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Image, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    style: {
      marginBottom: "15px",
      marginTop: "15rem",
      fontSize: "18px",
    },
  },

  {
    key: "account",
    label: "Account",
    icon: <UserOutlined />,
    style: {
      marginBottom: "15px",
      fontSize: "18px",
    },
  },
  {
    key: "product",
    label: "Product",
    icon: <InboxOutlined />,
    style: {
      marginBottom: "15px",
      fontSize: "18px",
    },
  },
  {
    key: "c&b",
    label: "Category & Brand",
    icon: <TagOutlined />,
    style: {
      marginBottom: "15px",
      fontSize: "18px",
    },
  },
  {
    key: "bid",
    label: "Bid",
    icon: <MailOutlined />,
    style: {
      marginBottom: "15px",
      fontSize: "18px",
    },
  },
  {
    key: "order",
    label: "Orders",
    icon: <ShoppingOutlined />,
    style: {
      marginBottom: "15px",
      fontSize: "18px",
    },
  },
];

export default function Sidebar() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        style={{ width: 300 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className="sidebarMenu"
      />
      <Image
        src="/logo-black.png"
        alt=""
        width={200}
        height={50}
        className="img-sidebar "
      />
      <hr className="relative hrSide" />
      <div className="flex relative logoutBar">
        <Button variant="text" style={{ border: "none", backgroundColor: "transparent", color: "black" }}>
        <LogoutOutlined />
        <p className="mt-5 mx-5 text-lg">Logout</p>
        </Button>
      </div>
    </div>
  );
}
