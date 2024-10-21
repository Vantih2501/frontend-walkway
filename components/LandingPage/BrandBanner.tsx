import React from "react";
import Image from "next/image";

const brandLogo = [
  {
    src: "/icons/newbalance.svg",
    alt: "New Balance Logo",
    width: 105,
    height: 50,
    class: "",
  },
  {
    src: "/icons/adidas.svg",
    alt: "Adidas Logo",
    width: 74,
    height: 50,
    class: "",
  },
  {
    src: "/icons/puma.svg",
    alt: "Puma Logo",
    width: 100,
    height: 50,
    class: "hidden 2xl:block",
  },
  {
    src: "/icons/nike.svg",
    alt: "Nike Logo",
    width: 96,
    height: 50,
    class: "",
  },
  {
    src: "/icons/reebok.svg",
    alt: "Rebook Logo",
    width: 107,
    height: 50,
    class: "hidden 2xl:block",
  },
  {
    src: "/icons/vans.svg",
    alt: "Vans Logo",
    width: 75,
    height: 50,
    class: "",
  },
];

const BrandBanner = () => {
  return (
    <div className="text-white bg-primary-400">
      <div className="px-6 py-10 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center w-full justify-evenly gap-x-24">
          {brandLogo.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              layout="intrinsic"
            />
          ))}
        </div>
      </div>
    </div>
    // <div className="w-full px-24 bg-primary-400 py-9 xl:py-10">
    // <div className="flex flex-wrap items-center justify-center w-full gap-x-44 gap-y-9">
    //   {brandLogo.map((logo, index) => (
    //     <Image
    //       key={index}
    //       src={logo.src}
    //       alt={logo.alt}
    //       width={logo.width}
    //       height={logo.height}
    //       className={logo.class}
    //       layout="intrinsic"
    //     />
    //   ))}
    // </div>
    // </div>
  );
};

export default BrandBanner;
