"use client";

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

export default function DataAdmin() {
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
    <div>
      <div
        className=" header-fix mt
        -3"
      >
        <div className="flex">
          <Title level={2}>Profile</Title>
          <div className="profAdmin flex">
            <Avatar
              className="mt-1"
              src={<img src="fotoprof.jpg" alt="avatar" />}
            />
            <div>
              <p className="mt-1 mx-2 font-medium">Farel Widianto</p>
              <p className="mx-2 text-xs -mt-4" style={{ color: "gray" }}>
                farelWidianto@gmail.com
              </p>
            </div>
          </div>
        </div>
        <hr className="hradmin" />
        <br />
      </div>
      <Card className="CardProfA">
        <div className="mt-7 contentProfile">
          <div className="flex">
            <Avatar
              className="mt-1 AdminFoto"
              src={<img src="fotoprof.jpg" alt="avatar" />}
            />
            <div className="mx-5 mt-3">
              <p style={{ color: "gray" }}>Name</p>
              <p className="-mt-4 font-medium">Farel Widianto</p>
            </div>
            <Button
              type="primary"
              className="mt-4 editPAdmin"
              onClick={showModal}
            >
              <FormOutlined /> Edit
            </Button>
          </div>
          <br />
          <hr className="mb-6" />
          <h2 className="font-semibold mb-6">PERSONAL INFORMATION</h2>
          <div className="nameAdmin mb-7">
            <p className="text-base" style={{ color: "gray" }}>
              Name
            </p>
            <p className="-mt-4 font-medium text-base">Farel Widianto</p>
          </div>
          <div className="nameAdmin mb-6">
            <p className="text-base" style={{ color: "gray" }}>
              Phone Number
            </p>
            <p className="-mt-4 font-medium text-base">+62 895-0913-7208</p>
          </div>
          <div className="nameAdmin mb-6">
            <p className="text-base" style={{ color: "gray" }}>
              Email Address
            </p>
            <p className="-mt-4 font-medium text-base">
              farelwidianto13@gmail.com
            </p>
          </div>
          <hr className="mb-6" />
          <h3 className="font-semibold mb-6">YOUR PASSWORD</h3>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 250 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <label htmlFor="">Password</label>
              <Input.Password value={"fareluy"} readOnly />
            </Form.Item>
          </Form>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Title level={2}>Edit Profile</Title>
        <hr />
        <br />
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <label htmlFor="">Name</label>
            <Input placeholder="Name" />
          </Form.Item>

          <div className="flex">
            <Form.Item
              name="no_telf"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <label htmlFor="">Phone Number</label>
              <Input placeholder="Phone Number" className="w-52" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <label htmlFor="">Email</label>
              <Input placeholder="Email" />
            </Form.Item>
          </div>

          <Form.Item
            name="photo"
            rules={[{ required: true, message: "Please input your Photo!" }]}
          >
            <label htmlFor="">Profile</label>
            <div className="fotoAdmin mt-3">
              <Upload
                name="avatar"
                className="admin-upload"
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
            </div>{" "}
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
