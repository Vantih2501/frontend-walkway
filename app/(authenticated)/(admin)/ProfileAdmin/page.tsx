"use client";

import Sidebar from "#/components/Admin/Layout/Sider";
import DataAdmin from "./DataAdmin";

export default function ProfileAdmin() {
  return (
    <div>
      {/* <div className="fixed">
        <Sidebar />
      </div> */}

      <div className="mt-8 container ContentAdmin">
        <DataAdmin/>
      </div>
    </div>
  );
}
