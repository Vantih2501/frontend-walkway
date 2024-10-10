"use client";

import React, { useRef } from "react";
import ProductCard from "#/components/Card";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Button } from "antd";

interface carouselUiProps {
	dataFetch: Array<{
		id: string;
		name: string;
		price: string;
		image: string;
	}>;
	variant: "default" | "bid"
}

const CarouselUi = ({ dataFetch, variant= "bid" }: carouselUiProps) => {
	const carouselRef = useRef<any>(null);

	const handleNext = () => {
		carouselRef.current.next();
	};

	const handlePrev = () => {
		carouselRef.current.prev();
	};

	return (
		<div className="relative">
			<Button
				type="primary"
				shape="circle"
				icon={<LeftOutlined />}
				onClick={handlePrev}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"
			/>
			<Carousel
				ref={carouselRef}
				dots={false}
				slidesToShow={4}
				responsive={[
					{ breakpoint: 2560, settings: { slidesToShow: 5 } },
					{ breakpoint: 1440, settings: { slidesToShow: 4 } },
					{ breakpoint: 1024, settings: { slidesToShow: 3 } },
					{ breakpoint: 768, settings: { slidesToShow: 2 } },
					{ breakpoint: 480, settings: { slidesToShow: 1 } },
				]}
			>
				{dataFetch.map((product) => (
					<div key={product.id} className="pr-4">
						<ProductCard
							price={`${product.price}`}
							productName={`${product.name}`}
							imageUrl={`${product.image}`}
							variant={variant}
						/>
					</div>
				))}
			</Carousel>
			<Button
				type="primary"
				shape="circle"
				icon={<RightOutlined />}
				onClick={handleNext}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10"
			/>
		</div>
	);
};

export default CarouselUi;
