import { Button } from "antd";
import React from "react";
import Image from "next/image";
import EditForm from "./ui/EditForm";

const EditBidSider = ({ handleDiscard }: {handleDiscard: () => void }) => {
	return (
		<div className="h-full flex flex-col border border-zinc-300 rounded-2xl p-4 space-y-5">
			<header>
				<h1 className="text-xl font-medium">Edit Bid</h1>
			</header>
			<main className=" flex-grow flex flex-col gap-4">
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
				<div className="overflow-y-auto h-[400px] 2xl:overflow-hidden 2xl:h-full">
					<div className="bg-zinc-50 rounded-md overflow-hidden mb-3">
						<Image
							src={"/mock/shoe-mock-1.png"}
							alt={"..."}
							width={300}
							height={100}
							layout="intrinsic"
							className="aspect-[16/11] object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105 mx-auto"
						/>
					</div>
					<EditForm />
				</div>
			</main>
			<footer className="mt-auto">
				<div className="flex justify-between gap-4">
					<Button
						onClick={handleDiscard}
						style={{ borderRadius: "8px", height: "42px" }}
						block
						type={"text"}
					>
						Discard
					</Button>
					<Button
						style={{ borderRadius: "8px", height: "42px" }}
						block
						type={"primary"}
					>
						Save Changes
					</Button>
				</div>
			</footer>
		</div>
	);
};

export default EditBidSider;
