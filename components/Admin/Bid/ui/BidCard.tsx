import React from "react";
import Image from "next/image";
import { Card } from "antd";

interface BidCardProps {
	name: string;
	price: string;
	isStart: Date;
	isEnd: Date;
}

const BidCard = ({ name, price, isStart, isEnd }: BidCardProps) => {
	const formattedStartDate = `${isStart.toLocaleDateString("id-ID", {
		month: "long",
		day: "numeric",
	})} ${isStart.toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
	})}`;

	const formattedEndDate = `${isEnd.toLocaleDateString("id-ID", {
		month: "long",
		day: "numeric",
	})} ${isEnd.toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
	})}`;

	return (
		<Card className="h-fit w-full border bg-white rounded-lg p-3 border-zinc-300 hover:border-zinc-900 group">
			<div className="bg-zinc-50 rounded-md overflow-hidden mb-3">
				<Image
					src={"/mock/shoe-mock-1.png"}
					alt={"..."}
					width={300}
					height={100}
					layout="intrinsic"
					className="aspect-[16/12] object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-3">
				<h1 className="truncate text-sm font-medium">{name}</h1>
				<main className="flex gap-2 border-b border-zinc-300 pb-2">
					<div className="py-1">
						<Image
							src={"/icons/bid-set-time.svg"}
							alt={"icon"}
							width={12}
							height={30}
							layout="intrinsic"
						/>
					</div>
					<div className="flex flex-col justify-between pb-1">
						<p className="text-xs fpnt-medium">
							<span className="text-zinc-400">Start : </span>
							{formattedStartDate}
						</p>
						<p className="text-xs fpnt-medium">
							<span className="text-zinc-400">End : </span>
							{formattedEndDate}
						</p>
					</div>
				</main>
				<footer className="flex justify-between items-center">
					<p className="text-xs">Starting price:</p>
					<h1 className="text-sm text-primary font-medium">Rp. {price}</h1>
				</footer>
			</div>
		</Card>
	);
};

export default BidCard;
