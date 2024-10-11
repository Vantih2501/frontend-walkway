import React, { useState } from "react";
import Image from "next/image";
import type { CountdownProps } from "antd";
import { Card, Statistic } from "antd";

const { Countdown } = Statistic;

interface CardProps {
	price: string;
	productName: string;
	imageUrl: string;
	size?: "md" | "lg";
	variant?: "default" | "bid";
}

const ProductCard = ({
	size = "lg",
	variant = "default",
	price,
	productName,
	imageUrl,
}: CardProps) => {
	const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

	const onFinish: CountdownProps["onFinish"] = () => {
		console.log("finished!");
	};

	const isLarge = size === "lg";
	const isTextColor = variant === "bid";

	const cardClasses = `relative cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full ${
		variant === "bid"
			? "bg-primary-300 border-primary-300 text-white"
			: "bg-white"
	}`;

	return (
		<Card style={{ fontSize: `${isLarge ? "18px" : "14px"}` }} className={cardClasses}>
			{variant === "bid" && (
				<div className="absolute w-full top-0 h-14 bg-primary-300 flex justify-center items-center rounded-t-xl">
					<Countdown
						valueStyle={{
							color: "#ffffff",
							fontSize: "20px",
							letterSpacing: ".1em",
						}}
						value={deadline}
						onFinish={onFinish}
						format="HH  :  mm  :  ss"
					/>
				</div>
			)}

			{/* PRODUCT IMAGE */}
			<div className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1 bg-white">
				<Image
					src={imageUrl}
					alt={productName}
					width={isLarge ? 295 : 232}
					height={isLarge ? 295 : 232}
					className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
				/>
			</div>

			{/* PRODUCT DESCRIPTION */}
			<div className="p-5">
				{variant === "bid" && <p className="text-primary-100 text-base mb-1">Current bid:</p>}

				<h2
					className={`${isLarge? "text-2xl" : "text-xl"} font-medium mb-4`}
				>
					Rp. {price}
				</h2>

				<p
					className={`
					text-${isTextColor ? "primary-100" : "zinc-500"}
					${isLarge ? "text-base" : "text-sm"} line-clamp-2`}
				>
					{productName}
				</p>
			</div>
		</Card>
	);
};

export default ProductCard;
