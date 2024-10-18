"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// import Logo from '@/public/walkway-logo.svg'
import SideButton from "./ui/SiderButton";

// import {
// 	Bid,
// 	BidOutline,
// 	Product,
// 	ProductOutline,
// } from "@/components/svg/page";

import {
	HiOutlineSquares2X2,
	HiSquares2X2,
	HiOutlineUser,
	HiUser,
	HiOutlineTag,
	HiTag,
	HiOutlineShoppingBag,
	HiShoppingBag,
	HiArrowLeftOnRectangle,
} from "react-icons/hi2";

const Sidebar = () => {
	return (
		<div>
			<aside id="logo-sidebar" className="h-screen w-64" aria-label="Sidebar">
				<div className="flex h-full flex-col bg-zinc-50 px-6 py-8">
					<Link href="/walkway/test" className="mb-10 flex items-center ps-2.5">
						<Image
							width={500}
							height={100}
							src="/icons/logo.svg"
							className="w-full px-3 pb-8"
							alt="Walkway Logo"
						/>
					</Link>
					<ul className="space-y-2">
						<SideButton
							title="Dashboard"
							IconDefault={HiOutlineSquares2X2}
							IconHover={HiSquares2X2}
							href="/dashboard"
						/>
						<SideButton
							title="Profile"
							IconDefault={HiOutlineUser}
							IconHover={HiUser}
							href="/profile"
						/>
						{/* <SideButton
							title="Product"
							IconDefault={ProductOutline}
							IconHover={Product}
							href="/product"
						/> */}
						<SideButton
							title="Category & Brand"
							IconDefault={HiOutlineTag}
							IconHover={HiTag}
							href="/category-brand"
						/>
						{/* <SideButton
							title="Bid"
							IconDefault={BidOutline}
							IconHover={Bid}
							href="/bid"
						/> */}
						<SideButton
							title="Orders"
							IconDefault={HiOutlineShoppingBag}
							IconHover={HiShoppingBag}
							href="/orders"
						/>
					</ul>
					{/* Siderbar bagian bawah */}
					<ul className="mt-auto w-full pt-8 border-t">
						<SideButton
							title="Logout"
							IconDefault={HiArrowLeftOnRectangle}
							IconHover={HiArrowLeftOnRectangle}
							href="#"
						/>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
