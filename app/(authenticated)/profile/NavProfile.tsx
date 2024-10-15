"use client";
import {
  AppstoreOutlined,
  EditOutlined,
  LoadingOutlined,
  MailOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  FloatButton,
  Form,
  GetProp,
  Input,
  Menu,
  MenuProps,
  message,
  Modal,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    type: "group",
    children: [
      { key: "profile", label: "Profile" },
      { key: "order-history", label: "Order History" },
      { key: "bid-history", label: "Bid History" },
    ],
  },
];

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function NavProf() {
  // NAVIGASI
  const router = useRouter();

  // Peta key dengan halaman
  const routes: Record<string, string> = {
    profile: "/profile",
    "order-history": "/profile/OrderHistory",
    "bid-history": "/profile/BidHistory",
  };

  const handleMenuClick = (e: any) => {
    const route = routes[e.key]; // Cari rute berdasarkan key
    if (route) {
      router.push(route); // Navigasi ke halaman yang sesuai
    }
  };

  // OPEN MODAL UPLOAD IMAGE
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

  // MODAL CHANGE PASSWORD

  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  // UPLOAD IMAGE

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="div">
      <Card className="cardProf">
        <div className="container mx-auto">
          <Avatar
            src={<img src="/fotoprof.jpg" alt="avatar" />}
            className="avatarProf ml-24 mt-16"
          />
          <Button
            onClick={showModal}
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
          <hr
            style={{
              alignContent: "center",
              width: "13rem",
              marginTop: "18rem",
            }}
          />
          <br />
          <h3 className="font-medium text-base ml-20" onClick={showModal2}>
            Change Password
          </h3>
          <br />
          <a href="http://">
            <h3 className="font-medium text-base ml-20">Logout</h3>
          </a>{" "}
          <br />
        </div>
      </Card>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Title level={3}>Select Image</Title>
        <hr />
        <Flex gap="middle" wrap>
          <div className="upFoto mt-6">
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </Flex>
        <br />
        <Button className="mx-9 w-5/6 mt-2 mb-2" type="primary">
          Save
        </Button>
        <br />
      </Modal>

      <Modal
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
      >
        <Title level={3}>Change Password</Title>
        <h4 style={{ color: "gray" }}>
          update password for enhanced account security
        </h4>
        <hr />
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="mt-4"
        >
          <Form.Item
            name="passOld"
            rules={[
              {
                required: true,
                message: "Please input your Current Password!",
              },
            ]}
          >
            <label htmlFor="">Current Password</label>
            <Input.Password placeholder="Enter current password..." />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your New Password!" },
            ]}
          >
            <label htmlFor="">New Password</label>
            <Input.Password placeholder="Enter new password..." />
          </Form.Item>

          <Form.Item
            name="password2"
            rules={[
              {
                required: true,
                message: "Please input Confirm your New password!",
              },
            ]}
          >
            <label htmlFor="">Confirm New Password</label>
            <Input.Password placeholder="confirm new password..." />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Apply Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
