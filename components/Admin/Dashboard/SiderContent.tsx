import { Avatar } from "antd";
import Link from "next/link";
import React from "react";
import { HiMiniChevronRight } from "react-icons/hi2";

interface Props {
	orders: Order[]
}

const SiderContent = ({ orders }: Props) => {
	return (
		<div className="flex flex-col p-4 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-base font-medium 2xl:text-xl">New Order</h1>
				<Link href={"/"} className="flex items-center hover:opacity-75">
					<p className="text-[10px] 2xl:text-xs">See Orders</p>
					<HiMiniChevronRight />
				</Link>
			</div>
			<div className="overflow-y-auto">
				<ul role="list" className="space-y-2">
					{/* {products.map((user, index) => (
						<li key={index} className="p-3 rounded-md bg-zinc-50">
							<div className="flex items-center">
								<div className="bg-white rounded-md size-16 aspect-square">
									<Avatar
										className="size-full"
										src={user.image}
										shape="square"
									/>
								</div>
								<div className="flex gap-3 2xl:gap-5">
									<div className="flex-1 min-w-0 ms-4">
										<p className="text-[10px] 2xl:text-xs font-medium text-gray-800 line-clamp-2 mb-1">
											{user.name}
										</p>
										<p className="text-[10px] text-gray-400 truncate">
											{user.time} Minutes Ago
										</p>
									</div>
									<div className="h-full text-[10px] 2xl:text-xs font-medium text-primary">
										+Rp. {user.price}
									</div>
								</div>
							</div>
						</li>
					))} */}
				</ul>
			</div>
		</div>
	);
};

export default SiderContent;
