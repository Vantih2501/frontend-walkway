"use client"
import { AuthService } from "#/services/auth";
import { Button, Divider, Form, Input, Space } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterFormValues {
	name: string;
	email: string;
	phone_number: string;
	password: string;
}

const inputStyle = "h-10 rounded-lg 2xl:h-14";
const formStyle = "mb-4 2xl:mb-6";

const RegisterForm = () => {

	const [isloading, setIsLoading] = useState(false);

	const router = useRouter()

	const onFinish = async (values: RegisterFormValues) => {
		try {
			setIsLoading(true);
			const response = await AuthService.hooks.useRegister(
				values.name,
				values.email,
				values.phone_number,
				values.password
			);
			Cookies.set("access_token", response.access_token, { expires: 1 });
			// Cookies.set("refresh_token", refresh_token, { expires: 7 });
			router.push("/");
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form layout="vertical" onFinish={onFinish}>
			<Form.Item
				name={"name"}
				label={"Name"}
				rules={[{ required: true, message: "Please input your name" }]}
				className={formStyle}
			>
				<Input placeholder="Full Name" className={inputStyle} />
			</Form.Item>

			<Form.Item
				name={"email"}
				label={"Email Address"}
				rules={[
					{ required: true, message: "Please input your email" },
					{ type: "email", message: "Please enter a valid email address" },
				]}
				className={formStyle}
			>
				<Input placeholder="Email Address" className={inputStyle} />
			</Form.Item>

			<Form.Item
				name={"phone_number"}
				label={"phone_number"}
				rules={[
					{ required: true, message: "Please input your phone number" },
					// { type: "number", message: "Please enter a valid phone number" },
				]}
				className={formStyle}
			>
				<Input placeholder="Enter your Phone Number" className={inputStyle} />
			</Form.Item>

			<Form.Item
				name={"password"}
				label={"password"}
				rules={[{ required: true, message: "Please input your password!" }]}
				className="m-0 2xl:text-lg"
			>
				<div className="flex gap-4">
					<Input.Password placeholder="Password" className={inputStyle} />
					<Input.Password placeholder="Re Enter Your Password" className={inputStyle} />
				</div>
			</Form.Item>

			<Divider className="my-6 2xl:my-7" />

			<Form.Item>
				<Button block type="primary" htmlType="submit" className={"h-11 rounded-lg 2xl:h-16"} loading={isloading}>
					Sign Up
				</Button>
			</Form.Item>

			<div className="flex gap-2 items-center justify-center mt-6 text-sm">
				<p className="text-zinc-500 text-">Already have an account?</p>
				<Link className="hover:opacity-70 font-medium" href={"/login"}>
					Sign In
				</Link>
			</div>
		</Form>
	);
};

export default RegisterForm;
