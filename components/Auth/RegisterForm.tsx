import { Button, Divider, Form, Input } from "antd";
import Link from "next/link";
import React from "react";

const inputStyle = "h-10 rounded-lg 2xl:h-14";
const formStyle = "mb-4 2xl:mb-6";

const RegisterForm = () => {
  return (
    <Form layout="vertical">
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
        name={"phoneNumber"}
        label={"Phone Number"}
        rules={[
            { required: true, message: "Please input your phone number" },
            { type: "number", message: "Please enter a valid phone number" },
        ]}
        className={formStyle}
      >
        <Input placeholder="Enter your Phone Number" className={inputStyle} />
      </Form.Item>

      <Form.Item
        name={"password"}
        label={"Password"}
        rules={[{ required: true, message: "Please input your password!" }]}
        className="m-0 2xl:text-lg"
      >
        <Input.Password placeholder="Password" className={inputStyle} />
      </Form.Item>

      <Divider className="my-6 2xl:my-7" />

      <Form.Item>
        <Button block type="primary" className={"h-11 rounded-lg 2xl:h-16"}>
          Sign Up
        </Button>
      </Form.Item>

      <div className="flex gap-2 items-center justify-center mt-6 text-sm">
        <p className="text-zinc-500 font-medium text-">
          Already have an account?
        </p>
        <Link className="hover:opacity-70 font-medium" href={"/login"}>
          Sign In
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
