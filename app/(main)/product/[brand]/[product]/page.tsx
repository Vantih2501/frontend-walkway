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
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  return <DetailProduct product={product} />;
};

export default ProductDetail;
