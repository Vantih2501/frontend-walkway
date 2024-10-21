"use client";

import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-primary-400 py-[77px]">
      <div className="mx-auto max-w-7xl">
        <div className="absolute top-0 right-0 h-full w-[487px] 2xl:w-[752px] z-0">
          <Image
            src={"/image/footer-image.png"}
            alt={"Login Background"}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full px-8">
          <div className="flex items-start gap-24 2xl:gap-40">
            <div>
              <Image
                src={"/icons/logo-white.svg"}
                alt={"logo walkway"}
                width={305}
                height={76}
                className="text-left w-[203px] h-[50px] 2xl:w-[259px] 2xl:h-16"
              />
              <p className="mt-7 w-[257px] text-sm leading-6 text-zinc-300 2xl:text-base 2xl:w-[385px] 2xl:leading-8">
                Explore the latest in sneaker styles, from timeless classics to
                modern designs. Find your perfect pair and step up your look
                today!
              </p>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col w-24">
                <p className="mb-5 text-sm text-white 2xl:mb-8 2xl:text-lg">
                  Kategori
                </p>
                <ul className="text-zinc-300 space-y-3 text-sm 2xl:text-base 2xl:space-y-[18px]">
                  <li>
                    <Link className="text-zinc-300 hover:text-white" href={"#"}>
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link className="text-zinc-300 hover:text-white" href={"#"}>
                      Sneakers
                    </Link>
                  </li>
                  <li>
                    <Link className="text-zinc-300 hover:text-white" href={"#"}>
                      Auction
                    </Link>
                  </li>
                  <li>
                    <Link className="text-zinc-300 hover:text-white" href={"#"}>
                      Hosttest
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-5 text-sm text-white 2xl:mb-8 2xl:text-lg">
                  Social Media
                </p>
                <div className="flex gap-4 text-zinc-300">
                  <Link
                    href={"#"}
                    className="text-lg 2xl:text-2xl hover:text-white"
                  >
                    <TwitterOutlined />
                  </Link>
                  <Link
                    href={"#"}
                    className="text-lg 2xl:text-2xl hover:text-white"
                  >
                    <InstagramOutlined />
                  </Link>
                  <Link
                    href={"#"}
                    className="text-lg 2xl:text-2xl hover:text-white"
                  >
                    <FacebookOutlined />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
