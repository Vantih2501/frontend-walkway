"use client";

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Menu, theme, Input, message } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignContainer from "./ui/SignContainer";
import ProfileContainer from "./ui/ProfileContainer";

export default function Navbar() {
	const router = useRouter();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const menu = [
		{
			key: "Sneakers",
			label: <Link href="/">Sneakers</Link>,
		},
		{
			key: "Casual",
			label: <Link href="/">Casual</Link>,
		},
		{
			key: "Sport",
			label: <Link href="/">Sport</Link>,
		},
		{
			key: "Auction",
			label: <Link href="/">Auction</Link>,
		},
	];

	const [value, setValue] = useState("");

	const onSearch = (value: string) => {
		message.info(`Searching for: ${value}`);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className="px-24 py-7 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
			<div className="flex gap-5 justify-between items-center mb-2">
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={142}
					height={36}
					className="h-9 2xl:h-16"
				/>

				<Input
					style={{ width: "100%", borderRadius: "50px" }}
					placeholder="Search for sneakers"
					prefix={<SearchOutlined className="navbar-search" />}
					variant="filled"
					onChange={onChange}
					value={value}
					className="h-9 2xl:h-11 2xl:text-base"
				/>

				<ProfileContainer />
			</div>

			<div style={{ display: "flex", justifyContent: "center" }}>
				<Menu mode="horizontal" defaultSelectedKeys={[]} items={menu} />
			</div>
		</div>
	);
}
