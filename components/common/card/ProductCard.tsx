import React from "react";
import type { CountdownProps } from "antd";
import { Image, Statistic } from "antd";

const { Countdown } = Statistic;

interface CardProps {
  price: number;
  productName: string;
  imageUrl?: string;
}

interface AdminCardProps {
  productName: string;
  price: number;
  frontImage: string;
  totalStock: number;
  sold: number;
  onClick: () => void;
}

export const ProductCard = ({
  price,
  productName,
  imageUrl,
}: CardProps) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
  };

  return (
    <div
      className={
        "bg-white h-100vh cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group"
      }
    >

      <div className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1">
        <Image
          src={imageUrl}
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

export const ProductCardAdmin = ({ price, productName, frontImage, sold, totalStock, onClick }: AdminCardProps) => {
  return (
    <div onClick={onClick} className="rounded-md border bg-white px-4 py-3 flex flex-col justify-between gap-5 cursor-pointer">
      <div className="space-y-3">
        <Image
          src={frontImage}
          alt="product"
          preview={false}
          className="object-contain border-black aspect-video border"
        />
        <div className="">
          <h2 className="font-semibold line-clamp-1">{productName}</h2>
          <p className="text-green-600 font-medium">Rp {price.toLocaleString('en-US')}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>Total Stock <span className="font-bold">{totalStock}</span></p>
        <p>Sold <span className="font-bold">{sold}</span></p>
      </div>
    </div>
  )
}