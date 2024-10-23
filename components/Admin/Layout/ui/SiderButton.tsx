"use client";
import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface SideButtonProps {
	title: string;
	href: string;
	IconDefault: IconType;
	IconHover: IconType;
}

const SideButton = ({
	title,
	href,
	IconDefault,
	IconHover,
}: SideButtonProps) => {
	const pathName = usePathname();
	const isActive = pathName === href;
	return (
		<li>
			<Link
				href={href}
				className={`group flex items-center rounded-xl px-5 py-4 transition duration-75 ${
					isActive
						? "bg-[#4E7772] text-white"
						: "text-gray-800 hover:bg-zinc-100"
				}`}
			>
				{isActive ? (
					<IconHover className="h-5 w-5 text-white transition duration-75" />
				) : (
					<IconDefault className="h-5 w-5 text-zinc-800 transition duration-75 group-hover:block group-hover:text-zinc-800" />
				)}

				<span className="ms-4 text-sm">{title}</span>
			</Link>
		</li>
	);
};

export default SideButton;
