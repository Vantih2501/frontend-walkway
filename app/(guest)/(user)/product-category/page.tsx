"use client"
import React from "react";
import DisplayProduct from "../../../../components/ProductCategory/DisplayProduct";
import CategoryTag from "#/components/ProductCategory/CategoryTag";

const ProductCategory = () => {
	return (
		<div className="grid grid-cols-12 gap-5 p-24">
			<div className="col-span-3">
				<CategoryTag />
			</div>
			<div className="col-span-9">
				<DisplayProduct />
			</div>
		</div>
	);
};

export default ProductCategory;
