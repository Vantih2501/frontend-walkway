"use client";
import { useAuth } from "#/hooks/auth";
import { setTokens } from "#/utils/token";
import { Form, Input, Button, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define an interface for the form values
interface LoginFormValues {
  email: string;
  password: string;
}

const inputStyle = "h-11 rounded-lg 2xl:h-14";

const LoginForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await login(values.email, values.password);
      setTokens(response.access_token);
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
        name="email"
        label="Email Address"
        rules={[
          { type: "email", message: "Please enter a valid email address." },
        ]}
        initialValue="gandara@example.com"
      >
        <Input placeholder="Email Address" className={inputStyle} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        className="m-0 2xl:text-lg"
        initialValue="superadmin"
      >
        <Input.Password placeholder="Password" className={inputStyle} />
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
          Sign In
        </Button>
      </Form.Item>

      <div className="flex items-center justify-center gap-2 mt-6 text-sm">
        <p className="text-zinc-500">Don`t have an account?</p>
        <Link className="font-medium hover:opacity-70" href={"/register"}>
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
