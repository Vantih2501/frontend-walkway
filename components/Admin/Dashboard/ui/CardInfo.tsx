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
		<Card hoverable className="rounded-lg p-4 border border-zinc-300 w-full hover:border-primary">
			<div className="flex justify-between items-center my-auto">
				<div>
					<h1 className="text-sm 2xl:text-base mb-[2px]">{title}</h1>
					<p className="text-xs text-zinc-300">*this month</p>
				</div>
				<Icon className="text-lg 2xl:text-xl outline-1" />
			</div>
			<h1 className="font-semibold text-lg 2xl:text-xl mt-3">{value}</h1>
		</Card>
	);
};

export default CardInfo;
