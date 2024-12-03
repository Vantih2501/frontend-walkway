"use client";

import React from "react";
// import { products } from '#/mock-data/products'

import { Space, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ProductVariantCard } from "../common/card/ProductCard";
import Link from "next/link";
import { urlFormatter } from "#/utils/formatter";

const TagStyle = "m-0 py-2 px-5 rounded-full bg-primary text-white text-sm";

interface DisplayProductProps {
	products: Product[];
	selectedCategories: string[];
	selectedBrands: string[];
}

const DisplayProduct: React.FC<DisplayProductProps> = ({
	products,
	selectedCategories,
	selectedBrands,
}) => {
	return (
		<>
			<div className="flex gap-9">
				<header className="sticky top-0 flex items-center gap-3 mb-6">
					<span className="m-0 text-base font-medium">Categories:</span>
					<Space size={8}>
						{selectedCategories.map((category) => (
							<Tag
								key={category}
								closeIcon={
									<CloseOutlined
										style={{ color: "white", marginLeft: "8px" }}
									/>
								}
								onClose={() => console.log("Closed category:", category)}
								className={TagStyle}
							>
								{category}
							</Tag>
						))}
					</Space>
				</header>
				<div className="flex items-center gap-3 mb-6">
					<span className="text-base font-medium">Brands:</span>
					<Space size={8}>
						{selectedBrands.map((brand) => (
							<Tag
								key={brand}
								closeIcon={
									<CloseOutlined
										style={{ color: "white", marginLeft: "8px" }}
									/>
								}
								onClose={() => console.log("Closed brand:", brand)}
								className={TagStyle}
							>
								{brand}
							</Tag>
						))}
					</Space>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 2xl:grid-cols-5">
				{products.map((product) => (
					<Link key={product.id} href={`/product/${urlFormatter(product.brand.name)}/${urlFormatter(product.name)}`}>
						<ProductVariantCard
							productName={product.name}
							price={product.price}
							imageUrl={product.productPhotos.find((p) => p.photoType == "front")?.image}
						/>
					</Link>
				))}
			</div>
		</>
	);
};

export default DisplayProduct;
