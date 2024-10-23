"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function CardItem() {
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
  return (
    <div>
      <Card className="cardI">
        <div className="flex mx-10">
          <CloseOutlined style={{ fontSize: "25px", color: "#a3a3a3" }} />
          <Image src="/product1.png" alt="product" width={230}></Image>

          <div className="nameP" style={{ width: "320px" }}>
            <h3 className="textC">
              New Balance 1906R Silver Metallic Sea Salt
            </h3>
            <p style={{ fontSize: "15px", color: "#a1a1aa" }}>Size: 12</p>
            <div className="quantity-input">
              <Button className="rounded-full w-1.5 buttonqty">
                <MinusOutlined style={{ fontSize: "10px" }} />
              </Button>
              <input
                min={1}
                defaultValue={1}
                style={{
                  width: 30,
                  textAlign: "center",
                  height: "30px",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
              <Button className="rounded-full w-1.5">
                <PlusOutlined style={{ fontSize: "10px" }} />
              </Button>
            </div>
          </div>

          <h3
            className="priceC"
          >
            IDR 2,500,000
          </h3>
        </div>
        <br />
        <hr /> <br />
        <div className="flex">
          <h3 className="mx-10 text-lg">ADDRESS</h3>
          <Button onClick={showModal2} className="butaddress">
            Add Address
          </Button>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex">
          <h3 className="mx-10 text-lg">CHOOSE DELIVERY</h3>
          <a href="http://"><RightOutlined className="iconRight" /></a>
        </div>
        <br />
      </Card>

      {/* MODAL PILIH ADDRESS */}
      <Modal open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null}>
      <Title level={3}>Address List</Title>
      <hr />
        {/* Address 1 */}
        <div className="addressprof ml-3 mt-3">
              <p className="font-medium">Gandara | +62 0895 0913 7208</p>
              <p style={{ color: "grey" }}>
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
              <div className="flex mb-8">
                <Button>Used</Button>
              </div>
         </div>
         <hr />
         <div className="addressprof ml-3 mt-3">
              <p className="font-medium">Farel | +62 0895 0913 7208</p>
              <p style={{ color: "grey" }}>
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
              <div className="flex mb-8">
                <Button type="primary">Use</Button>
              </div>
         </div>
         <hr /><br /><br />
         <Button onClick={showModal} block type="primary"><PlusOutlined /> Add New Address</Button>
      </Modal>


      {/* Modal Address */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Title level={3}>Add New Address</Title>
        <hr />
        <Form
          name="complex-form"
          //   onFinish={onFinish}
          labelCol={{ span: 8 }}
          style={{ maxWidth: 800 }}
          className="mt-3"
        >
          {/* CONTACT INFO */}
          <label className="text-base font-semibold" htmlFor="">
            Contact Info
          </label>
          <Form.Item
            style={{ marginBottom: 0, width: "800px;" }}
            className="mt-2"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="no_telf"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="+62  Phone Number" />
            </Form.Item>
          </Form.Item>

          {/* DELIVERY ADDRESS */}
          <label className="text-base font-semibold" htmlFor="">
            Delivery Address
          </label>

          <Form.Item style={{ marginBottom: 0 }} className="mt-2">
            <Form.Item
              name="province"
              rules={[{ required: true, message: 'Please input your Province!' }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Province">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input your City!' }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Select placeholder="City">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="subdistrict"
              rules={[{ required: true, message: 'Please input your Subdistrict!' }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Subdistrict">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="z_Code"
              rules={[{ required: true, message: 'Please input your Zip Code!'  }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Select placeholder="ZIP Code">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <TextArea required
              placeholder="Street Name, Building, House Number, etc."
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <TextArea required
              placeholder="Additional Details (Block/Unit Number, Landmarks)"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="svaddress"
            >
              Save Address
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <br /><br /><br />
    </div>
  );
}
