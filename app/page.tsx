"use client";

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Button, DatePicker, message, Card, Form, Checkbox, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   if(router) {
  //     router.push('/home');
  //   }
  // }, [router]);

  return (
    <div className="container ml-72 mt-24">
    <Card
      className="shadow-lg rounded-lg"
      style={{
        width: "55rem",
        height: "38rem",
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Kolom 1 */}
        <div>
          <img
            src="/card-iamge.png"
            alt="Image 1"
            style={{
              width: "28rem",
              height: "38rem",
              
            }}
          />
          <div className="gradient-image"></div>
          <div className="textW mx-3">
            <img src="/logo.svg" alt="Logo" style={{ width: "100px" }} />
            <div className="text2">
              <p>
                "Shoes are an important part of your look. I think if your
                outfit isn't anything special then fun footwear is a
                great
                way to jazz it up and make after your outfit more
                interesting."
              </p>
              <p>- Christian Siriano.</p>
            </div>
          </div>
        </div>

        {/* Kolom 2 */}
        <div className="mx-8">
          <div className="login"><br />
            <LeftOutlined /> <a href="" style={{ color:'black' }}>Sign In</a>
          </div>
          <h2 className="text-2xl font-bold mt-8">Join With Us</h2>
          <p className="text-gray-600">
            Walk with us! Sign in or Sign up to find your perfect shoes.
          </p>
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: 650 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <label htmlFor="">Name</label>
              <Input placeholder="Enter Your Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <label htmlFor="">Email Address</label>
              <Input placeholder="Enter Your Email" />
            </Form.Item>

            <Form.Item
              name="No_telf"
              rules={[{ required: true, message: "Please input your Number!" }]}
            >
              <label htmlFor="">Phone Number</label>
              <Input placeholder="Enter Your Phone Number" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <label htmlFor="">Password</label>
                <Input.Password placeholder="Enter Your Password" />
              </Form.Item>
              <Form.Item
                name="repassword"
                rules={[{ required: true, message: "Please input your Re Enter Password!" }]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input.Password className="mt-5" placeholder="Re Enter Your Password" />
              </Form.Item>
            </Form.Item>

            <Form.Item >
              <Button block style={{ backgroundColor:'#166534', color:'white' }} htmlType="submit" >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
         <div style={{ display:"inline-flex", marginLeft:'70px' }}> <p style={{ color:'#71717a' }}>Don`t have an account ?</p> <p className="mx-1"> <a href="" style={{ color:'black' }}>Sign In</a> </p></div>
        </div>
      </div>
    </Card>
    </div>
  );
}
