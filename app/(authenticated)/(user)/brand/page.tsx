"use client";

import NavbarUser from "#/components/Navbar";
import { Image, Typography } from "antd";
import ProductBrand from "./CardProduct";
import Footer from "#/components/Footer";


const { Title } = Typography;

export default function BrandUser() {
  return (
    <div>
      <NavbarUser />
      <div className="container mx-auto mt-7">
        <div className="flex">
          <Image src="/brand2.png" alt="LogoBrand" width={300} height={220} />
          <div className="mx-3 mt-16 w-3/4 mb-10">
            <Title level={1}>Addidas</Title>
            <h3 className="font-normal">
              Adidas AG is a German athletic apparel and footwear corporation
              headquartered in Herzogenaurach, Bavaria, Germany. It is the
              largest sportswear manufacturer in Europe, and the second largest
              in the world, after Nike.{" "}
            </h3>
          </div>
        </div>
      </div>
      <ProductBrand />
      <Footer/>
    </div>
  );
}
