"use client";

import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";

const { Title } = Typography;


export default function CardTotal() {
  return (
    <Card className="CardT">
      <div className="mx-10 mt-10">
      <h3 style={{ fontSize: "25px" }}>
              ORDERS SUMMARY
      </h3>
      <hr className="mt-5"/>

      <Row className="mt-5" style={{ color:'grey' }}>
        <Col><p className="text-lg">Order Subtotal</p></Col>
        <Col><p className="colprice text-lg">IDR 5,000,000</p></Col>
      </Row>

      <Row style={{ color:'grey' }}>
        <Col><p className="text-lg">Shipping</p></Col>
        <Col><p className="shipprice text-lg">IDR 15,000</p></Col>
      </Row>
      <hr />

      <Row className="mt-5">
        <Col><p className="text-lg">ORDER TOTAL</p></Col>
        <Col><p className="coltotal text-lg">IDR 5,015,000</p></Col>
      </Row>

      <br />

      <Button block type="primary">Proceed To Checkout</Button>
      </div>
      <br /><br />
    </Card>
  );
}
