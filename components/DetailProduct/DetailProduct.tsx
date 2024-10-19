"use client";

import React, { useState } from "react";
import ProductImage from "./ui/ProductImage";
import { Breadcrumb, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";

const DetailProduct = ({ product }: { product: Product | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);

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
    <div className="py-16 px-52 2xl:px-72">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5">
          {product?.productImages && (
            <ProductImage imageUrl={product?.productImages} />
          )}
        </div>
        <div className="flex flex-col col-span-7 space-y-8">
          <div className="flex flex-col space-y-4">
            <Breadcrumb
              items={[
                {
                  title: <a href="">{product?.brand.name}</a>,
                },
                {
                  title: `${product?.name}`,
                },
              ]}
            />
            <h1 className="pb-5 border-b text-4xl font-semibold 2xl:text-5xl 2xl:leading-[60px]">
              {product?.name}
            </h1>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p>Select Size</p>
              <Button icon={<EyeOutlined />} type="text" onClick={showModal}>
                Size Guide
              </Button>
              <Modal
                title={"SIZE GUIDE"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <div className="mt-4 border rounded-xl border-zinc-300">
                  <div className="p-5 text-sm font-semibold border-b border-zinc-300">
                    Adidas Men`s
                  </div>
                  <div className="overflow-y-auto h-[500px] ">
                    <Image
                      src={"/image/size-guide.png"}
                      alt={"size guize"}
                      width={500}
                      height={1000}
                      quality={100}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </Modal>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-6 2xl:grid-cols-5">
              {product?.productDetails && product?.productDetails.length > 0 ? (
                product?.productDetails.map((detail: any, index: number) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedSize(detail.size)}
                    className={`py-5 text-sm border rounded-full border-zinc-300 ${
                      selectedSize == detail.size
                        ? "bg-green-700 !hover:bg-green-800 text-zinc-50"
                        : ""
                    }`}
                  >
                    {detail.size}
                  </Button>
                ))
              ) : (
                <div>No product details available.</div>
              )}
            </div>
            <div>
              <p className="text-zinc-500">Available For:</p>
              <h1 className="text-2xl font-medium">Rp 2,500,000</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="h-14 rounded-xl" block>
              Add To Cart
            </Button>
            <Button className="h-14 rounded-xl" block type="primary">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
