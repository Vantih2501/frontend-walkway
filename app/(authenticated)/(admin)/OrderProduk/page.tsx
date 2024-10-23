"use client"

import Sidebar from "#/components/Sidebar";
import TableOrder from "./DataOrder";


export default function DataOrder(){
    return (
      <div>
      <div className="flex">
        <div className="fixed">
        <Sidebar />
        </div>

        <div className="mt-8 container ContentAdmin">
          <TableOrder />
        </div>
      </div>
    </div>
      );
}