"use client";

import Sidebar from "#/components/Sidebar";
import DataAdmin from "./DataAdmin";

export default function ProfileAdmin() {
  return (
    <div>
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="mt-8 container ContentAdmin">
        <DataAdmin/>
      </div>
    </div>
  );
}
