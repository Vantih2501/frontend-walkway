import React from "react";
import CardInfo from "./ui/CardInfo";
import { LuDollarSign } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import { IoCubeOutline } from "react-icons/io5";

interface Props {
  className: string;
  product: Product[];
  order: Order[]
}

const ContainerInfo = ({ className, product, order }: Props) => {
  return (
    <div className={`${className}`}>
      <CardInfo
        title={"Total Revenue"}
        value={`Rp ${order.reduce((acc, val) => acc + val.order_total, 0).toLocaleString('en-US')}`}
        Icon={LuDollarSign}
      />
      <CardInfo title={"Total Sales"} value={order.length} Icon={PiWallet} />
      <CardInfo
        title={"Total Product"}
        perMonth={false}
        value={product.length.toLocaleString("en-us")}
        Icon={IoCubeOutline}
      />
    </div>
  );
};

export default ContainerInfo;
