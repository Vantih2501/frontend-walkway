"use client";

import {
  Button,
  Card,
  Col,
  ConfigProviderProps,
  Image,
  Radio,
  RadioChangeEvent,
  Row,
  Tabs,
} from "antd";
import { useState } from "react";


const tabItems = [
    {
        label: `All`,
        key: "1",
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
              <div className="status3">
                <p>Cancelled</p>
              </div>
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
},
];

export default function DetailOrder() {

    const [activeKey, setActiveKey] = useState<string | undefined>(undefined);// Tidak ada tab yang aktif
    return (
    <div className="div">
      <Card
        className="CardOrder"
        >
        <div className="container mx-auto">
          <div className="flex">
            <Tabs
              activeKey={activeKey} // Kontrol aktif tab secara manual
              onChange={(key) => setActiveKey(key)} // Mengatur activeKey saat tab berubah
              type="card"
              items={tabItems}
              className="feTabs mt-3"
            />
            <a href="../OrderHistory" className="backDetail"><Button type="primary">Back</Button></a>
          </div>

          <div className="list container mx-auto">
               
                  <div className="flex">
                    <div className="status1">
                      <p>Arrived</p>
                    </div>
                    <p className="font-medium mx-3 mt-4">10 Oktober 2024</p>
                    <div className="resi flex">
                      <p className="font-medium mx-3 mt-4">Resi Number</p>
                      <p
                        style={{ color: "#0F930F" }}
                        className="font-medium mx-1 mt-4"
                      >
                        LDKV-6317328462
                      </p>
                    </div>
                  </div>
                <hr className="hrOrder"/>
                <div className="flex mt-3 mx-4">
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
                  </div>
                </div>
              </div>
              <hr className="hrOrder" />
              <h3 className="mx-8 mt-6">Gandara | +62 0895 0913 7208</h3>
              <div className="flex">
                <Image src="/maps-ui.png" alt="" width={20} height={30} className="ml-10"/>
                <div className="ml-12">
                  <h3>JNE Regular <span style={{ color:"grey", fontWeight:"200" }}>| Estimation 3 - 6 Sep</span> </h3>
                  <p className="w-4/5">Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.</p>
                </div>
              </div>
              <hr className="hrOrder" />
              <Row className="ml-10 mt-5">
                <Col><p className="text-base" style={{ color:'gray' }}>Subtotal (1 Product)</p></Col>
                <Col><p className="text-base priceDetail">Rp 2,500,000</p></Col>
              </Row>
              <Row className="ml-10">
                <Col><p className="text-base" style={{ color:'gray' }}>Shipping</p></Col>
                <Col><p className="text-base shipDetail">Rp 24,000</p></Col>
              </Row>
              <hr className="hrOrder" />
              <Row className="ml-10">
                <Col><p className="text-base font-semibold">Order Total</p></Col>
                <Col><p className="text-base font-semibold totalDetail">Rp 2,524,000</p></Col>
              </Row>
          <Button className="buttonDetail" type="primary">Buy Again</Button>
        </div>
      </Card>
    </div>
  );
}
