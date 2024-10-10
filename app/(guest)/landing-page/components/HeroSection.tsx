import React from "react";
import { Button } from "antd";
import AnimatedNumberUi from "./ui/AnimatedNumber";
import Image from "next/image";

const HeroSection = () => {
	return (
		<div className="w-full p-28">
			<div className="grid grid-cols-12 gap-14">
				<div className="col-span-5 space-y-7 my-auto">
					<h1 className="font-montserrat font-bold text-6xl leading-[68px]">
						Explore the latest in sneaker styles
					</h1>
					<p className="text-base text-gray-500 leading-7">
						from timeless classics to modern designs. Find your perfect pair and
						step up your look today!
					</p>
					<Button
						type="primary"
						className="rounded-full h-14 px-14 text-base font-medium"
					>
						Shop Now
					</Button>
					<AnimatedNumberUi />
				</div>
				<div className="relative flex justify-center items-center col-span-7">
					<Image
						src={"/hero-image.png"}
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
