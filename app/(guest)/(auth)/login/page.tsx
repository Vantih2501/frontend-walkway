"use client";

import Link from "next/link";
import { HiMiniChevronLeft } from "react-icons/hi2";
import LoginForm from "#/components/Auth/LoginForm";
import AuthHero from "#/components/Auth/AuthHero";

const Login = () => {
  return (
    <div className="w-screen h-screen flex fixed">
      <div className="w-1/2 h-full bg-red-200 relative">
        <AuthHero />
      </div>
      <div className="w-1/2 h-full py-9 px-20 2xl:py-14 2xl:px-36">
        <div className="w-full flex justify-between items-center">
          <Link
            href={"/landing-page"}
            className="flex items-center hover:opacity-70 no-underline text-zinc-900"
          >
            <HiMiniChevronLeft />
            <p className="mb-0 text-sm 2xl:text-lg">Home</p>
          </Link>
          <Link
            href={"/register"}
            className=" hover:opacity-70 text-sm 2xl:text-lg"
          >
            Create Account
          </Link>
        </div>
        <div className="mt-11 2xl:mt-40">
          <div className="mb-10 2xl:mb-16">
            <h1 className="text-3xl 2xl:text-5xl font-medium mb-3 text-zinc-800">
              Welcome Back!
            </h1>
            <p className="text-sm 2xl:xl text-zinc-500">
              Walk with us! Sign in or Sign up to find your perfect shoes.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
