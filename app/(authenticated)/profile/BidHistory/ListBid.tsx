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

const tabItems = [
  {
    label: `All`,
    key: "1",
    children: (
      <div className="mx-5 list1">
        <a href="http://">
        <div className="list">
          <Card
            style={{
              width: 800,
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex">
              <div className="status1">
                <p>Win</p>
              </div>
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
            <div className="HBut" style={{ marginLeft:"23rem" }}>
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
            style={{
              width: 800,
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex">
              <div className="status2">
                <p>Ongoing</p>
              </div>
              <p className="font-medium mx-3 mt-4">11 Oktober 2024</p>
              {/* <div className="resi ml-72 flex">
                    <p className="font-medium mx-3 mt-4">Resi Number</p>
                    <p style={{ color:"#0F930F" }} className="font-medium mx-1 mt-4">LDKV-6317328462</p>
                </div> */}
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
            <div className="HBut" style={{ marginLeft:"23rem" }}>
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
    label: `Win`,
    key: "2",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
            style={{
              width: 800,
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex">
              <div className="status1">
                <p>Win</p>
              </div>
              <p className="font-medium mx-3 mt-4">11 Oktober 2024</p>
              {/* <div className="resi ml-72 flex">
                    <p className="font-medium mx-3 mt-4">Resi Number</p>
                    <p style={{ color:"#0F930F" }} className="font-medium mx-1 mt-4">LDKV-6317328462</p>
                </div> */}
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
    label: `Lose`,
    key: "3",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
            style={{
              width: 800,
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex">
              <div className="status3">
                <p>Lose</p>
              </div>
              <p className="font-medium mx-3 mt-4">09 Oktober 2024</p>
              {/* <div className="resi ml-72 flex">
                    <p className="font-medium mx-3 mt-4">Resi Number</p>
                    <p style={{ color:"#0F930F" }} className="font-medium mx-1 mt-4">LDKV-6317328462</p>
                </div> */}
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
    label: `Ongoing`,
    key: "4",
    children: (
      <div className="mx-5">
        <a href="http://">
        <div className="list">
          <Card
            style={{
              width: 800,
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <div className="flex">
              <div className="status2">
                <p>Ongoing</p>
              </div>
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

export default function ListBid() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="div">
      <Card
        style={{
          width: "53rem",
          borderRadius: "20px",
          marginLeft: "30px",
          height: "56rem",
        }}
      >
        <div className="container mx-auto">
          <div className="flex">
            
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
