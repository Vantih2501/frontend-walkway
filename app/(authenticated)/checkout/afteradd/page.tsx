"use client";
import React, { useState } from "react";
import { Card, Layout, Typography } from "antd";
import CardItem from "./carditem";
import CardTotal from "./cardtotal";
import Footer from "#/components/Footer";
import Navbar from "#/components/Navbar";

const { Title } = Typography;

export default function Checkout() {
  return (
    <div>

      <Card className=" container mx-auto cardC">
        <div className="container mx-10 mt-10">
        <h3 style={{ fontSize:"30px" }}>Your Items</h3>
        <div className="flex">
          <CardItem/>
          <div className="mx-5"><CardTotal/></div>
        </div>
        </div>
      </Card>

      <Footer/>
    </div>
  );
}
