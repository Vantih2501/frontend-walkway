import Image from "next/image";
import Link from "next/link";
import React from "react";
import CarouselUi from "./ui/Carousel";
import { products } from "#/mock-data/products";

const ProductDisplay = () => {
  return (
    <div className="bg-primary-100">
      <div className="flex items-center px-8 py-12 mx-auto max-w-7xl">
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/icons/fire-icon.svg"
                alt="fire icon"
                width={27}
                height={32}
              />
              <h1 className="text-3xl font-bold font-montserrat">
                HOTTEST SNEAKER
              </h1>
            </div>
            <Link
              href={"#"}
              className="text-sm font-medium font-montserrat text-zinc-500 hover:opacity-75"
            >
              VIEW ALL
            </Link>
          </div>
          <CarouselUi dataFetch={products} variant={"default"} />
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
