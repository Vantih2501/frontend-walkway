"use client";

import Sidebar from "#/components/Admin/Layout/Sider";
import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  message,
  Space,
  Typography,
} from "antd";
import CardProduct from "./CardProduct";


export default function ListProduct() {
  return (
    <div>
      <div className="flex">
        {/* <div className="fixed">
        <Sidebar />
        </div> */}

        <div className="mt-8 container ContentAdmin">
          <CardProduct />
        </div>
      </div>
    </div>
  );
}
