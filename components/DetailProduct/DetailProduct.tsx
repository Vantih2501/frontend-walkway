"use client"

import React, { useState } from "react";
import ProductImage from "./ui/ProductImage";
import { Breadcrumb, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";

const sizes = [
	4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14,
];

const DetailProduct = () => {
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
				<div className="col-span-7 flex flex-col space-y-8">
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
					<div>
						<div className="flex justify-between items-center mb-4">
							<p>Select Size</p>
							<Button icon={<EyeOutlined />} type="text" onClick={showModal}>
								Size Guide
							</Button>
							<Modal
								title={"SIZE GUIDE"}
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
							>
								<div className="rounded-xl border border-zinc-300 mt-4">
									<div className="p-5 font-semibold text-sm border-b border-zinc-300">
										Adidas Men`s
									</div>
									<div className="overflow-y-auto h-[500px]">
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
						<div className="grid grid-cols-4 gap-3 mb-6 2xl:grid-cols-5">
							{sizes.map((size, index) => (
								<Button
									key={index}
									className="py-5 text-sm rounded-full border border-zinc-300"
								>
									{size}
								</Button>
							))}
						</div>
						<div>
							<p className="text-zinc-500">Available For:</p>
							<h1 className="text-2xl font-medium">Rp 2,500,000</h1>
						</div>
					</div>
					<div className="flex gap-4">
						<Button className="h-14 rounded-xl" block>
							Add To Cart
						</Button>
						<Button className="h-14 rounded-xl" block type="primary">
							Checkout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
