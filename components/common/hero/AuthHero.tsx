import React from "react";
import Image from "next/image";
import img from "#/public/card-iamge.png";
import logo from "#/public/walkway-logo.svg";
import Link from "next/link";

const AuthHero = () => {
  return (
    <>
      <div className="absolute z-0 w-full h-full">
        <Image
          src={img}
          alt={"Login Background"}
          fill
          className="object-cover"
        />
      </div>
      <div
        className="absolute z-10 h-full w-full p-9 2xl:p-14 flex flex-col justify-between
                bg-gradient-to-t from-zinc-900/75 from-20% via-transparent via-30% to-zinc-900 to-100%"
      >
        <Link href='/' className="w-fit">
          <Image
            src={logo}
            alt="walkway logo"
            width={160}
            height={48}
            className="h-9 2xl:h-12"
          />
        </Link>
        <div className="h-auto">
          <p className="mb-4 leading-6 text-white/90 2xl:text-2xl 2xl:font-medium 2xl:leading-9 2xl:mb-5">
            "Shoes are an important part of your look. I think if your outfit
            isn't anything special then fun footwear is a great way to jazz it
            up and make after your outfit more interesting."
          </p>
          <p className="text-sm text-white/90 2xl:text-xl 2xl:font-medium">
            - Christian Siriano
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthHero;
