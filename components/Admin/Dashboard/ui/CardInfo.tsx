import React from "react";
import { Card } from "antd";
import { IconType } from "react-icons";

interface CardInfoProps {
	title: string;
	value: string;
	Icon: IconType;
}

const CardInfo = ({ title, value, Icon }: CardInfoProps) => {
	return (
		<Card hoverable className="rounded-lg p-4 border border-zinc-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-full hover:border-primary">
			<div className="flex justify-between items-center my-auto">
				<div>
					<h1 className="text-sm 2xl:text-base mb-[2px]">{title}</h1>
					<p className="text-xs text-zinc-300">*this month</p>
				</div>
				<Icon className="text-lg 2xl:text-xl" />
			</div>
			<h1 className="font-semibold text-lg 2xl:text-xl mt-3">{value}</h1>
		</Card>
	);
};

export default CardInfo;
