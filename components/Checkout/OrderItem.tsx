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
  CheckOutlined,
  CloseOutlined,
  FormOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { config } from "#/config/app";

const { Title } = Typography;

interface OrderItemProps {
  data: CartItem;
}

export default function OrderItem({ data }: OrderItemProps) {
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
    <>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex gap-6">
            <div className="bg-white max-w-24">
              {data && (
                <Image
                  src={`${config.apiUrl}/product/uploads/${data.productDetail.product?.productPhotos.find(
                    (photo: ProductImage) => photo.photoType === "front"
                  )?.image || ""
                    }`}
                  alt="product"
                  preview={false}
                  className="object-contain rounded-md shadow-md aspect-square"
                />
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-medium line-clamp-2">
                {data.productDetail.product.brand.name}{" "}
                {data.productDetail.product.name}{" "}
                <span className="text-sm text-gray-500">x{data.quantity}</span>
              </h2>
              <div>
                <p className="text-sm text-gray-500">Size: {data.productDetail.size}</p>
                {/* <p className="text-sm text-gray-500"><span className="text-green-700">Rp {data.productDetail.product.price.toLocaleString("en-Us")}</span> per item</p>  */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <h2 className="text-xl font-medium">
              Rp {(data.productDetail.product.price * data.quantity).toLocaleString("en-Us")}
            </h2>
            <p className="text-sm text-gray-500"><span className="text-green-700">Rp {data.productDetail.product.price.toLocaleString("en-Us")}</span> * {data.quantity}</p>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
    </>
  );
}
