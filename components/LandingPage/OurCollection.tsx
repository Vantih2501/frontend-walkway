import React from "react";
import Link from "next/link";
import ProductCard from "#/components/Card/page";
import { products } from "#/mock-data/products";

const OurCollection = () => {
	return (
		<div className="p-24 bg-primary-100 flex items-center">
			<div className="w-full space-y-8">
				<div className="flex justify-between items-center">
					<h1 className="font-montserrat text-3xl font-bold">OUR COLLECTION</h1>
					<Link
						href={"#"}
						className="text-sm font-montserrat text-zinc-500 hover:opacity-75 font-medium"
					>
						VIEW ALL
					</Link>
				</div>
				<div className="grid grid-cols-3 gap-4 lg:grid-cols-5 2xl:grid-cols-7 2xl:gap-5">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							price={product.price}
							productName={product.name}
							imageUrl={product.image}
							size="md"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default OurCollection;
