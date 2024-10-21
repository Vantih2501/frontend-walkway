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



export default function NavbarUser() {
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

  return (
    <Layout>
      <Header
        className="drop-shadow-md"
        style={{ backgroundColor: "white", height: "10rem" }}
      >
        <div className={"text-black bg-white flex mt-4 head1"}>
          <Image src="/logo-black.png" alt="logo" width={150} height={40} />
          <Search
            placeholder="Search for sneakers..."
            size="large"
            value={value}
            onChange={onChange}
            onSearch={onSearch}
            className="searcbar"
          />
          <div className="prof-bag flex">
            <ShoppingOutlined
              style={{
                position: "absolute",
                marginTop: "5px",
                marginLeft: "30px",
                fontSize: "30px",
              }}
              onClick={showModal}
            />
            <a href="http://">
              {" "}
              <Image
                src="/fotoprof.jpg"
                alt="Profile"
                className="rounded-full fotoprof"
                width={40}
                height={40}
              />{" "}
            </a>
          </div>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[]}
          items={menu}
          className={"flex-1 menuNav"}
        />
      </Header>
      <br />
      <Layout>
        {/* <Layout style={{ padding: "0 0px 0px", height: "calc(100vh - 64px)" }}>
          <Content style={{ backgroundColor: "white" }}>{children}</Content>
        </Layout> */}
      </Layout>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Title level={3}>CART</Title>
        <hr />
        <div className="flex mb-3">
          <Button
            type="link"
            style={{ color: "gray", fontSize: "20px" }}
            className="mt-10"
          >
            <CloseOutlined />
          </Button>
          <Image
            src="/product1.png"
            alt="product"
            width={150}
            height={150}
            className="imageModalNav"
          />
          <div
            className="w-40 mt-4 font-medium"
            style={{ marginLeft: "-20px" }}
          >
            <p>New Balance 1906R Silver Metallic Sea Salt</p>
            <div className="flex font-light" style={{ color: "gray" }}>
              <p>Size: 12</p>
              <p className="mx-3">Quantity: 1</p>
            </div>
          </div>
          <p className="mt-4 font-medium mx-8">IDR 2,500,000</p>
        </div>
        <hr />
        <div className="flex mt-5">
          <p className="font-medium text-lg">Order Subtotal</p>
          <p className="font-medium text-lg pricemodal">IDR 2,500,000</p>
        </div>
        <hr /> <br /><br /><br />
        <Button block type="primary">Checkout</Button>
      </Modal>

    </Layout>
  );
};


