"use client";

import { Carousel, Image, Spin } from "antd";
import { BidCard } from "#/components/common/card/BidCard";
import { useBid } from "#/hooks/bid";
import React from "react";
import Link from "next/link";
import { config } from "#/config/app";

const contentStyle: React.CSSProperties = {
	margin: 0,
	height: "350px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

const banner = [
	{ id: 1, image: "/image/banner-1.png" },
	{ id: 2, image: "/image/banner-2.png" },
	{ id: 3, image: "/image/banner-3.png" },
];

const Bid = () => {
	const { fetchBids } = useBid();
	const { bids, isError, isLoading } = fetchBids();

	if (isLoading) return (
		<div className="w-screen h-[86vh] flex items-center justify-center">
			<Spin size="large" />
		</div>
	);

	return (
		<div className="py-20 px-24 2xl:px-0 max-w-7xl mx-auto">
			<nav className="mb-11">
				<Carousel autoplay>
					{banner.map((banner) => (
						<div key={banner.id}>
							<h3 style={contentStyle}>
								<Image
									src={banner.image}
									alt={`banner-${banner.id}`}
									height={"100%"}
									width={"100%"}
									preview={false}
									className="w-full object-cover object-center"
								/>
							</h3>
						</div>
					))}
				</Carousel>
			</nav>
			<section className="space-y-11">
				<header className="flex justify-between items-end pb-6 border-b border-zinc-200">
					<h1 className="text-3xl font-semibold tracking-tight">Our Auction</h1>
					{/* <p className="text-sm text-zinc-400">All</p> */}
				</header>
				<main className="grid grid-cols-5 gap-4">
					{bids &&
						bids.map((bid) => (
							<Link href={`/product/bid/${bid.id}`} key={bid.id}>
								<BidCard
									key={bid.id}
									bid={bid}
									imageUrl={bid.productPhotos}
									product={bid.productDetail.product}
								/>
							</Link>
						))}
				</main>
			</section>
		</div>
	);
};

export default Bid;
