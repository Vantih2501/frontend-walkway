"use client";

import React from "react";
import type { StatisticProps } from "antd";
import { Statistic, Divider } from "antd";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

interface customStatisticProps {
  title: string;
  value: number;
  precision?: number;
}

const CustomStatistic = ({ title, value, precision }: customStatisticProps) => (
  <div className="">
    <div className="flex items-center">
      <Statistic
        className="font-semibold"
        value={value}
        precision={precision}
        formatter={formatter}
      />
      <span className="font-medium text-4xl 2xl:text-[52px]">+</span>
    </div>
    <div className="text-zinc-500 2xl:text:lg">{title}</div>
  </div>
);

const AnimatedNumberUi = () => {
  return (
    <div className="flex items-center gap-6">
      <CustomStatistic
        title="Items Sold Across Our Platform"
        value={10000}
        precision={2}
      />
      <Divider type="vertical" className="h-20 border-zinc-300" />
      <CustomStatistic title="International Brands" value={50} precision={2} />
    </div>
  );
};

export default AnimatedNumberUi;
