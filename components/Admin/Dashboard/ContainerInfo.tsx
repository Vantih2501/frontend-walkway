import React from "react";
import CardInfo from "./ui/CardInfo";
import { LuDollarSign } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import { IoCubeOutline } from "react-icons/io5";

const ContainerInfo = ({ className, totalSales, totalProduct, totalRevenue }: any) => {
  return (
    <div className={`${className}`}>
      <CardInfo
        title={"Total Revenue"}
        value={totalRevenue}
        Icon={LuDollarSign}
      />
      <CardInfo title={"Total Sales"} value={totalSales} Icon={PiWallet} />
      <CardInfo title={"Total Product"} value={totalProduct.length} Icon={IoCubeOutline} />
    </div>
  );
};

export default ContainerInfo;
