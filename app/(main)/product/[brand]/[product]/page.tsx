"use client";
import DetailProduct from "#/components/DetailProduct/DetailProduct";
import { useProduct } from "#/hooks/product";
import { Spin } from "antd";

const ProductDetail = ({
  params,
}: {
  params: { brand: string; product: string };
}) => {
  const { fetchProductName } = useProduct();
  const { product, isLoading } = fetchProductName(params.product);

  if (isLoading) {
    return <Spin size="large" />
  }

  return <DetailProduct product={product} />;
};

export default ProductDetail;
