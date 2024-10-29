"use client"
import AddressModalForm from "#/components/common/modal/AddressModal";
import { useAuth } from "#/hooks/auth";
import { useUser } from "#/hooks/user";
import { getAccessToken } from "#/utils/token";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Divider } from "antd";
import { useState } from "react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export default function Profile() {
  const { getUser } = useAuth();
  const { fetchAddress } = useUser();
  const token = getAccessToken();
  const { user, isLoading } = getUser(token);
  if (isLoading) {
    return <>loading...</>
  }

  const { address } = fetchAddress(user?.email)
  const [currentMenu, setCurrentMenu] = useState('Profile')
  const [openAddress, setOpenAddress] = useState(false)

  const menus = ['Profile', 'Order History', "Bid History"]

  return (
    <>
      <div className="py-6 px-48">
        <div className="rounded-lg bg-[#f2f2f2] w-full p-6 space-y-2">
          <div className="-space-y-0.5">
            <h2 className="text-2xl font-medium tracking-wide">My Profile</h2>
            {/* <p className="text-zinc-600">Kelola informasi profil Anda untuk memudahkan proses transaksi</p> */}
          </div>
          <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-3 rounded-lg bg-white px-10 py-4 flex flex-col justify-between min-h-screen">
              <div className="space-y-5">
                <div className="flex flex-col items-center gap-5 border-b pb-5">
                  <Avatar children={user?.name[0]} size={100} />
                  <h4 className="text-lg font-medium tracking-wide">{user?.name}</h4>
                </div>
                <div className="space-y-3 pb-5">
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
              <div className="space-y-3 border-t pt-3">
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
              {currentMenu == 'Profile' && (
                <div className="flex flex-col gap-2 h-full">
                  <div className="border bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">PERSONAL INFORMATION</h2>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {

                        }}
                      >
                        Edit
                      </Button>
                    </div>
                    <Divider />
                    <div className="flex flex-wrap gap-40">
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Name</p>
                        <h2 className="text-lg font-medium tracking-wide">{user?.name}</h2>
                      </div>
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Email</p>
                        <h2 className="text-lg font-medium tracking-wide">{user?.email}</h2>
                      </div>
                      <div className="-space-y-0.5">
                        <p className="text-gray-400">Phone Number</p>
                        <h2 className="text-lg font-medium tracking-wide">{user?.phone_number}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="border bg-white rounded-lg p-6 flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">ADDRESS</h2>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setOpenAddress(true)
                        }}
                      >
                        Address
                      </Button>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                      {address && address.map((data) => (
                        <div className="py-3 space-y-1" key={data.id}>
                          <h2 className="text-base">{data.contact_name} | {data.contact_number}</h2>
                          <p className="text-gray-400 w-3/5">{data.address}</p>
                          <div className="flex gap-2 items-center">
                            <Button
                              type="primary"
                            >
                              Use
                            </Button>
                            <Button
                              type="default"
                            >
                              Edit Address
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
      />
    </>
  )
}