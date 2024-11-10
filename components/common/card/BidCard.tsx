import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Image, Timeline } from "antd";
import { FlagFilled } from "@ant-design/icons";
import { config } from "#/config/app";

dayjs.extend(duration);


interface CardProps {
  bid: Bid;
  imageUrl: string;
  product: Product;
}

export const BidCard = ({ bid, imageUrl, product }: CardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00");
  const [status, setStatus] = useState<string>("Begins at");
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const startDate = dayjs(bid.start_date);
    const endDate = dayjs(bid.end_date);
    const now = dayjs();

    const isBeforeStart = now.isBefore(startDate);
    const isAfterStart = now.isAfter(startDate) && now.isBefore(endDate);

    const isEnded = now.isAfter(startDate) && now.isAfter(endDate);
    setEnded(isEnded)

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
    <div className="relative w-full h-full text-white transition-all duration-300 ease-in-out border border-transparent cursor-pointer rounded-xl hover:border-primary-500 group bg-primary-300 border-primary-300">
      <div className="flex flex-col items-center justify-center -space-y-1 h-14">
        {ended ?
          <h2 className="text-xl">Ended</h2> :
          <>
            <p className="font-light">{status}</p>
            <h2 className="text-xl">{timeRemaining}</h2>
          </>
        }
      </div>

      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <Image
          src={`${config.apiUrl}/product/uploads/${imageUrl}`}
          alt={bid.productDetail.product.name || "img"}
          preview={false}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out bg-white group-hover:scale-105"
        />
      </div>

      <div className="px-5 py-4 space-y-2">
        <div className="-space-y-1">
          <p className="font-light">Available from</p>
          <h2 className="text-lg">Rp {bid.start_price.toLocaleString('en-US')}</h2>
        </div>
        <p className="mb-auto text-base text-primary-100 line-clamp-1">
          {bid.productName}
        </p>
      </div>
    </div>
  );
};

interface AdminCardProps {
  // frontImage: string;
  // sold: number;
  bid: Bid,
  // onClick: (value: any) => void;
}

export const BidCardAdmin = ({ bid }: AdminCardProps) => {
  return (
    <div onClick={() => { }} className="flex flex-col justify-between gap-1 px-4 py-3 bg-white border rounded-md cursor-pointer">
      <div className="space-y-3">
        <Image
          src={`${config.apiUrl}/product/uploads/${bid.productPhotos}`}
          alt="product"
          preview={false}
          className="object-contain border border-black aspect-video"
        />
        <h2 className="font-semibold line-clamp-1">{bid.productName}</h2>
        <Timeline className=""
          items={[
            {
              children: <p><span className="text-gray-400">Start : </span>{dayjs(bid.start_date).format("DD MMM YYYY, HH:mm")}</p>,
            },
            {
              children: <p><span className="text-gray-400">End : </span>{dayjs(bid.end_date).format("DD MMM YYYY, HH:mm")}</p>,
              dot: <FlagFilled />,
              className: "!pb-0"
            },
          ]}
        />
      </div>
      <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex items-center justify-between">
        <p>Starting Price:</p>
        <p className="font-medium text-green-600">Rp {bid.start_price.toLocaleString('en-US')}</p>
      </div>
    </div>
  )
}