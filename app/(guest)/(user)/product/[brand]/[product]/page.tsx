"use client";
import DetailProduct from "#/components/DetailProduct/DetailProduct";
import { SimiliarProduct } from "#/components/DetailProduct/SimiliarProduct";
import { useProduct } from "#/hooks/product";
import { ProductService } from "#/services/product";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { brand: string; product: string } }) => {
  const { fetchProductName } = useProduct()
  const { product, isError, isLoading } = fetchProductName(params.product)
  console.log(product)
  return (
    <div>
      {/* <DetailProduct product={product} />
      <SimiliarProduct /> */}
    </div>
  );
};

export default page;
