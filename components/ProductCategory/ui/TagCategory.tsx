"use client";

import React from "react";
import { Button } from "antd";

const fetchCategories = ["Electronics", "Clothing", "Accessories", "Footwear", "Sneakers", "Pria", "Wanita", "Running Shoe"];

const TagProduct = () => {

  return (
		<div>
			{fetchCategories.map((category) => (
				<Button
					key={category}
					className={"py-[6px] px-5 rounded-full bg-primary text-white hover:opacity-75"}
          >
					{category}
				</Button>
			))}
		</div>
	);
};

export default TagProduct;

