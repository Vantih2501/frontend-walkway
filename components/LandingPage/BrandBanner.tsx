"use client";
import React from "react";
import { useBrand } from "#/hooks/brand";
import { Image } from "antd";
import Link from "next/link";
import { urlFormatter } from "#/utils/formatter";

const BrandBanner = () => {
  const { fetchRecentBrand } = useBrand();
  const { brand, isError, isLoading } = fetchRecentBrand();
  return (
    <div className="text-white bg-primary-400">
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center w-full justify-evenly gap-x-24">
          {brand &&
            brand.map((brand, index) => (
              <Link key={index} href={`/product/${urlFormatter(brand.name)}`}>
                <Image src={brand.image} alt={brand.name} preview={false} className="max-w-32 mix-blend-screen"/>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrandBanner;
