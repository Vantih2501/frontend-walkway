import React from "react";
import { Card } from "antd";
import { IconType } from "react-icons";

interface CardInfoProps {
  title: string;
  value: string | number;
  Icon: IconType;
  perMonth?: boolean;
}

const CardInfo = ({ title, value, Icon, perMonth = true }: CardInfoProps) => {
  return (
    <div
      className="flex flex-col justify-between w-full gap-3 p-4 transition-all ease-in-out border rounded-lg border-zinc-300 hover:border-primary hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="-space-y-1">
          <h1 className="text-lg font-medium">{title}</h1>
          {perMonth && <p className="text-sm text-zinc-300">*this month</p>}
        </div>
        <Icon className="text-lg outline-1" />
      </div>
      <h1 className="text-lg font-semibold">{value}</h1>
    </div>
  );
};

export default CardInfo;
