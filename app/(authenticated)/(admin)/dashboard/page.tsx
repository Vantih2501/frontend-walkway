"use client";
import CarouselStock from "#/components/Admin/Dashboard/CarouselStock";
import { products } from "#/mock-data/products";
import React from "react";
import ContainerInfo from "#/components/Admin/Dashboard/ContainerInfo";
import SiderContent from "#/components/Admin/Dashboard/SiderContent";
import Charts from "#/components/Admin/Dashboard/Charts";

const page = () => {
	return (
		<div className="grid grid-cols-12 gap-4 overflow-y-auto h-[575px] 2xl:h-[730px]">
			<div className="col-span-8 h-full">
				<div className="gap-4 flex flex-col justify-between">
					<ContainerInfo className="flex justify-between gap-4 h-fit" />

					<Charts />

					<div className="h-fit">
						<CarouselStock dataFetch={products} />
					</div>
				</div>
			</div>

			<div className="h-full col-span-4 rounded-lg border border-zinc-300">
				<SiderContent />
			</div>
		</div>
	);
};

export default page;
