
import React from "react";
import { products } from "#/mock-data/products";
import CarouselUi from "../LandingPage/ui/Carousel";

export const SimiliarProduct = () => {
	return (
		<div className="flex items-center px-24 py-24 bg-primary-100">
			<div className="w-full space-y-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">
						SIMILIAR PRODUCT
					</h1>
				</div>
				<CarouselUi dataFetch={products} variant={"default"} />
			</div>
		</div>
	);
};
