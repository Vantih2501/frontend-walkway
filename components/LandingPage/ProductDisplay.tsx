"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useProduct } from "#/hooks/product";
import ProductCarousel from "../common/carousel/ProductCarousel";
import menyala from '#/public/icons/fire-icon.svg'

const ProductDisplay = () => {
  const { fetchNewestProduct } = useProduct();
  const { product, isLoading } = fetchNewestProduct();
  return (
    <div className="bg-primary-100">
      <div className="flex items-center px-8 py-12 mx-auto max-w-7xl">
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={menyala}
                alt="fire icon"
                width={27}
                height={32}
              />
              <h1 className="text-3xl font-bold font-montserrat">
                HOTTEST SNEAKER
              </h1>
            </div>
          </div>
          {product && <ProductCarousel product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
