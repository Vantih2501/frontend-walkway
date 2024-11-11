"use client";
import CarouselStock from "#/components/Admin/Dashboard/CarouselStock";
// import { products } from "#/mock-data/products";
import React from "react";
import ContainerInfo from "#/components/Admin/Dashboard/ContainerInfo";
import SiderContent from "#/components/Admin/Dashboard/SiderContent";
import Charts from "#/components/Admin/Dashboard/Charts";
import DashboardTable from "#/components/DashboardTable";
import { useProduct } from "#/hooks/product";
import { Spin } from "antd";

const Dashboard = () => {
	const { fetchProduct } = useProduct();
	const { product, isLoading } = fetchProduct();

	if (isLoading) {
		return (
			<div className="w-full h-[80vh] flex items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<main className="grid grid-cols-12 gap-4">
				<section className="h-full col-span-8">
					<div className="h-full flex flex-col justify-between gap-4">
						<ContainerInfo
							totalRevenue={"RP. 300,000K"}
							totalSales={"30"}
							totalProduct={product}
							className="flex justify-between gap-4 h-fit"
						/>
						<Charts />
					</div>
				</section>

				<aside className="h-full col-span-4 border rounded-lg border-zinc-300">
					{/* Change to Order Api */}
					<SiderContent orders={product} />
				</aside>
			</main>

			<footer>
				<DashboardTable product={product} />
			</footer>
		</div>
	);
};

export default Dashboard;
