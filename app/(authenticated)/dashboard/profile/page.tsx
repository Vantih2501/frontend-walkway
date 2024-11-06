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
  Spin,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";

import Profile from "#/public/fotoprof.jpg"
import Image from "next/image";

export default function AdminProfile() {

  const { getUser } = useAuth();
  const token = getAccessToken();
  const { user, isLoading } = getUser(token);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Card>
      <div className="mt-7 contentProfile">
        <div className="flex">
          <Avatar
            className="mt-1 AdminFoto"
            src={<Image src={Profile} alt="avatar" width={100} />}
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
  )
}