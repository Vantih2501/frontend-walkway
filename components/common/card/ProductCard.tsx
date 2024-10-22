import React from "react";
import type { CountdownProps } from "antd";
import { Image, Statistic } from "antd";

const { Countdown } = Statistic;

interface CardProps {
  price: number;
  productName: string;
  imageUrl?: string;
  size?: "md" | "lg";
  variant?: "default" | "bid" | "categories";
}

const ProductCard = ({
  size = "lg",
  variant = "default",
  price,
  productName,
  imageUrl,
}: CardProps) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
  };

  const isLarge = size === "lg";
  const isTextColor = variant === "bid";

  const cardClasses = `h-[100%] relative cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group ${
    variant === "bid"
      ? "bg-primary-300 border-primary-300 text-white"
      : "bg-white"
  }`;

  return (
    <div
      className={
        "bg-white h-100vh cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group"
      }
      // className={cardClasses}
    >

      <div className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1">
        <Image
          src={imageUrl}
          alt={imageUrl || "img"}
          // width={isLarge ? 295 : 232}
          // height={isLarge ? 295 : 232}
          preview={false}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 py-4 ${
            variant === "categories" ? "bg-[#F7F8F7]" : "bg-white"
          }`}
        />
      </div>

      <div className="h-32 p-4">
        {variant === "bid" && (
          <p className="mb-1 text-sm text-primary-100/80">Current bid:</p>
        )}

        <h1
          className={`montserrat.className ${
            isLarge ? "text-2xl mb-4" : "text-xl mb-3"
          } font-medium`}
        >
          Rp {price.toLocaleString("en-US")}
        </h1>

        <p
          className={`text-${isTextColor ? "primary-100" : "zinc-500"} ${
            isLarge ? "text-base" : "text-sm"
          } line-clamp-2 mb-auto`}
        >
          {productName}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
