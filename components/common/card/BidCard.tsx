import React from "react";
import type { CountdownProps } from "antd";
import { Image } from "antd";

interface CardProps {
  bid?: Bid;
  imageUrl: string
  product: Product
}

const BidCard = ({ bid, imageUrl }: CardProps) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
  };

  return (
    <div
      className={
        "bg-primary-300 h-100vh cursor-pointer rounded-xl text-white border border-primary-300 transition-all duration-300 ease-in-out hover:border-primary-500 w-full group"
      }
    >
      {/* {variant === "bid" && (
        <div className="absolute top-0 z-10 flex items-center justify-center w-full h-14 bg-primary-300 rounded-t-xl">
          <Countdown
            valueStyle={{
              color: "#ffffff",
              fontSize: "18px",
              letterSpacing: ".1em",
            }}
            value={deadline}
            onFinish={onFinish}
            format="HH  :  mm  :  ss"
          />
        </div>
      )} */}

      <div className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1">
        <Image
          src={imageUrl}
          alt={imageUrl || "img"}
          // width={isLarge ? 295 : 232}
          // height={isLarge ? 295 : 232}
          preview={false}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 py-4 `}
        />
      </div>

      {/* <div className="h-32 p-4">
        {variant === "bid" && (
          <p className="mb-1 text-sm text-primary-100/80">Current bid:</p>
        )}

        <h1
          className={`montserrat.className ${
            isLarge ? "text-2xl mb-4" : "text-xl mb-3"
          } font-medium`}
        >
          Rp. {price.toLocaleString("id")}
        </h1>

        <p
          className={`text-${isTextColor ? "primary-100" : "zinc-500"} ${
            isLarge ? "text-base" : "text-sm"
          } line-clamp-2 mb-auto`}
        >
          {productName}
        </p>
      </div> */}
    </div>
  );
};

export default BidCard;
