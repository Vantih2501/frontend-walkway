// import { products } from "#/mock-data/products";
import { Avatar } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { HiMiniChevronRight } from "react-icons/hi2";

const SiderContent = ({orders}: any) => {
	return (
		<div className="p-4 2xl:p-5 flex flex-col space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="text-base 2xl:text-xl font-medium">New Order</h1>
				<Link href={"/"} className="flex items-center hover:opacity-75">
					<p className="text-[10px] 2xl:text-xs">See Orders</p>
					<HiMiniChevronRight />
				</Link>
			</div>
			<div className="overflow-y-auto">
				<ul role="list" className="space-y-2">
					{orders.map((order: Product) => (
						<li key={order.id} className="p-3 bg-zinc-50 rounded-md">
							<div className="flex items-center">
								<div className="size-16 aspect-square bg-white rounded-md">
									<Avatar
										className="size-full"
										src={order.frontImage}
										shape="square"
									/>
								</div>
								<div className="w-full flex gap-3 2xl:gap-5">
									<div className="flex-1 min-w-0 ms-4">
										<p className="text-[10px] 2xl:text-xs font-medium text-gray-800 line-clamp-2 mb-1">
											{order.name}
										</p>
										<p className="text-[10px] text-gray-400 truncate">
											{dayjs(order.createdAt).format("mm")} Minutes Ago
										</p>
									</div>
									<div className="h-full text-[10px] 2xl:text-xs font-medium text-primary">
										+Rp. {order.price}
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SiderContent;
