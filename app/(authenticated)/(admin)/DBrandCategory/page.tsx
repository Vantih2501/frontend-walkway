"use client"

import Sidebar from "#/components/Sidebar"
import { Avatar, Typography } from "antd"
import BrandData from "./DataBrand";
import CategoryData from "./DataCategory";

const { Title } = Typography;

export default function DataCB(){
  return(
    <div>
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="mt-8 container ContentAdmin">
      <div
        className=" header-fix mt
        -3"
      >
        <div className="flex">
          <Title level={2}>Category & Brand</Title>
          <div className="flex profAdminCB">
            <Avatar
              className="mt-1"
              src={<img src="fotoprof.jpg" alt="avatar" />}
            />
            <div>
              <p className="mt-1 mx-2 font-medium">Farel Widianto</p>
              <p className="mx-2 text-xs -mt-4" style={{ color: "gray" }}>
                farelWidianto@gmail.com
              </p>
            </div>
          </div>
        </div>
        <hr className="hradmin" />
        <br />

        <div className="flex">
          <BrandData/>
          <CategoryData/>
        </div>
      </div>
      </div>
    </div>
  )
}