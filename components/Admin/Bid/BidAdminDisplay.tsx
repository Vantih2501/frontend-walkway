import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { IoCubeOutline } from "react-icons/io5";
import { Button } from "antd";
import React from "react";
import BidCard from "./ui/BidCard";
import { products } from "#/mock-data/products";

const BidAdminDisplay = () => {

	const startDate = new Date(2024, 9,25)
	const endDate = new Date(2024, 9,26)

	return (
		<div className="h-full flex flex-col gap-4">
			<header className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Button
						style={{ borderRadius: "30px", height: "37px", fontSize: "12px" }}
						size="large"
						type="default"
						icon={<IoCubeOutline />}
					>
						All Product
					</Button>
					<Button
						style={{ borderRadius: "30px", height: "37px", fontSize: "12px" }}
						size="large"
						type="default"
						icon={<DownOutlined />}
					>
						All Brands
					</Button>
				</div>
				<Button
					style={{ borderRadius: "30px", height: "37px", fontSize: "12px" }}
					size="large"
					type="primary"
					icon={<PlusOutlined />}
				>
					Add Product
				</Button>
			</header>
			<main className="h-[1000px] grid grid-cols-3 2xl:grid-cols-4 gap-4 overflow-y-scroll">
				{products.map((product) => (
					<BidCard
						key={product.id}
						name={product.name}
						price={product.price} 
						isStart={startDate} 
						isEnd={endDate}			
					></BidCard>
				))}
			</main>
		</div>
	);
};

export default BidAdminDisplay;
