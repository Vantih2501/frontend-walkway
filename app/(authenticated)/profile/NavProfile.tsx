"use client";
import {
  AppstoreOutlined,
  EditOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, FloatButton, Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    type: "group",
    children: [
      { key: "13", label: "Profile" },
      { key: "14", label: "Order History" },
      { key: "15", label: "Bid History" },
    ],
  },
];

export default function NavProf() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Card style={{ width: 300, borderRadius: "20px", height:"56rem" }}>
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
            onClick={onClick}
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
