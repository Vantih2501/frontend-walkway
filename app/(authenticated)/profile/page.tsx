"use client";

import Footer from "#/components/Footer";
import { Card } from "antd";
import NavProf from "./NavProfile";
import InfoPers from "./InfoPers";
import CardAd from "./CardAdd";

export default function Profile(){
    
    return(
        <div>
      <br /><br />
      <Card className=" container mx-auto cardC">
        <div className="container mx-10 mt-10">
        <h3 style={{ fontSize:"30px" }}>My Profile</h3>
        <h4 style={{ fontSize:"20px", color:"#52525b" }}>Kelola informasi profil Anda untuk memudahkan proses transaksi</h4>
        <div className="flex mt-8 mx-3">
            <NavProf/>
            <div className="L2">
            <InfoPers/>
            <CardAd/>
            </div>
        </div>
        </div>
        <br /><br />
      </Card>


      <Footer/>
    </div>
    );
}