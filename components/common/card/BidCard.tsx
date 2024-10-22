import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Image } from "antd";

dayjs.extend(duration);


interface CardProps {
  bid: Bid;
  imageUrl: string;
  product: Product;
}

const BidCard = ({ bid, imageUrl, product }: CardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00");
  const [status, setStatus] = useState<string>("Begins at");

  useEffect(() => {
    const startDate = dayjs(bid.start_date);
    const endDate = dayjs(bid.end_date);
    const now = dayjs();

    const isBeforeStart = now.isBefore(startDate);
    const isAfterStart = now.isAfter(startDate) && now.isBefore(endDate);

    let targetDate = isBeforeStart ? startDate : endDate;
    let countdownType = isBeforeStart ? "Begins at" : "Ends in";

    setStatus(countdownType);

    const interval = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now);
      if (diff > 0) {
        const time = dayjs.duration(diff);
        setTimeRemaining(
          `${String(time.hours()).padStart(2, "0")}:${String(time.minutes()).padStart(2, "0")}:${String(time.seconds()).padStart(2, "0")}`
        );
      } else {
        clearInterval(interval);
        setTimeRemaining("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bid.start_date, bid.end_date]);

  return (
    <div className="h-full relative cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group bg-primary-300 border-primary-300 text-white">
      <div className="py-2 flex flex-col justify-center items-center -space-y-1">
        <p className="font-light">{status}</p>
        <h2 className="text-xl">{timeRemaining}</h2>
      </div>

      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <Image
          src={imageUrl}
          alt={bid.productDetail.product.name || "img"}
          preview={false}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="py-4 px-5 space-y-2">
        <div className="-space-y-1">
          <p className="font-light">Available from</p>
          <h2 className="text-lg">Rp {bid.start_price.toLocaleString('en-US')}</h2>
        </div>
        <p className="text-primary-100 text-base line-clamp-2 mb-auto">
          {bid.productDetail.product.name}
        </p>
      </div>
    </div>
  );
};

export default BidCard;
