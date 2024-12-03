import Countdown, { CountdownProps } from "antd/es/statistic/Countdown";
import React from "react";

const BidCountDown = () => {
	const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

	const onFinish: CountdownProps["onFinish"] = () => {
		console.log("finished!");
	};

	return (
		<div className="absolute w-full top-0 py-4 bg-primary flex justify-center items-center z-10 2xl:py-6">
			<Countdown
				valueStyle={{
					color: "#ffffff",
					fontSize: "20px",
					letterSpacing: ".1em",
                    fontWeight: "500"
				}}
				value={deadline}
				onFinish={onFinish}
				format="HH  :  mm  :  ss"
			/>
		</div>
	);
};

export default BidCountDown;
