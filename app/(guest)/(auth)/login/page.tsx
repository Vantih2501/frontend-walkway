"use client";

import Link from "next/link";
import { HiMiniChevronLeft } from "react-icons/hi2";
import LoginForm from "#/components/Auth/LoginForm";
import AuthHero from "#/components/Auth/AuthHero";

const Login = () => {
  return (
    <div className="fixed flex w-screen h-screen">
      <div className="relative hidden w-1/2 h-full bg-red-200 xl:block">
        <AuthHero />
      </div>
      <div className="w-full h-full px-20 xl:w-1/2 py-9 2xl:py-14 2xl:px-36">
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/"}
            className="flex items-center no-underline hover:opacity-70 text-zinc-900"
          >
            <HiMiniChevronLeft />
            <p className="mb-0 text-sm 2xl:text-base">Home</p>
          </Link>
          {/* <Link
            href={"/register"}
            className="text-sm hover:opacity-70 2xl:text-base"
          >
            Create Account
          </Link> */}
        </div>
        <div className="mt-11 2xl:mt-40">
          <div className="mb-10 2xl:mb-16">
            <h1 className="mb-3 text-3xl font-medium 2xl:text-5xl text-zinc-800">
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
