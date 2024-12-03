import React from "react";
import { Button } from "antd";
import AnimatedNumberUi from "./ui/AnimatedNumber";
import Image from "next/image";
import hero from "../../public/image/hero-image.png"

const HeroSection = () => {
  return (
    <div className="h-[86vh] max-w-7xl mx-auto px-6 flex items-center">
      <div className="grid grid-cols-12 gap-14">
        <div className="col-span-5 space-y-6">
          <h1 className="montserrat.className font-bold tracking-tight text-6xl">
            Explore The Latest in Sneaker Styles
          </h1>
          <p className="text-base leading-normal text-gray-500 2xl:text-lg">
            from timeless classics to modern designs. Find your perfect pair and
            step up your look today!
          </p>
          <Button
            type="primary"
            className="px-12 py-6 text-base font-medium tracking-wide rounded-full 2xl:text-lg trackin bg-primary font-poppins 2xl:px-14"
          >
            Shop Now
          </Button>
          <AnimatedNumberUi />
        </div>
        <div className="relative flex items-center col-span-7">
          <Image
            src={hero}
            alt="hero img"
            // layout="intrinsic"
						className="w-full"
          />
        </div>
      </div>
    </div>
    // <div className="w-full px-24 py-16">
    // 	{/* <div className="grid grid-cols-12 gap-14">
    // 		<div className="col-span-5 my-auto space-y-7 xl:space-y-9">
    // 			<h1 className="montserrat.className font-bold tracking-tight text-[50px] leading-[68px] 2xl:text-[80px] 2xl:leading-[105px]">
    // 				Explore The Latest in Sneaker Styles
    // 			</h1>
    // 			<p className="text-base leading-7 text-gray-500 2xl:text-xl 2xl:leading-9">
    // 				from timeless classics to modern designs. Find your perfect pair and
    // 				step up your look today!
    // 			</p>
    // 			<Button
    // 				type="primary"
    // 				className="text-base font-medium rounded-full bg-primary font-poppins h-14 px-14"
    // 			>
    // 				Shop Now
    // 			</Button>
    // 			<AnimatedNumberUi />
    // 		</div>
    // 		<div className="relative flex items-center justify-center col-span-7">
    // 			<Image
    // 				src={"/image/hero-image.png"}
    // 				alt="..."
    // 				width={1000}
    // 				height={655}
    // 				layout="intrinsic"
    // 			/>
    // 		</div>
    // 	</div> */}
    // </div>
  );
};

export default HeroSection;
