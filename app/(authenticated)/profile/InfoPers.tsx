"use client";
import {
  AppstoreOutlined,
  EditOutlined,
  FormOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  Menu,
  MenuProps,
  Modal,
  Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function InfoPers() {
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
    <div className="div">
      <Card
        style={{
          width: "53rem",
          borderRadius: "20px",
          marginLeft: "30px",
          height: "23rem",
        }}
      >
        <div className="container mx-auto">
          <div className="flex">
            <h3 className="text-2xl ml-12 mt-10 w-3/5">Personal Information</h3>
            <Button onClick={showModal} className="editProf ml-32">
              <FormOutlined />
              Edit
            </Button>
          </div>
          <br />
          <hr style={{ alignContent: "center", width: "48rem" }} /> <br />
          <div className="flex">
            <div className="name">
              <p className="font-medium ml-12" style={{ color: "grey" }}>
                Name
              </p>
              <p className="font-medium ml-12">Nadyne Lourensia Saebrina</p>
            </div>

            <div className="email">
              <p className="font-medium ml-12" style={{ color: "grey" }}>
                Email
              </p>
              <p className="font-medium ml-12">Saebrinan@gmail.com</p>
            </div>
          </div>
          <div className="no_telf">
            <p className="font-medium ml-12 mt-8" style={{ color: "grey" }}>
              Phone Number
            </p>
            <p className="font-medium ml-12">+62 42898 23983</p>
          </div>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Title level={3}>Edit Information</Title>
        <hr />
        <Form
          name="basic"
          
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <label htmlFor="">Name</label>
            <Input placeholder="Name"/>
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your Phone Number!" }]}
          >
            <label htmlFor="">Phone Number</label>
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
