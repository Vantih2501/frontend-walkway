import React from "react";
import { products } from "#/mock-data/products";
import CarouselUi from "../LandingPage/ui/Carousel";

export const CurrentAuction = () => {
	return (
		<div className="px-24 py-24 bg-primary-100 flex items-center">
			<div className="w-full space-y-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">CURRENT AUCTION</h1>
				</div>
				<CarouselUi dataFetch={products} variant={"bid"} />
			</div>
		</div>
	);
};
