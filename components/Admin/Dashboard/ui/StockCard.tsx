import { Avatar, Card } from "antd";
import React from "react";
import Image from "next/image";

interface StockCardProps {
	name: string;
	stock: string;
	image: string;
}

const StockCard = ({ name, stock, image }: StockCardProps) => {
	return (
		<div className="px-2">
			<Card
				hoverable
				className="w-full rounded-lg px-4 py-2 border border-zinc-300 hover:border-primary "
			>
				<div className="flex gap-2 items-center">
					<div className="size-16 aspect-square bg-primary-100 rounded-md">
						<Avatar className="size-full" src={image} shape="square" />
					</div>
					<div className="p-2 flex flex-col justify-center">
						<div>
							<h1 className="text-sm mb-2 font-medium">Stock: {stock}</h1>
							<p className="text-xs line-clamp-2 text-zinc-400">{name}</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default StockCard;
