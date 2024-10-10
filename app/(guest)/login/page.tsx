"use client";

import { Col, Divider, Form, Input, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { HiMiniChevronLeft } from "react-icons/hi2";

const Login = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div className="w-1/2 h-full bg-red-200 relative">
				{/* Image z-0 */}
				<div className="absolute h-full w-full z-0">
					<Image
						src={"/card-image.png"}
						alt={"Login Background"}
						fill
						className="object-cover"
					/>
				</div>
				{/* Gradient color z-1 */}
				<div
					className="absolute z-10 h-full w-full p-14 flex flex-col justify-between
                bg-gradient-to-t from-zinc-900/75 from-20% via-transparent via-30% to-zinc-900 to-100%"
				>
					<Image
						src={"/walkway-logo.svg"}
						alt="walkway logo"
						width={160}
						height={40}
					/>
					<div className="h-auto">
						<p className="text-xl text-white/90 font-medium leading-8 mb-6">
							"Shoes are an important part of your look. I think if your outfit
							isn't anything special then fun footwear is a great way to jazz it
							up and make after your outfit more interesting."
						</p>
						<p className="text-xl text-white/80 font-medium">
							- Christian Siriano
						</p>
					</div>
				</div>
			</div>
			<div className="w-1/2 h-full py-14 px-24">
				<div className="w-full flex justify-between items-center mb-36">
					<Link
						href={"#"}
						className="flex items-center hover:opacity-70 font-medium no-underline text-zinc-900"
					>
						<HiMiniChevronLeft />
						<p className="mb-0">login</p>
					</Link>
					<Link href={"#"} className=" hover:opacity-70">
						Create Account
					</Link>
				</div>
				<div className="w-full">
					<div className="mb-16">
						<h1 className="text-4xl font-medium mb-3 tracking-tight text-zinc-800">
							Welcome Back!
						</h1>
						<p className="mt-2 text-zinc-300">
							Walk with us! Sign in or Sign up to find your perfect shoes.
						</p>
					</div>
					<Form name="layout-multiple-vertical" layout="vertical">
						<Col span={24}>
							{" "}
							{/* Full width */}
							<Form.Item
								label="Email Address"
								name="vertical"
								rules={[
									{ required: true },
									{
										type: "email",
										message: "Please enter a valid email address.",
									},
								]}
							>
								<Input
									className="h-11 rounded-lg"
									placeholder="Enter your email address"
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							{" "}
							{/* Full width */}
							<Form.Item
								label="Password"
								name="horizontal"
								rules={[
									{ required: true },
									{
										min: 8,
										message: "Password must be at least 6 characters!",
									},
								]}
							>
								<Input className="h-11 rounded-lg" placeholder="Password" />
							</Form.Item>
						</Col>
					</Form>
					<Divider className="my-8" />
					<Button
						type="primary"
						size="middle"
						className="w-full h-12 rounded-lg bg-[#4E7772]"
					>
						Sign In
					</Button>
					<div className="flex gap-2 items-center justify-center mt-6 text-sm">
						<p className="text-zinc-500 font-medium text-">
							Don`t have an account ?
						</p>
						<Link className="hover:opacity-70 font-medium" href={"#"}>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
