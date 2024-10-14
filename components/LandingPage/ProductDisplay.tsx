import Image from "next/image";
import Link from "next/link";
import React from "react";
import CarouselUi from "./ui/Carousel";
import { products } from '#/mock-data/products'

const ProductDisplay = () => {
	return (
		<div className="p-24 bg-primary-100 flex items-center">
			<div className="w-full space-y-8">
				<div className="flex justify-between items-center">
					<div className="flex gap-4 items-center">
						<Image
							src="/icons/fire-icon.svg"
							alt="fire icon"
							width={27}
							height={32}
						/>
						<h1 className="font-montserrat text-3xl font-bold">
							HOTTEST SNEAKER
						</h1>
					</div>
					<Link href={"#"} className="font-montserrat font-medium text-sm text-zinc-500 hover:opacity-75">
						VIEW ALL
					</Link>
				</div>
				<CarouselUi dataFetch={products} variant={"default"} />
			</div>
		</div>
	);
};

export default ProductDisplay;