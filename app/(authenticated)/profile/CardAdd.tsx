"use client";

import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const { Title } = Typography;

export default function CardAd() {
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

  const show2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className="div">
      <Card
        className="mt-12 CardIAdd"
      >
        <div className="container mx-auto">
          <div className="flex">
            <h3 className="text-2xl ml-12 mt-10 w-3/5">ADDRESS</h3>
            <Button onClick={showModal} className="editProf ml-24">
              <PlusOutlined />
              Add Address
            </Button>
          </div>
          <br />
          <hr className="hrProf" /> <br />
          <div className="scroll">
            {/* Address 1 */}
            <div className="addressprof ml-12">
              <p className="font-medium">Gandara | +62 0895 0913 7208</p>
              <p style={{ color: "grey" }}>
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
              <div className="flex mb-10">
                <Button>Used</Button>
                <Button onClick={show2} className="mx-3">
                  Edit Address
                </Button>
              </div>
            </div>
            {/* Address 2 */}
            <div className="addressprof ml-12">
              <p className="font-medium">Farell | +62 0895 0913 7208</p>
              <p style={{ color: "grey" }}>
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
              <div className="flex mb-10">
                <Button type="primary">Use</Button>
                <Button className="mx-3">Edit Address</Button>
              </div>
            </div>

            {/* Address 2 */}
            <div className="addressprof ml-12">
              <p className="font-medium">Nadyne | +62 0895 0913 7208</p>
              <p style={{ color: "grey" }}>
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
              <div className="flex mb-10">
                <Button type="primary">Used</Button>
                <Button className="mx-3">Edit Address</Button>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </Card>

      {/* Modal ADD Address */}
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
              rules={[{ required: true, message: "Please input your Name!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="no_telf"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your Province!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Province">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please input your City!" }]}
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
              rules={[
                { required: true, message: "Please input your Subdistrict!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Subdistrict">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="z_Code"
              rules={[
                { required: true, message: "Please input your Zip Code!" },
              ]}
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
            <TextArea
              required
              placeholder="Street Name, Building, House Number, etc."
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <TextArea
              required
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


      {/* Modal EDIT Address */}
      <Modal
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
      >
        <Title level={3}>Edit Address</Title>
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
              rules={[{ required: true, message: "Please input your Name!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="no_telf"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your Province!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Province">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please input your City!" }]}
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
              rules={[
                { required: true, message: "Please input your Subdistrict!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Select placeholder="Subdistrict">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="z_Code"
              rules={[
                { required: true, message: "Please input your Zip Code!" },
              ]}
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
            <TextArea
              required
              placeholder="Street Name, Building, House Number, etc."
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <TextArea
              required
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
    </div>
  );
}
