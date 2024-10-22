"use client"

import { useBid } from "#/hooks/bid";
import BidCarousel from "../common/carousel/BidCarousel";

// import ProductCarousel from "../common/carousel/Carousel";
// import { products } from "#/mock-data/products";

const BidDisplay = () => {
  const { fetchBids } = useBid()
  const { bids } = fetchBids()
  console.log(bids)
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center h-full px-8 py-12">
        <div className="w-full space-y-16">
          <h1 className="montserrat.className font-bold text-center text-6xl leading-[79px] mb-14 2xl:text-7xl 2xl:leading-[100px] 2xl:mb-20">
            Get rare items, at the <br /> best prices. Bid Now!
          </h1>
          {bids && <BidCarousel bids={bids} />} 
        </div>
      </div>
    </div>
  );
};

export default BidDisplay;
