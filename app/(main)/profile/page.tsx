"use client";
import AddressModalForm from "#/components/common/modal/AddressModal";
import { useAuth } from "#/hooks/auth";
import { useOrder } from "#/hooks/order";
import { useUser } from "#/hooks/user";
import { formatPhoneNumber } from "#/utils/formatter";
import { getAccessToken } from "#/utils/token";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Empty,
  message,
  Select,
  Spin,
} from "antd";
import { useState } from "react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export default function Profile() {
  const { getUser } = useAuth();
  const { fetchAddress, postAddress, setDefaultAddress } = useUser();
  const { getOrder } = useOrder();
  const token = getAccessToken();

  const { user, isLoading } = getUser(token);
  const { order } = getOrder(user?.email);
  const { address } = fetchAddress(user?.email);
  const [currentMenu, setCurrentMenu] = useState("Profile");
  const [openAddress, setOpenAddress] = useState(false);

  const menus = ["Profile", "Order History", "Bid History"];

  console.log(order);

  const handleAddressFinish = async (values: any) => {
    try {
      message.success("Address created successfully.");
      await postAddress({ ...values, email: user?.email }, token);
    } catch (error: any) {
      message.error(
        `Error when creating address: ${error.response.body.message}`
      );
    } finally {
      setOpenAddress(false);
    }
  };

  const handleChangeAddress = async (id: any) => {
    try {
      message.success("Default address changed.");

      await setDefaultAddress(user?.email, id, token);
    } catch (error: any) {
      message.error(
        `Error when creating address: ${error.response.body.message}`
      );
    }
  };

  return (
    <>
      <div className="px-48 py-6">
        <div className="rounded-lg bg-[#f2f2f2] w-full p-6 space-y-2">
          <div className="-space-y-0.5">
            <h2 className="text-2xl font-medium tracking-wide">My Profile</h2>
            {/* <p className="text-zinc-600">Kelola informasi profil Anda untuk memudahkan proses transaksi</p> */}
          </div>
          <div className="grid h-full grid-cols-12 gap-4">
            <div className="flex flex-col justify-between min-h-screen col-span-3 px-10 py-4 bg-white rounded-lg">
              <div className="space-y-5">
                <div className="flex flex-col items-center gap-5 pb-5 border-b">
                  <Avatar children={user?.name[0]} size={100} />
                  <h4 className="text-lg font-medium tracking-wide">
                    {user?.name}
                  </h4>
                </div>
                <div className="pb-5 space-y-3">
                  {menus.map((menu) => (
                    <Button
                      block
                      key={menu}
                      onClick={() => setCurrentMenu(menu)}
                      type={currentMenu === menu ? "primary" : "text"}
                      className="flex justify-start h-11"
                      // className={`flex items-center gap-2 justify-start py-3 px-4 text-base rounded-md transition duration-75 ${currentMenu === menu ? "bg-[#4E7772] text-white" : "text-gray-800 hover:bg-zinc-100"}`}
                    >
                      {menu}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="pt-3 space-y-3 border-t">
                <Button
                  type="text"
                  block
                  className="flex items-center justify-start py-6 text-base border"
                >
                  <EditOutlined />
                  Change Password
                </Button>

                <Button
                  type="text"
                  block
                  className="flex items-center justify-start py-6 text-base border"
                >
                  <HiArrowLeftOnRectangle />
                  Logout
                </Button>
              </div>
            </div>

            <div className="col-span-9">
              {currentMenu == "Profile" && (
                <div className="flex flex-col h-full gap-2">
                  <div className="p-6 bg-white border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">
                        PERSONAL INFORMATION
                      </h2>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {}}
                      >
                        Edit
                      </Button>
                    </div>
                    <Divider />
                    <div className="flex flex-wrap gap-40">
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Name</p>
                        <h2 className="text-lg font-medium tracking-wide">
                          {user?.name}
                        </h2>
                      </div>
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Email</p>
                        <h2 className="text-lg font-medium tracking-wide">
                          {user?.email}
                        </h2>
                      </div>
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Phone Number</p>
                        <h2 className="text-lg font-medium tracking-wide">
                          {formatPhoneNumber(user?.phone_number)}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6 bg-white border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">ADDRESS</h2>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setOpenAddress(true);
                        }}
                      >
                        Address
                      </Button>
                    </div>
                    <Divider />
                    <div className="flex-1 space-y-3">
                      {address && address.length > 0 ? (
                        address.map((data) => (
                          <div className="py-3 space-y-1" key={data.id}>
                            <h2 className="text-base">
                              {data.contact_name} |{" "}
                              {formatPhoneNumber(data.contact_number)}
                            </h2>
                            <p className="w-3/5 text-gray-400">
                              {data.address}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                type="primary"
                                disabled={data.id === user?.defaultAddress}
                                onClick={() => handleChangeAddress(data.id)}
                              >
                                {data.id === user?.defaultAddress
                                  ? "Default"
                                  : "Set as Default"}
                              </Button>
                              <Button type="default">Edit Address</Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Empty />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {currentMenu == "Order History" && (
                <div className="flex flex-col h-full gap-3 p-6 bg-white border rounded-lg">
                  <h2 className="text-lg font-medium pt-0.5">Order History</h2>
                  <div className="flex items-center gap-3">
                    <h2>Status:</h2>
                    <Select
                      className="w-40"
                      value={"all"}
                      options={[
                        { value: "all", label: "All" },
                        { value: "pending", label: "Pending" },
                        { value: "cancelled", label: "Cancelled" },
                        { value: "delivered", label: "Delivered" },
                      ]}
                    />
                  </div>
                  <div className="flex items-center justify-center w-full h-3/5">
                    {order ? (
                      order.map((order) => <div>{order.receipt}</div>)
                    ) : (
                      <Empty />
                    )}
                  </div>
                </div>
              )}
              {currentMenu == "Bid History" && (
                <div className="flex flex-col h-full gap-3 p-6 bg-white border rounded-lg">
                  <h2 className="text-lg font-medium pt-0.5">Bid History</h2>
                  <div className="flex items-center gap-3">
                    <h2>Status:</h2>
                    <Select
                      className="w-40"
                      value={"all"}
                      options={[
                        { value: "all", label: "All" },
                        { value: "Win", label: "Win" },
                        { value: "Lose", label: "Lose" },
                        { value: "Ongoing", label: "Ongoing" },
                      ]}
                    />
                  </div>
                  <div className="flex items-center justify-center w-full h-3/5">
                    <Empty />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddressModalForm
        open={openAddress}
        onCancel={() => setOpenAddress(false)}
        onFinish={handleAddressFinish}
      />
    </>
  );
}
