"use client";
import {
  AppstoreOutlined,
  EditOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, FloatButton, Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    type: "group",
    children: [
      { key: "profile", label: "Profile"},
      { key: "order-history", label: "Order History" },
      { key: "bid-history", label: "Bid History" },
    ],
  },
];

export default function NavProf() {

  const router = useRouter();

  // Peta key dengan halaman
  const routes: Record<string, string> = {
    "profile": "/profile",
    "order-history": "/profile/OrderHistory",
    "bid-history": "/profile/BidHistory",
  };

  const handleMenuClick = (e: any) => {
    const route = routes[e.key]; // Cari rute berdasarkan key
    if (route) {
      router.push(route); // Navigasi ke halaman yang sesuai
    }
  };

  return (
    <Card className="cardProf">
      <div className="container mx-auto">
        <Avatar
          src={<img src="/fotoprof.jpg" alt="avatar" />}
          className="avatarProf ml-24 mt-16"
        />
        <Button
          shape="circle"
          type="primary"
          style={{
            position: "absolute",
            marginLeft: "-35px",
            marginTop: "60px",
          }}
          icon={<EditOutlined />}
        />{" "}
        <br />
        <h3 className="font-semibold text-lg ml-28 mt-5">Nadyne</h3> <br />
        <hr style={{ alignContent: "center", width: "13rem" }} />
        <br />
        <div className="center mx-5 border-0 w-3/4">
          <Menu
            onClick={handleMenuClick}
            className="NavProf mx-6 decoration-black font-medium"
            defaultSelectedKeys={["13"]}
            defaultOpenKeys={["grp"]}
            mode="inline"
            items={items}
          />
        </div>
        
        <hr style={{ alignContent: "center", width: "13rem", marginTop:'18rem' }} />
        <br />
        <a href="http://"><h3 className="font-medium text-base ml-20">Change Password</h3></a> <br />
        <a href="http://"><h3 className="font-medium text-base ml-20">Logout</h3></a> <br />
      </div>
    </Card>
  );
}
