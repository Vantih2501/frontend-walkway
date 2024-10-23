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
    <div className="fixed flex w-full h-full">
      <div className="relative hidden w-1/2 h-full bg-red-200 xl:block">
        <AuthHero />
      </div>
      <div className="w-full h-full px-20 overflow-y-auto xl:w-1/2 py-9 2xl:py-14 2xl:px-36">
        <div>
          <Link
            href={"/login"}
            className="flex items-center text-sm no-underline hover:opacity-70 2xl:text-lg text-zinc-900"
          >
            <HiMiniChevronLeft />
            <p className="mb-0">Sign In</p>
          </Link>
        </div>
        <div className="mt-11 2xl:mt-28">
          <div className="mb-10 2xl:mb-16">
            <h1 className="mb-2 text-3xl font-medium 2xl:text-5xl text-zinc-800">
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
