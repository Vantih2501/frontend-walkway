"use client";
import { ProductCard } from "#/components/common/card/ProductCard";
import { config } from "#/config/app";
import { useProduct } from "#/hooks/product";
import { capitalize } from "#/utils/capitalize";
import { urlFormatter } from "#/utils/formatter";
import { Image } from "antd";
import Link from "next/link";

export default function BrandDetail({ params }: { params: { brand: string } }) {
  const { fetchNewestProduct } = useProduct();
  const { product } = fetchNewestProduct();
  return (
    <div className="min-h-screen py-8 space-y-5 bg-primary-100">
      <div className="text-white bg-primary-300">
        <div className="flex items-center justify-center py-8 mx-auto gap-28 max-w-7xl">
          <div className="space-y-3">
            <h2 className="text-4xl font-medium">{capitalize(params.brand)}</h2>
            <p className="text-lg font-light leading-6 tracking-tighter">
              {capitalize(params.brand) == "Adidas" &&
                "Adidas, in full Adidas AG, German manufacturer of athletic shoes and apparel and sporting goods. In the early 21st century it was the largest sportswear manufacturer in Europe and the second largest (after Nike) in the world. Adidas products are traditionally marked with a three-stripe trademark, which remains an element in the company's newer “trefoil” and “mountain” logos. Headquarters are in Herzogenaurach, Germany."}
              {capitalize(params.brand) == "Nike" &&
                `Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.`}
            </p>
          </div>
          <Image
            src={`${config.apiUrl}/brand/uploads/${
              product?.find(
                (data) => data.brand.name == capitalize(params.brand)
              )?.brand.image
            }`}
            width={200}
            className="mix-blend-screen"
            preview={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mx-auto max-w-7xl">
        {product &&
          product
            .filter((product) => product.brand.name == capitalize(params.brand))
            ?.map((product) => (
              <Link
                key={product.id}
                href={`/product/${urlFormatter(
                  product.brand.name
                )}/${urlFormatter(product.name)}`}
              >
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
  );
}
