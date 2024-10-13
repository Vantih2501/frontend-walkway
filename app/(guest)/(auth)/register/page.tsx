"use client";

import { Button, Col, Divider, Flex, Form, Input, message, Row } from "antd";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import AuthHero from "#/components/Auth/AuthHero";
import RegisterForm from "#/components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="w-full h-full flex fixed">
      <div className="w-1/2 bg-red-200 relative h-full">
        <AuthHero />
      </div>
      <div className="w-1/2 h-full py-9 px-20 2xl:py-14 2xl:px-36 overflow-y-auto">
        <div>
          <Link
            href={"/login"}
            className="flex items-center hover:opacity-70 text-sm 2xl:text-lg no-underline text-zinc-900"
          >
            <HiMiniChevronLeft />
            <p className="mb-0">Sign In</p>
          </Link>
        </div>
        <div className="mt-11 2xl:mt-28">
          <div className="mb-10 2xl:mb-16">
            <h1 className="text-3xl 2xl:text-5xl font-medium mb-2 text-zinc-800">
              Join With Us
            </h1>
            <p className="text-sm 2xl:xl text-zinc-500">
              Walk with us! Sign in or Sign up to find your perfect shoes.
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
