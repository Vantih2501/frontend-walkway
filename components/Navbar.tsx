"use client";

import React, { useState } from "react";
import {
  HomeFilled,
  InfoCircleFilled,
  LaptopOutlined,
  NotificationOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from 'next/link'; 
import { Breadcrumb, Layout, Menu, theme, Input, message, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";


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


export default function Navbar() {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu: MenuProps["items"] = [
    {
      key: `Sneakers`,
      label: (      
      <Link href="/">
        Sneakers
      </Link>),
    },
    {
      key: `Casual`,
      label: (      
        <Link href="/">
         Casual
        </Link>),
    },
    {
      key: `Sport`,
      label: (      
        <Link href="/">
         Sport
        </Link>),
    },
    {
      key: `Auction`,
      label: (      
        <Link href="/">
         Auction
        </Link>),
    },
  ];

  const [value, setValue] = useState('');

  const onSearch = (value: string) => {
    // Logika pencarian ketika pengguna menekan tombol "Enter" atau klik ikon pencarian
    message.info(`Searching for: ${value}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
            <ShoppingOutlined style={{ position:"absolute", marginTop: '5px', marginLeft:'30px', fontSize:'30px' }} /> 
            <a href="http://"> <Image src="/fotoprof.jpg" alt="Profile" className="rounded-full fotoprof" width={40} height={40}/> </a>
          </div>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[]}
          items={menu}
          className={"flex-1 menuNav"}
        />
      </Header>
      <br /><br />
      <Layout>
        <Layout
          style={{ padding: "0 0px 0px", height: "calc(100vh - 64px)" }}
        >
          <Content
            style={{ backgroundColor:'white' }}
          >
     
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


