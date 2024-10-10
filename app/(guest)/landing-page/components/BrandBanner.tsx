import React from "react";
import Image from "next/image";

const brandLogo = [
  { src: "/icons/newbalance.svg", alt: "New Balance Logo", width: 105, height: 50, class: '' },
  { src: "/icons/adidas.svg", alt: "Adidas Logo", width: 74, height: 50, class: '' },
  { src: "/icons/puma.svg", alt: "Puma Logo", width: 100, height: 50, class: 'hidden xl:block' },
  { src: "/icons/nike.svg", alt: "Nike Logo", width: 96, height: 50, class: '' },
  { src: "/icons/reebok.svg", alt: "Rebook Logo", width: 107, height: 50, class: 'hidden xl:block' },
  { src: "/icons/vans.svg", alt: "Vans Logo", width: 75, height: 50, class: '' },
];

const BrandBanner = () => {
	return (
		<div className="w-full bg-primary-400 px-28 py-9 xl:py-10">
			<div className="w-full flex flex-wrap gap-x-44 gap-y-9 items-center justify-center">
				{brandLogo.map((logo, index) => (
				<Image
					key={index}
					src={logo.src}
					alt={logo.alt}
					width={logo.width}
					height={logo.height}
					layout="intrinsic"
					className={logo.class}
				/>
				))}
			</div>
		</div>
	);
};

export default BrandBanner;
