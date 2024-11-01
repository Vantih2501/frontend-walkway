"use client";

import React, { useState } from "react";
import ProductImage from "./ui/ProductImage";
import { Breadcrumb, Button, Modal, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import { SimiliarProduct } from "./SimiliarProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProduct } from "#/hooks/product";
import { getAccessToken, getCheckoutToken, removeCheckoutToken, setCheckoutToken } from "#/utils/token";
import { useAuth } from "#/hooks/auth";

const DetailProduct = ({ product }: { product: Product | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const { genCheckoutToken } = useProduct()

  const { getUser } = useAuth();
  const token = getAccessToken();
  const { user, isLoading, isError } = getUser(token);

  const handleCheckout = async (data: ProductDetail) => {
    const token = getCheckoutToken()
    if (token) {
      removeCheckoutToken()
    }

    try {
      setLoading(true)

      if (!user) {
        return router.push('/login')
      }  

      const response = await genCheckoutToken(data)
      setCheckoutToken(response.checkout_token)
    } catch (error) {
      throw error
    } finally {
      router.push('/checkout')
    }
  }

  return (
    <div>
      <div className="py-16 px-52 2xl:px-72">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5">
            {product && <ProductImage imageUrl={product?.productPhotos} />}
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
                <Button icon={<EyeOutlined />} type="text" onClick={() => setIsModalOpen(true)}>
                  Size Guide
                </Button>
                <Modal
                  title={"SIZE GUIDE"}
                  open={isModalOpen}
                  onOk={() => setIsModalOpen(false)}
                  onCancel={() => setIsModalOpen(false)}
                  footer={null}
                >
                  <div className="mt-4 border rounded-xl border-zinc-300">
                    <div className="p-5 text-sm font-semibold border-b border-zinc-300">
                      {product?.brand.name} Size Chart
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
                {product?.productDetails &&
                  product?.productDetails.length > 0 ? (
                  product?.productDetails.map((detail: any, index: number) => (
                    <Button
                      disabled={loading}
                      key={index}
                      type={selectedSize && selectedSize.size == detail.size ? "primary" : "default"}
                      onClick={() => setSelectedSize(detail)}
                      className="py-5 text-sm border rounded-full border-zinc-300"
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
                <h1 className="text-2xl font-medium">
                  Rp {product?.price.toLocaleString("en-US")}
                </h1>
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="h-14 rounded-xl flex-1">
                Add To Cart
              </Button>
              <Button
                block
                className="h-14 rounded-xl flex-1"
                type="primary"
                loading={loading}
                disabled={selectedSize == null}
                onClick={() => selectedSize && (handleCheckout(selectedSize))}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SimiliarProduct />
    </div>
  );
};

export default DetailProduct;
