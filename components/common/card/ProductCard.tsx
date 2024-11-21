import React from "react";
import type { CountdownProps } from "antd";
import { Image, Statistic, Tag } from "antd";
import { config } from "#/config/app";

const { Countdown } = Statistic;

interface CardProps {
  price: number;
  productName: string;
  imageUrl?: string;
}

export const ProductCard = ({
  price,
  productName,
  imageUrl,
}: CardProps) => {

  return (
    <div
      className={
        "bg-white h-100vh cursor-pointer rounded-xl border  transition-all duration-300 ease-in-out hover:border-primary-500 w-full group"
      }
    >

      <div className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1">
        <Image
          src={`${config.apiUrl}/product/uploads/${imageUrl}`}
          alt={imageUrl || "img"}
          preview={false}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 py-4 bg-white`}
        />
      </div>

      <div className="h-32 p-4">


        <h1
          className={`montserrat.className text-xl mb-3 font-medium`}
        >
          Rp {price.toLocaleString("en-US")}
        </h1>

        <p
          className={`text-zinc-500 text-sm line-clamp-2 mb-auto`}
        >
          {productName}
        </p>
      </div>
    </div>
  );
};

interface AdminCardProps {
  frontImage: string;
  sold: number;
  product: Product,
  onClick: (value: any) => void;
  isSelected: boolean;
}


export const ProductCardAdmin = ({ product, frontImage, sold, onClick, isSelected }: AdminCardProps) => {
  return (
    <div onClick={() => onClick(product)} className={`flex flex-col justify-between gap-5 px-4 py-3 bg-white border ${isSelected && ("border-primary-300")} rounded-md cursor-pointer transition-all ease-in-out`}>
      <div className="space-y-3">
        <div className="relative">
          <Tag className="absolute top-1 left-0 rounded-full text-[10px] z-10" color={`${product.status === "active" ? "green" : "red"}`}>{product.status}</Tag>
          <Image
            src={`${config.apiUrl}/product/uploads/${frontImage}`}
            alt="product"
            preview={false}
            className="object-contain border border-black aspect-video"
          />
        </div>
        <div className="">
          <h2 className="font-semibold line-clamp-1">{product.name}</h2>
          <p className="font-medium text-green-600">Rp {product.price.toLocaleString('en-US')}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p>Total Stock <span className="font-bold">{product.productDetails.reduce((total, detail) => total + detail.stock, 0)}</span></p>
        <p>Sold <span className="font-bold">{sold}</span></p>
      </div>
    </div>
  )
}