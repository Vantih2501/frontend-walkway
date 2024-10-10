import Image from "next/image";
import Link from "next/link";
import React from "react";
import CarouselUi from "./ui/Carousel";

// Nanti Ganti dengan Fetch API
const products = [
	{
		id: "1",
		name: "Adidas Samba OG Cloud White Wonder Quartz (W)",
		price: "1,500,000",
		image: "/image/nike-image.png", // Ganti dengan path gambar produk
	},
	{
		id: "2",
		name: "Adidas Samba OG Cloud White Wonder Quartz (W)",
		price: "2,000,000",
		image: "/image/nike-image.png",
	},
	{
		id: "3",
		name: "Adidas Samba OG Cloud White Wonder Quartz (W)",
		price: "3,200,000",
		image: "/image/nike-image.png",
	},
	{
		id: "4",
		name: "Adidas Samba OG Cloud White Wonder Quartz (W)",
		price: "1,300,000",
		image: "/image/nike-image.png",
	},
	{
		id: "5",
		name: "Adidas Samba OG Cloud White Wonder Quartz (W)",
		price: "500,000",
		image: "/image/nike-image.png",
	},
];

const ProductDisplay = () => {
	return (
		<div className="p-28 bg-primary-100 flex items-center">
			<div className="w-full space-y-8">
				<div className="flex justify-between items-center">
					<div className="flex gap-4 items-center">
						<Image
							src="/icons/fire-icon.svg"
							alt="fire icon"
							width={27}
							height={32}
						/>
						<h1 className="font-montserrat text-3xl font-bold">
							HOTTEST SNEAKER
						</h1>
					</div>
					<Link href={"#"} className="font-medium font-montserrat">
						VIEW ALL
					</Link>
				</div>
				<CarouselUi dataFetch={products} variant={"default"}/>
			</div>
		</div>
	);
};

export default ProductDisplay;