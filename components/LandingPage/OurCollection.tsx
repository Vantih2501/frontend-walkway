"use client";
import React from "react";
import Link from "next/link";
import { useProduct } from "#/hooks/product";
import { ProductCard } from "../common/card/ProductCard";
import { urlFormatter } from "#/utils/formatter";

const OurCollection = () => {
  const { fetchNewestProduct } = useProduct();
  const { product } = fetchNewestProduct();

  return (
    <div className="bg-primary-100">
      <div className="flex items-center px-8 py-12 mx-auto max-w-7xl">
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-montserrat">
              OUR COLLECTION
            </h1>
            <Link
              href={"#"}
              className="text-sm font-medium font-montserrat text-zinc-500 hover:opacity-75"
            >
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4 2xl:grid-cols-6">
            {product &&
              product.map((product) => (
                <Link key={product.id} href={`/product/${urlFormatter(product.brand.name)}/${urlFormatter(product.name)}`}>
                  <ProductCard
                    key={product.id}
                    price={product.price}
                    productName={product.name}
                    imageUrl={product.productPhotos.toString()}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCollection;
