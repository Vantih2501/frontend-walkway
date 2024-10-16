import React from "react";
import { Form, Input, Button, Divider } from "antd";
import Link from "next/link";

const inputStyle = "h-11 rounded-lg 2xl:h-14";

const LoginForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item
        name={"email"}
        label={"Email Address"}
        rules={[
          { type: "email", message: "Please enter a valid email address." },
        ]}
      >
        <Input placeholder="Email Address" className={inputStyle} />
      </Form.Item>

      <Form.Item
        name={"password"}
        label={"Password"}
        rules={[{ message: "Please input your password!" }]}
        className="m-0 2xl:text-lg"
      >
        <Input.Password placeholder="Password" className={inputStyle} />
      </Form.Item> 

      <Divider className="my-6 2xl:my-7" />

      <Form.Item>
        <Button block type="primary" className={"h-11 rounded-lg 2xl:h-16"}>
          Sign In
        </Button>
      </Form.Item>

      <div className="flex gap-2 items-center justify-center mt-6 text-sm">
        <p className="text-zinc-500 text-">
          Don`t have an account ?
        </p>
        <Link className="hover:opacity-70 font-medium" href={"/register"}>
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
