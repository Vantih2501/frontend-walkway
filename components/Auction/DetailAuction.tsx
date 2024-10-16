"use client";

import React, { useState } from "react";
import ProductImage from "./ui/ProductImage";
import { Breadcrumb, Button, Flex, Form, Input, Modal, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import BidUserDisplay from "./ui/BidUserDisplay";

const sizes = [
	4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14,
];

const AuctionDetail = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="py-16 px-52 2xl:px-72">
			<div className="grid grid-cols-12 gap-8">
				<div className="col-span-5">
					<ProductImage />
				</div>
				<div className="col-span-7 flex flex-col space-y-7">
					<div className="flex flex-col space-y-4">
						<Breadcrumb
							items={[
								{
									title: <a href="">New Balance</a>,
								},
								{
									title: "New Balance 1906R Silver Metallic Sea Salt",
								},
							]}
						/>
						<h1 className="pb-5 border-b text-4xl font-semibold 2xl:text-5xl 2xl:leading-[60px]">
							New Balance 1906R Silver Metallic Sea Salt
						</h1>
					</div>
					<div className="space-y-4">
						<div>
							<p className="text-zinc-400 text-sm mb-1">Current Highest Bid:</p>
							<h1 className="text-2xl font-medium">Rp 2,500,000</h1>
						</div>

						<BidUserDisplay />

						<div className="flex justify-between items-center pb-3 border-b border-zinc-300">
							<div className="flex items-center gap-2">
								<h1 className="text-xl font-semibold">12</h1>
								<p>Shoe size</p>
							</div>
							<Button icon={<EyeOutlined />} type="text" onClick={showModal}>
								Size Guide
							</Button>
							<Modal
								title={"SIZE GUIDE"}
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								footer={null}
							>
								<div className="rounded-xl border border-zinc-300 mt-4">
									<div className="p-5 font-semibold text-sm border-b border-zinc-300">
										Adidas Men`s
									</div>
									<div className="overflow-y-auto h-[500px] ">
										<Image
											src={"/image/size-guide.png"}
											alt={"size guize"}
											width={500}
											height={1000}
											quality={100}
											className="w-full h-auto"
										/>
									</div>
								</div>
							</Modal>
						</div>
					</div>
					<Form>
						<div className="flex items-center justify-between gap-4 h-fit">
							<Form.Item className="mb-0">
								<div className="py-2 px-4 w-fit bg-zinc-100 my-auto rounded-xl">
									<p className="text-xs text-zinc-600">Your bid</p>
									<h1 className="truncate text-base font-medium">Rp. 1,500,000</h1>
								</div>
							</Form.Item>
							<Form.Item className="w-full mb-0">
								<Input
									className="rounded-xl h-14"
									placeholder="Post your bid"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item className="mb-0">
								<Button className="h-14 rounded-xl" block type="primary">
									Bid Now
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default AuctionDetail;
