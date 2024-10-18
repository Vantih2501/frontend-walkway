"use client";
import CarouselStock from "#/components/Admin/Dashboard/CarouselStock";
import { products } from "#/mock-data/products";
import React from "react";
import ContainerInfo from "#/components/Admin/Dashboard/ContainerInfo";
import SiderContent from "#/components/Admin/Dashboard/SiderContent";
import Charts from "#/components/Admin/Dashboard/Charts";

const page = () => {
	return (
			<div className="grid h-full grid-cols-12 gap-4">
				<div className="col-span-8">
					<div className="overflow-hidden gap-4 flex flex-col justify- h-full">
						<ContainerInfo className="flex justify-between gap-4 h-fit"/>

						<div className="rounded-lg border border-zinc-300 h-full">
							<Charts/>
						</div>

						<div className="h-fit">
							<CarouselStock dataFetch={products} />
						</div>
					</div>
				</div>

				<div className="col-span-4 rounded-lg border border-zinc-300">
                    <SiderContent/>
                </div>
		</div>

	);
};

export default page;
