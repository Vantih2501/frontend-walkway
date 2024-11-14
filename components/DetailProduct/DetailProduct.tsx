"use client";

import React, { useState } from "react";
import ProductImage from "./ui/ProductImage";
import { Breadcrumb, Button, message, Modal, Spin } from "antd";
import { ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import { SimiliarProduct } from "./SimiliarProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProduct } from "#/hooks/product";
import {
  getAccessToken,
  getCheckoutToken,
  removeCheckoutToken,
  setCheckoutToken,
} from "#/utils/token";
import { useAuth } from "#/hooks/auth";
import Title from "antd/es/typography/Title";
import { useCart } from "#/hooks/cart";
import { Minus, Plus } from "lucide-react";
import { compressJWT, decompressJWT } from "#/utils/compressor";

const DetailProduct = ({ product }: { product: Product | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const { genCheckoutToken } = useProduct();
  const { addToCart } = useCart();
  const { getUser } = useAuth();
  const token = getAccessToken();
  const { user } = getUser(token);

  const handleCheckout = async (data: ProductDetail[]) => {
    const token = getCheckoutToken();

    if (token) {
      removeCheckoutToken();
    }

    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }

    try {
      setLoading(true);

      const response = await genCheckoutToken([
        { id: data[0].id, quantity: quantity },
      ]);
      const compressedToken = compressJWT(response.checkout_token);
      setCheckoutToken(compressedToken);

      router.push("/checkout");
    } catch (error) {
      message.error("Error saat proses checkout");
      console.error(error);
      setLoading(false);
    }
  };

  const handleCart = async (data: ProductDetail) => {
    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }

    try {
      setLoading(true);
      await addToCart({
        productDetailId: data.id,
        cartId: user.cartId,
        quantity: quantity,
      });
      message.success("Product added to cart.");
    } catch (error: any) {
      message.error(
        `Error when adding to cart: ${error.response.body.message}`
      );
      setLoading(false);
    } finally {
      setQuantity(1);
      setSelectedSize(undefined);
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalVisible(false);
    window.location.href = "/login";
  };

  return (
    <>
      <div className="py-16 px-52 2xl:px-72">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5">
            {product && <ProductImage imageUrl={product?.productPhotos} />}
          </div>
          <div className="flex flex-col col-span-7 space-y-6">
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
            <div className="space-y-5">
              {product?.status !== "inactive" ? (
                <>
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p>Select Size</p>
                      <Button
                        icon={<EyeOutlined />}
                        type="text"
                        onClick={() => setIsModalOpen(true)}
                      >
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
                              alt={"size guide"}
                              width={500}
                              height={1000}
                              quality={100}
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <div className="grid grid-cols-4 gap-3 2xl:grid-cols-5">
                      {product?.productDetails &&
                      product?.productDetails.length > 0 ? (
                        product?.productDetails.map(
                          (detail: any, index: number) => (
                            <Button
                              disabled={loading || detail.stock <= 0}
                              key={index}
                              type={
                                selectedSize && selectedSize.size == detail.size
                                  ? "primary"
                                  : "default"
                              }
                              onClick={() => {
                                selectedSize == detail
                                  ? setSelectedSize(undefined)
                                  : setSelectedSize(detail);
                                setQuantity(1);
                              }}
                              className="py-5 text-sm border rounded-full border-zinc-300"
                            >
                              {detail.size}
                            </Button>
                          )
                        )
                      ) : (
                        <div>No product details available.</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-zinc-500">Available For:</p>
                      <h1 className="text-2xl font-medium">
                        Rp {product?.price.toLocaleString("en-US")}
                      </h1>
                    </div>
                    {selectedSize && (
                      <p className="text-zinc-500">
                        Stock:{" "}
                        <span
                          className={
                            selectedSize.stock < 10 ? "text-orange-500" : ""
                          }
                        >
                          {selectedSize.stock}
                        </span>
                      </p>
                    )}
                  </div>
                  {selectedSize && (
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => setQuantity((prev) => prev - 1)}
                        className="pointer-events-auto"
                        disabled={quantity <= 1}
                        shape="default"
                        icon={<Minus className="text-zinc-800" size="14px" />}
                      />
                      <p className="text-center basis-6">{quantity}</p>
                      <Button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        disabled={quantity == selectedSize.stock}
                        className="pointer-events-auto"
                        shape="default"
                        icon={<Plus className="text-zinc-800" size="14px" />}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="py-10 text-center">Product is currently unavailable</div>
              )}
            </div>
            {product?.status !== "inactive" && (
              <div className="flex gap-4">
                <Button
                  className="flex-1 h-14 rounded-xl"
                  loading={loading}
                  disabled={!selectedSize}
                  onClick={() => selectedSize && handleCart(selectedSize)}
                >
                  Add To Cart
                </Button>
                <Button
                  block
                  className="flex-1 h-14 rounded-xl"
                  type="primary"
                  loading={loading}
                  disabled={selectedSize == null}
                  onClick={() => selectedSize && handleCheckout([selectedSize])}
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SimiliarProduct />

      {/* Modal untuk login */}
      <Modal
        open={isLoginModalVisible}
        onOk={handleLoginRedirect}
        onCancel={() => setIsLoginModalVisible(false)}
        okText="Login"
        cancelText="Cancel"
        closable={false}
      >
        <div className="flex ">
          <ExclamationCircleOutlined
            className="text-6xl"
            style={{ color: "#b91c1c" }}
          />
          <Title level={4} className="mx-4 mt-4">
            Login first to checkout.
          </Title>
        </div>
      </Modal>
    </>
  );
};

export default DetailProduct;
