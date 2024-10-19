import { Button } from "antd";
import React from "react";
import Image from "next/image";
import AddForm from "./ui/AddForm";

const BidSider = () => {
	return (
		<div className="h-screen border border-zinc-300 rounded-2xl p-4 space-y-5">
			<header>
				<h1 className="text-xl font-medium">Add Bid</h1>
			</header>
			<main className=" h-full flex flex-col gap-4">
				<div className="flex gap-3">
					<Button
						style={{ borderRadius: "30px", height: "42px" }}
						block
						type={"primary"}
					>
						Descriptions
					</Button>
					<Button
						style={{ borderRadius: "30px", height: "42px" }}
						block
						type={"text"}
					>
						Participants
					</Button>
				</div>
				<div className="bg-zinc-50 rounded-md overflow-hidden mb-3">
					<Image
						src={"/mock/shoe-mock-1.png"}
						alt={"..."}
						width={300}
						height={100}
						layout="intrinsic"
						className="aspect-[16/12] object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 mx-auto"
					/>
				</div>
        <AddForm/>
			</main>
			<footer>
				<div className="flex gap-3">
					<Button
						style={{ borderRadius: "8px", height: "42px" }}
						block
						type={"primary"}
					>
						Discard
					</Button>
					<Button
						style={{ borderRadius: "8px", height: "42px" }}
						block
						type={"text"}
					>
						Save Changes
					</Button>
				</div>
			</footer>
		</div>
	);
};

export default BidSider;
