"use client"

import { Button, Carousel } from "antd";
import React, { useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import StockCard from "./ui/StockCard";

interface CarouselStockProps {
	dataFetch: Array<{
		id: string;
		name: string;
		image: string;
        stock: string;
	}>;
}

const CarouselStock = ({dataFetch} : CarouselStockProps) => {
	const carouselRef = useRef<any>(null);

	const handleNext = () => {
		carouselRef.current.next();
	};

	const handlePrev = () => {
		carouselRef.current.prev();
	};

	return (
		<div className="relative h-fit">
			<Button
				style={{ boxShadow: "0px 10px 20px 0px rgba(78, 119, 114, 0.4)" }}
				type="primary"
				shape="circle"
				icon={<HiArrowLeft className="flex items-center justify-center" />}
				onClick={handlePrev}
				className="absolute bg-primary top-1/2 left-4 transform -translate-y-1/2 z-20"
			/>
			<Carousel
				className="space-x-4"
				ref={carouselRef}
				dots={false}
				slidesToShow={3}
				responsive={[
					{ breakpoint: 1440, settings: { slidesToShow: 3 } },
					{ breakpoint: 1280, settings: { slidesToShow: 2 } },
					{ breakpoint: 768, settings: { slidesToShow: 1 } },
				]}
			>
				{dataFetch.map((product) => (
					<div key={product.id} className="">
						<StockCard
							name={product.name}
							stock={product.stock}
							image={product.image}
						/>
					</div>
				))}
			</Carousel>
			<Button
				style={{ boxShadow: "0px 10px 20px 0px rgba(78, 119, 114, 0.4)" }}
				type="primary"
				shape="circle"
				icon={<HiArrowRight className="flex items-center justify-center" />}
				onClick={handleNext}
				className="absolute bg-primary top-1/2 right-4 transform -translate-y-1/2 z-20"
			/>
		</div>
	);
};

export default CarouselStock;
