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
	<div>
		<div className="flex items-center gap-1">
			<Statistic
				className="font-semibold"
				value={value}
				precision={precision}
				formatter={formatter}
			/>
			<span className="font-medium text-4xl">+</span>
		</div>
		<div className="text-zinc-500">{title}</div>
	</div>
);

const AnimatedNumberUi = () => {
	return (
		<div className="flex gap-8 items-center">
			<CustomStatistic
				title="Items Sold Across Our Platform"
				value={10000}
				precision={2}
			/>
			<Divider type="vertical" className="border-zinc-300 h-20" />
			<CustomStatistic title="International Brands" value={50} precision={2} />
		</div>
	);
};

export default AnimatedNumberUi;
