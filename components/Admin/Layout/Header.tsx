import React from "react";
import { Avatar } from "antd";

const Header = () => {
	return (
		<header>
			<div className="flex items-end justify-between pb-6 border-b 2xl:pb-8">
				<div>
					<h1 className="mb-1 text-2xl font-medium tracking-tight">
						Dashboard
					</h1>
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
