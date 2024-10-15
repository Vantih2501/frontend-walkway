"use client"

import React from 'react'
import { products } from '#/mock-data/products'
import ProductCard from '../Card/page'
import { Space, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const TagStyle = "m-0 py-2 px-5 rounded-full bg-primary text-white text-sm";

const DisplayProduct = () => {
  return (
		<>
			<div className="flex gap-9">
				<div className="flex gap-3 items-center mb-6">
					<span className="m-0 font-medium text-base">Categories:</span>
					<Space size={8}>
						<Tag
							closeIcon={
								<CloseOutlined style={{ color: "white", marginLeft: "8px" }} />
							}
							onClose={console.log}
							className={TagStyle}
						>
							Sneakers
						</Tag>
						<Tag
							closeIcon={
								<CloseOutlined style={{ color: "white", marginLeft: "8px" }} />
							}
							onClose={console.log}
							className={TagStyle}
						>
							Running Shoes
						</Tag>
					</Space>
				</div>
				<div className="flex gap-3 items-center mb-6">
					<span className="font-medium text-base">Brands:</span>
					<Space size={8}>
						<Tag
							closeIcon={
								<CloseOutlined style={{ color: "white", marginLeft: "8px" }} />
							}
							onClose={console.log}
							className={TagStyle}
						>
							Adidas
						</Tag>
						<Tag
							closeIcon={
								<CloseOutlined style={{ color: "white", marginLeft: "8px" }} />
							}
							onClose={console.log}
							className={TagStyle}
						>
							Nike
						</Tag>
					</Space>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-5 2xl:grid-cols-5">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						price={product.price}
						productName={product.name}
						imageUrl={product.image}
						variant="categories"
						size="md"
					/>
				))}
			</div>
		</>
	);
}

export default DisplayProduct

