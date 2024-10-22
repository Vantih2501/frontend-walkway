import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Avatar } from "antd";

const ProfileContainer = () => {
  return (
		<div className="flex gap-3 items-center">
			<HiOutlineShoppingBag size={32} />
			<Link href="/profile">
				<Avatar src={"/image/farel-widianto.jpg"} />
			</Link>
		</div>
	);
};

export default ProfileContainer;
