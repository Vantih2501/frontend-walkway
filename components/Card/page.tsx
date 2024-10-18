import React from "react";
import Image from "next/image";
import type { CountdownProps } from "antd";
import { Statistic } from "antd";

const { Countdown } = Statistic;

interface CardProps {
	price: string;
	productName: string;
	imageUrl: string;
	size?: "md" | "lg";
	variant?: "default" | "bid" | "categories";
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

	const cardClasses = `h-full relative cursor-pointer rounded-xl border border-transparent transition-all duration-300 ease-in-out hover:border-primary-500 w-full group ${
		variant === "bid" ? "bg-primary-300 border-primary-300 text-white" : "bg-white"}`;

	return (
		<div className={cardClasses}>
			{variant === "bid" && (
				<div className="absolute w-full top-0 h-14 bg-primary-300 flex justify-center items-center rounded-t-xl z-10">
					<Countdown
						valueStyle={{
							color: "#ffffff",
							fontSize: "18px",
							letterSpacing: ".1em",
						}}
						value={deadline}
						onFinish={onFinish}
						format="HH  :  mm  :  ss"
					/>
				</div>
			)}

			{/* PRODUCT IMAGE */}
			<div
				className="overflow-hidden rounded-t-xl aspect-w-1 aspect-h-1"
			>
				<Image
					src={imageUrl}
					alt={productName}
					width={isLarge ? 295 : 232}
					height={isLarge ? 295 : 232}
					quality={100}
					className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 ${
					variant === "categories" ? "bg-[#F7F8F7]" : "bg-white"
				}`}
				/>
			</div>

			{/* PRODUCT DESCRIPTION */}
			<div className="p-5 h-full">
				{variant === "bid" && (
					<p className="text-primary-100/80 text-sm mb-1">Current bid:</p>
				)}

				<h1 className={`montserrat.className ${isLarge ? "text-xl mb-4" : "text-lg mb-3"} font-medium`}>
					Rp. {price}
				</h1>

				<p
					className={`text-${isTextColor ? "primary-100" : "zinc-500"} ${
						isLarge ? "text-base" : "text-sm"
					} line-clamp-2 mb-auto`}
				>
					{productName}
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
