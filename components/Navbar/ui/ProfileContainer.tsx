import Link from "next/link";
import React from "react";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const ProfileContainer = () => {
  return (
    <div className="flex gap-3 items-center">
      <HiOutlineShoppingBag size={32}/>
      <Link href="/profile">
        <Image
          src={"/image/farel-widianto.jpg"}
          alt="profile"
          width={36}
          height={36}
          className="size-8 2xl:size-9 rounded-full object-cover"
        />
      </Link>
    </div>
  );
};

export default ProfileContainer;
