import React from "react";
import { Avatar } from "antd";

const Header = () => {
	return (
		<header>
			<div className="flex items-end justify-between border-b pb-6 2xl:pb-8">
				{/* buat h1 satu menjadi otomatis sesuai dengan url */}
				<div>
					<h1 className="text-2xl mb-1 font-medium tracking-tight">
						Dashboard
					</h1>
					<p className="text-sm text-zinc-400">Minggu, 24 Januari 2025</p>
				</div>
				<div className="flex items-center gap-3">
					<Avatar size={43} src="/fotoprof.jpg" />
					<div className="flex flex-col">
						<h2 className="text-base font-medium leading-6">Farel Widianto</h2>
						<p className="text-xs text-zinc-400">example@gmail.com</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
