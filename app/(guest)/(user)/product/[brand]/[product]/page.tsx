"use client";
import DetailProduct from "#/components/DetailProduct/DetailProduct";
import { SimiliarProduct } from "#/components/DetailProduct/SimiliarProduct";
import { productRepository } from "#/repository/product";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { brand: string; product: string } }) => {
  const { data, error, isLoading }  = productRepository.hooks.useProductName(params.product);
  console.log(data)
  return (
    <div>
      <DetailProduct product={data} />
      <SimiliarProduct />
    </div>
  );
};

export default page;
