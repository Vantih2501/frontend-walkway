import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Image, Timeline } from "antd";
import { FlagFilled } from "@ant-design/icons";

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
    <div className="h-full relative cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group bg-primary-300 border-primary-300 text-white">
      <div className="h-14 flex flex-col justify-center items-center -space-y-1">
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
          src={imageUrl}
          alt={bid.productDetail.product.name || "img"}
          preview={false}
          className="bg-white w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="py-4 px-5 space-y-2">
        <div className="-space-y-1">
          <p className="font-light">Available from</p>
          <h2 className="text-lg">Rp {bid.start_price.toLocaleString('en-US')}</h2>
        </div>
        <p className="text-primary-100 text-base line-clamp-1 mb-auto">
          {bid.productDetail.product.name}
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
    <div onClick={() => { }} className="rounded-md border bg-white px-4 py-3 flex flex-col justify-between gap-1 cursor-pointer">
      <div className="space-y-3">
        <Image
          src={bid.productPhotos}
          alt="product"
          preview={false}
          className="object-contain border-black aspect-video border"
        />
        <h2 className="font-semibold line-clamp-1">{bid.productDetail.product.name}</h2>
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
      <div className="flex justify-between items-center">
        <p>Starting Price:</p>
        <p className="text-green-600 font-medium">Rp {bid.start_price.toLocaleString('en-US')}</p>
      </div>
    </div>
  )
}