"use client";
import React, { useState } from "react";
import { Card, Layout, Typography } from "antd";
import CardItem from "./carditem";

const { Title } = Typography;

export default function Checkout() {
  return (
    <div>

      <Card className="cardC">
        <div className="container mx-4">
        <h3 style={{ fontSize:"30px" }}>Your Items</h3>
        <CardItem/>
        {/* <Layout className='flex'>
        <CardItem/>
        </Layout> */}
        </div>
      </Card>
    </div>
  );
}
