import React from "react";
import { Button } from "antd";
import AnimatedNumberUi from "./ui/AnimatedNumber";
import Image from "next/image";

const HeroSection = () => {
	return (
		<div className="w-full p-24">
			<div className="grid grid-cols-12 gap-14">
				<div className="col-span-5 space-y-7 my-auto xl:space-y-9">
					<h1 className="montserrat.className font-bold tracking-tight text-[50px] leading-[68px] 2xl:text-[80px] 2xl:leading-[105px]">
						Explore The Latest in Sneaker Styles
					</h1>
					<p className="text-base text-gray-500 leading-7 2xl:text-xl 2xl:leading-9">
						from timeless classics to modern designs. Find your perfect pair and
						step up your look today!
					</p>
					<Button
						type="primary"
						className="bg-primary font-poppins rounded-full h-14 px-14 text-base font-medium"
					>
						Shop Now
					</Button>
					<AnimatedNumberUi />
				</div>
				<div className="relative flex justify-center items-center col-span-7">
					<Image
						src={"/image/hero-image.png"}
						alt="..."
						width={1000}
						height={655}
						layout="intrinsic"
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
