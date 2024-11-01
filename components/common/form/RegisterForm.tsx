"use client";
import { useAuth } from "#/hooks/auth";
import { setAccessToken } from "#/utils/token";
import { Button, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterFormValues {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

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
        "+62" + values.phone_number,
        values.password
      );
      setAccessToken(response.access_token);
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
      setIsLoading(false);
    }
  };
  return (
    <Form layout="vertical" onFinish={onFinish} className="w-full">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input your name" }]}
      >
        <Input placeholder="Full Name" className="py-2 rounded-lg" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: "Please input your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="Email Address" className="py-2 rounded-lg" />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number" }]}
      >
        <Input
          type="number"
          addonBefore="+62"
          placeholder="Enter your Phone Number"
          className="phone-input"
        />
      </Form.Item>

      <div className="flex gap-2">
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input.Password placeholder="Password" className="py-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Re-enter Your Password"
            className="py-2 rounded-lg"
          />
        </Form.Item>
      </div>

      <Divider className="my-6 2xl:my-7" />

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="py-5 rounded-lg"
          loading={isloading}
        >
          Sign Up
        </Button>
      </Form.Item>

      <div className="flex items-center justify-center gap-2 mt-6 text-sm">
        <p className="text-zinc-500 text-">Already have an account?</p>
        <Link className="font-medium hover:opacity-70" href="/login">
          Sign In
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
