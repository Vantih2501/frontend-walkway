"use client";
import { ProductCardAdmin } from "#/components/common/card/ProductCard";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Upload } from "antd";
import { useState } from "react";

export default function Product() {
  const [showForm, setShowForm] = useState(false);

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
    },
  ];
  const selectBrand = (
    <Select defaultValue="http://" options={options}>
    </Select>
  );

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all space-y-4 duration-500 ease-in-out ${showForm ? "w-3/4" : "w-full"} p-6`}
      >
        <div className="flex justify-between items-center">
          <div className="space-x-1">
            <Select
              defaultValue="all"
              options={[
                { value: "all", label: "All Product" },
                { value: "sport", label: "Sport" },
                { value: "casual", label: "Casual" },
              ]}
              className="!rounded-full"
            />
            <Select
              defaultValue="all"
              options={[
                { value: "all", label: "All Brand" },
                { value: "nike", label: "Nike" },
                { value: "adidas", label: "Adidas" },
              ]}
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowForm((prev) => !prev)}
          >
            Add New Product
          </Button>
        </div>

        <div className={`grid ${showForm ? "grid-cols-3" : "grid-cols-4"} gap-2`}>
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
          <ProductCardAdmin price={100000000} productName="Adidos" />
        </div>
      </div>

      <div
        className={`bg-white shadow-lg transition-all duration-500 ease-in-out transform ${showForm ? "translate-x-0 w-1/4" : "translate-x-full w-0"}`}
      >
        {showForm && (
          <div className="px-5 py-4 h-[86vh] border rounded-md space-y-2">
            <h2 className="text-lg">Add Product</h2>
            <Form className="flex flex-col gap-2" layout="vertical">
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="flex-1 !rounded-xl"
                >
                  Descriptions
                </Button>
                <Button
                  type="text"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="flex-1 !rounded-xl"
                >
                  Stock
                </Button>
              </div>

              <Form.Item name="upload">
                <Upload.Dragger
                  className="w-full h-48 rounded-md border-dashed"
                  showUploadList={true}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="ant-upload-drag-icon">
                      <PlusOutlined className="w-6" />
                    </p>
                    <p className="ant-upload-text">Upload</p>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    message: "Please enter a valid email address.",
                    required: true,
                  },
                ]}
              >
                <Input addonBefore={selectBrand} placeholder="Email Address" className="py-2 rounded-lg" />
              </Form.Item>

            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
