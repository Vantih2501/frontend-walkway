import { Button, Divider, Tag } from 'antd'
import React from 'react'

const TagStyle = "m-0 py-4 px-5 rounded-full bg-white text-zinc-900 border-zinc-300 hover:border-primary hover:text-primary active:bg-primary active:text-white text-xs";
const fetchCategories = [
	"Electronics",
	"Clothing",
	"Accessories",
	"Footwear",
	"Sneakers",
	"Pria",
	"Wanita",
	"Running Shoe",
];

const CategoryTag = () => {

  return (
		<div className="p-6 border border-zinc-300 rounded-2xl">
			<div>
				<p className="mb-4">Category</p>
				<div className="flex flex-wrap gap-2">
					{fetchCategories.map((category) => (
						<Button key={category} className={TagStyle}>
							{category}
						</Button>
					))}
				</div>
			</div>

			<Divider />

			<div>
				<p className="mb-4">Brands</p>
				<div className="flex flex-wrap gap-2">
					{fetchCategories.map((category) => (
						<Button key={category} className={TagStyle}>
							{category}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

export default CategoryTag

