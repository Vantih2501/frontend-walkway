"use client";

import React, { useState } from "react";
import {
  CloseOutlined,
  HomeFilled,
  InfoCircleFilled,
  LaptopOutlined,
  NotificationOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  message,
  MenuProps,
  Modal,
  Typography,
  Button,
} from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "#/components/Footer";

const { Title } = Typography;

const { Search } = Input;

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu: MenuProps["items"] = [
    {
      key: `Sneakers`,
      label: <Link href="/">Sneakers</Link>,
    },
    {
      key: `Casual`,
      label: <Link href="/">Casual</Link>,
    },
    {
      key: `Sport`,
      label: <Link href="/">Sport</Link>,
    },
    {
      key: `Auction`,
      label: <Link href="/">Auction</Link>,
    },
  ];

  const [value, setValue] = useState("");

  const onSearch = (value: string) => {
    // Logika pencarian ketika pengguna menekan tombol "Enter" atau klik ikon pencarian
    message.info(`Searching for: ${value}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const disableLayout = true;

  if (disableLayout) {
    return <>{children}</>; // Hanya render children tanpa layout
  }


  return (
    <Layout>
      <div>
      {/* Layout code */}
      <Header />
      <main>{children}</main>
    </div>

    </Layout>
  );
};

export default AuthenticatedLayout;
