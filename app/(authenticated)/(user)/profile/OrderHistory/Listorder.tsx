"use client";

import {
  Button,
  Card,
  ConfigProviderProps,
  Radio,
  RadioChangeEvent,
  Tabs,
} from "antd";
import { useState } from "react";

const getStatusClass = (status: string) => {
  if (status === 'Delivered') return 'status1';
  if (status === 'Pending') return 'status2';
  if (status === 'Cancelled') return 'status3';
  return '';
};

const tabItems = [
  {
    label: `All`,
    key: "1",
    children: (
      <div className="mx-5">
        <a href="/profile/OrderHistory/DetailOrder">
        <div className="list">
          <Card
            className="cardStatus"
          >
            <div className="flex">
            {<span className={getStatusClass('Delivered')}>Delivered</span>}
              <p className="font-medium mx-3 mt-4">10 Oktober 2024</p>
              <div className="resi ml-72 flex">
                <p className="font-medium mx-3 mt-4">Resi Number</p>
                <p
                  style={{ color: "#0F930F" }}
                  className="font-medium mx-1 mt-4"
                >
                  LDKV-6317328462
                </p>
              </div>
            </div>
          </Card>
          <div className="flex mt-3">
            <img src="/product2.png" alt="" width={100} />
            <div className="apro">
              <h3 className="mx-3 mt-2 w-48">
                New Balance 1906R Silver Metallic Sea Salt
              </h3>
              <div className="flex mx-3">
                <p>Size: 12</p>
                <p className="mx-4">Quantity: 1</p>
              </div>
            </div>
            <div className="HBut">
              <h3>Rp 2,500,000</h3>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "-17px",
                  marginTop: "20px",
                }}
                type="primary"
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
        </a>
        <hr className="mt-5 mb-5" />
        
        <a href="http://">
        <div className="list">
          <Card
           className="cardStatus"
          >
            <div className="flex">
            {<span className={getStatusClass('Pending')}>Pending</span>}
              <p className="font-medium mx-3 mt-4">11 Oktober 2024</p>
            </div>
          </Card>
          <div className="flex mt-3">
            <img src="/product2.png" alt="" width={100} />
            <div className="apro">
              <h3 className="mx-3 mt-2 w-48">
                New Balance 1906R Silver Metallic Sea Salt
              </h3>
              <div className="flex mx-3">
                <p>Size: 12</p>
                <p className="mx-4">Quantity: 1</p>
              </div>
            </div>
            <div className="HBut ml-96">
              <h3>Rp 2,500,000</h3>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "-17px",
                  marginTop: "20px",
                }}
                type="primary"
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
        </a>
        <hr className="mt-5" />
      </div>
    ),
  },
  {
    label: `Pending`,
    key: "2",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
            className="cardStatus"
          >
            <div className="flex">
            {<span className={getStatusClass('Pending')}>Pending</span>}
              <p className="font-medium mx-3 mt-4">11 Oktober 2024</p>
            </div>
          </Card>
          <div className="flex mt-3">
            <img src="/product2.png" alt="" width={100} />
            <div className="apro">
              <h3 className="mx-3 mt-2 w-48">
                New Balance 1906R Silver Metallic Sea Salt
              </h3>
              <div className="flex mx-3">
                <p>Size: 12</p>
                <p className="mx-4">Quantity: 1</p>
              </div>
            </div>
            <div className="HBut ml-96">
              <h3>Rp 2,500,000</h3>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "-17px",
                  marginTop: "20px",
                }}
                type="primary"
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
        </a>
        <hr className="mt-5 mb-5" />
      </div>
    ),
  },
  {
    label: `Cancelled`,
    key: "3",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
            className="cardStatus"
          >
            <div className="flex">
            {<span className={getStatusClass('Cancelled')}>Cancelled</span>}
              <p className="font-medium mx-3 mt-4">09 Oktober 2024</p>
            </div>
          </Card>
          <div className="flex mt-3">
            <img src="/product2.png" alt="" width={100} />
            <div className="apro">
              <h3 className="mx-3 mt-2 w-48">
                New Balance 1906R Silver Metallic Sea Salt
              </h3>
              <div className="flex mx-3">
                <p>Size: 12</p>
                <p className="mx-4">Quantity: 1</p>
              </div>
            </div>
            <div className="HBut ml-96">
              <h3>Rp 2,500,000</h3>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "-17px",
                  marginTop: "20px",
                }}
                type="primary"
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
        </a>
        <hr className="mt-5 mb-5" />
      </div>
    ),
  },
  {
    label: `Delivered`,
    key: "4",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
           className="cardStatus"
          >
            <div className="flex">
            {<span className={getStatusClass('Delivered')}>Delivered</span>}
              <p className="font-medium mx-3 mt-4">10 Oktober 2024</p>
              <div className="resi ml-72 flex">
                <p className="font-medium mx-3 mt-4">Resi Number</p>
                <p
                  style={{ color: "#0F930F" }}
                  className="font-medium mx-1 mt-4"
                >
                  LDKV-6317328462
                </p>
              </div>
            </div>
          </Card>
          <div className="flex mt-3">
            <img src="/product2.png" alt="" width={100} />
            <div className="apro">
              <h3 className="mx-3 mt-2 w-48">
                New Balance 1906R Silver Metallic Sea Salt
              </h3>
              <div className="flex mx-3">
                <p>Size: 12</p>
                <p className="mx-4">Quantity: 1</p>
              </div>
            </div>
            <div className="HBut ml-96">
              <h3>Rp 2,500,000</h3>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "-17px",
                  marginTop: "20px",
                }}
                type="primary"
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
        </a>
        <hr className="mt-5 mb-5" />
      </div>
    ),
  },
];

export default function ListOrder() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="div">
      <Card
        className="CardOrder"
      >
        <div className="container mx-auto">
          <div>
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              type="card"
              items={tabItems}
              className="feTabs mt-3"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
