"use client";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";
import {
  CalendarOutlined,
  FlagOutlined,
  FormOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Space,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function DataAdmin() {

   const { getUser } = useAuth();
   const token = getAccessToken();
   const { user, isLoading } = getUser(token);
   
  return (
    <div>

      <Card className="CardProfA">
        <div className="mt-7 contentProfile">
          <div className="flex">
            <Avatar
              className="mt-1 AdminFoto"
              src={<img src="fotoprof.jpg" alt="avatar" />}
            />
            <div className="mx-5 mt-3">
              <p style={{ color: "gray" }} className="mb-3">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>
          <br />
          <hr className="mb-6" />
          <h2 className="font-semibold mb-6">PERSONAL INFORMATION</h2>
          <div className="nameAdmin mb-7">
            <p className="text-base mb-4" style={{ color: "gray" }}>
              Name
            </p>
            <p className="font-medium text-base">{user?.name}</p>
          </div>
          <div className="nameAdmin mb-6">
            <p className="text-base mb-4" style={{ color: "gray" }}>
              Phone Number
            </p>
            <p className=" font-medium text-base">{user?.phone_number}</p>
          </div>
          <div className="nameAdmin mb-6">
            <p className="text-base mb-4" style={{ color: "gray" }}>
              Email Address
            </p>
            <p className="font-medium text-base">
              {user?.email}
            </p>
          </div>
          <div className="nameAdmin mb-6">
            <p className="text-base mb-4" style={{ color: "gray" }}>
              Status
            </p>
            <p className="font-medium text-base">
              {user?.status}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
