"use client";

import Footer from "#/components/Footer";
import { Card } from "antd";
import NavProf from "#/app/(authenticated)/profile/NavProfile";

export default function DetailOrder(){
    
    return(
        <div>
      <br /><br />
      <Card className="container mx-auto cardC">
        <div className="container mx-10 mt-10">
        <h3 style={{ fontSize:"30px" }}>Order History</h3>
        <div className="flex mt-8 mx-3">
            <NavProf/>
        </div>
        </div>
        <br /><br />
      </Card>


      <Footer/>
    </div>
    );
}