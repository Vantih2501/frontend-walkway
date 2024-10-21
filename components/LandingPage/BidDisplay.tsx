import React from "react";
import CarouselUi from "./ui/Carousel";
import { products } from "#/mock-data/products";

const BidDisplay = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center h-full px-8 py-12">
        <div className="w-full space-y-16">
          <h1 className="montserrat.className font-bold text-center text-6xl leading-[79px] mb-14 2xl:text-7xl 2xl:leading-[100px] 2xl:mb-20">
            Get rare items, at the <br /> best prices. Bid Now!
          </h1>
          <CarouselUi dataFetch={products} variant={"bid"} />
        </div>
      </div>
    </div>
  );
};

export default BidDisplay;
