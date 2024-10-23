"use client";
import { useAuth } from "#/hooks/auth";
import { setTokens } from "#/utils/token";
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
  const { register } = useAuth();
  const router = useRouter();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      const response = await register(
        values.name,
        values.email,
        '+62' + values.phone_number,
        values.password
      );
      setTokens(response.access_token);
    } catch (error) {
			console.error(error);
    } finally {
      router.push("/");
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
        label={"Phone Number"}
        rules={[
          { required: true, message: "Please input your phone number" },
        ]}
        className={formStyle}
      >
        <Input type="number" addonBefore="+62" placeholder="Enter your Phone Number" />
      </Form.Item>

      <Form.Item
        name={"password"}
        label={"Password"}
        rules={[{ required: true, message: "Please input your password!" }]}
        className="m-0 2xl:text-lg"
      >
        <div className="flex gap-2">
          <Input.Password placeholder="Password" className={inputStyle} />
          <Input.Password
            placeholder="Re-enter Your Password"
            className={inputStyle}
          />
        </div>
      </Form.Item>

      <Divider className="my-6 2xl:my-7" />

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={"h-11 rounded-lg 2xl:h-16"}
          loading={isloading}
        >
          Sign Up
        </Button>
      </Form.Item>

      <div className="flex items-center justify-center gap-2 mt-6 text-sm">
        <p className="text-zinc-500 text-">Already have an account?</p>
        <Link className="font-medium hover:opacity-70" href={"/login"}>
          Sign In
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
