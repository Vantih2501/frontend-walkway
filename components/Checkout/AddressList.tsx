import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function AddressList() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Address</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Address
        </Button>
      </div>
    </div>
  )
}