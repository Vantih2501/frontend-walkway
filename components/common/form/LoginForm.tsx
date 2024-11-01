"use client";
import { useAuth } from "#/hooks/auth";
import { setAccessToken } from "#/utils/token";
import { Form, Input, Button, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await login(values.email, values.password);
      setAccessToken(response.access_token);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="w-full">
      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email address.",
            required: true,
          },
        ]}
      >
        <Input placeholder="Email Address" className="py-2 rounded-lg" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        className="m-0 2xl:text-lg"
      >
        <Input.Password placeholder="Password" className="py-2 rounded-lg" />
      </Form.Item>

      <Divider className="my-6" />

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="py-5 rounded-lg"
          loading={isloading}
        >
          Sign In
        </Button>
      </Form.Item>

      <div className="flex items-center justify-center gap-2 mt-6 text-sm">
        <p className="text-zinc-500">Don`t have an account?</p>
        <Link className="font-medium hover:opacity-70" href="/register">
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
