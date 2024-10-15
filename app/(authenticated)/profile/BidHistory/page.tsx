"use client";

import Footer from "#/components/Footer";
import { Card } from "antd";
import NavProf from "#/app/(authenticated)/profile/NavProfile";
import ListBid from "./ListBid";

export default function BidList() {
  return (
    <div>
      <br />
      <br />
      <Card className="container mx-auto cardC">
        <div className="container mx-10 mt-10">
          <h3 style={{ fontSize: "30px" }}>Bid History</h3>
          <div className="flex mt-8 mx-3">
            <NavProf />
            <ListBid/>
          </div>
        </div>
        <br />
        <br />
      </Card>

      <Footer />
    </div>
  );
}