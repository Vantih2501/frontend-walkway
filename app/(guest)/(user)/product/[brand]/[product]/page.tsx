"use client";
import DetailProduct from "#/components/DetailProduct/DetailProduct";
import { SimiliarProduct } from "#/components/DetailProduct/SimiliarProduct";
import { ProductService } from "#/services/product";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { brand: string; product: string } }) => {
  const { product, isError, isLoading }  = ProductService.hooks.useProductName(params.product);
  console.log(product)
  return (
    <div>
      <DetailProduct product={product} />
      <SimiliarProduct />
    </div>
  );
};

export default page;
