"use client";

import React from "react";
import {
	FacebookOutlined,
	InstagramOutlined,
	TwitterOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-primary-400 py-[90px]">
			<div className="relative w-full px-28">
				<div className="grid grid-cols-12 gap-5">
					<div className="col-span-3">
						<Image
							src={"/icons/logo.svg"}
							alt={"..."}
							width={230}
							height={58}
						/>
						<p className="mt-7 w-[240px] text-sm leading-6 text-primary-100">
							Explore the latest in sneaker styles, from timeless classics to
							modern designs. Find your perfect pair and step up your look
							today!
						</p>
					</div>
					<div className="col-span-9 flex gap-16">
						<div className="flex w-24 flex-col justify-between">
							<p className="text-base text-white">Kategori</p>
							<ul className="text-zinc-300 space-y-3">
								<li>
									<Link className="text-primary-100 hover:text-white" href={"#"}>Brands</Link>
								</li>
								<li>
									<Link className="text-primary-100 hover:text-white" href={"#"}>Sneakers</Link>
								</li>
								<li>
									<Link className="text-primary-100 hover:text-white" href={"#"}>Auction</Link>
								</li>
								<li>
									<Link className="text-primary-100 hover:text-white" href={"#"}>Hosttest</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="mb-7 text-base text-white">Social Media</p>
							<div className="flex gap-4 text-zinc-300">
								<Link href={"#"}>
									<TwitterOutlined />
								</Link>
								<Link href={"#"}>
									<InstagramOutlined />
								</Link>
								<Link href={"#"}>
									<FacebookOutlined />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Image
				className="absolute right-0 top-0 z-0"
				src={"/shoess.png"}
				alt="..."
				width={542}
				height={100}
			/>
		</footer>
	);
}
