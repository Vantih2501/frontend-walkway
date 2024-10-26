"use client";
import React, { useState } from "react";
import { Button, Card, Collapse, CollapseProps, Image } from "antd";
import CardItem from "./carditem";
import CardTotal from "./cardtotal";
import OrderItem from "#/components/Checkout/OrderItem";
import { PlusOutlined } from "@ant-design/icons";
import AddressList from "#/components/Checkout/AddressList";

export default function Checkout() {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <h2 className="text-xl">Choose Delivery</h2>,
      children: (<div className="flex items-start">
        <Image src="/logo-delivery.png" />
      </div>),
    }
  ];

  return (
    <div className="py-6 px-56">
      <div className="rounded-lg bg-[#f2f2f2] w-full p-6 space-y-2">
        <h2 className="text-2xl font-medium tracking-wide">Your Items</h2>
        <div className="flex justify-between gap-2">
          <div className="w-4/6 p-6 space-y-8 bg-white rounded-lg">
            <OrderItem />

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <AddressList />

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <Collapse items={items} ghost expandIconPosition="end" className="delivery-select"></Collapse>
          </div>
          <div className="w-2/6 p-6 space-y-6 bg-white rounded-lg">
            <h2 className="text-xl">Order Summary</h2>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="text-base text-gray-500">Order Subtotal</h3>
                <p className="text-gray-500 font-medium">Rp 5,000,000</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-base text-gray-500">Shipping</h3>
                <p className="text-gray-500 font-medium">Rp 5,000,000</p>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex justify-between">
              <h3 className="text-base  font-medium">Order Total</h3>
              <p className=" font-medium">Rp 5,000,000</p>
            </div>
            <Button block type="primary" size="large">Proceed to Payment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
