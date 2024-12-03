// import { products } from "#/mock-data/products";
import { config } from "#/config/app";
import { Empty, Image, Modal } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import { HiMiniChevronRight } from "react-icons/hi2";
import relativeTime from "dayjs/plugin/relativeTime";
import OrderDetailModal from "#/components/common/modal/OrderDetailModal";
dayjs.extend(relativeTime);
interface Props {
  orders: Order[];
}

const SiderContent = ({ orders }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  return (
    <div className="flex flex-col p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium 2xl:text-xl">New Order</h1>
        <Link
          href={"/dashboard/order"}
          className="flex items-center hover:opacity-75"
        >
          <p className="text-[10px] 2xl:text-xs">See Orders</p>
          <HiMiniChevronRight />
        </Link>
      </div>
      <div className="overflow-y-auto">
        <ul role="list" className="space-y-1.5">
          {orders.length > 0 ? (
            orders.slice(0, 6).map((order, index) => (
              <React.Fragment key={index}>
                <li
                  key={order.id}
                  className="p-3 rounded-md cursor-pointer bg-zinc-100 hover:bg-zinc-50"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedOrder(order);
                  }}
                >
                  <div className="flex items-stretch">
                    <div className="bg-white rounded-md size-16 aspect-square">
                      <Image
                        alt="img"
                        className="object-contain bg-white rounded-md shadow-sm aspect-square"
                        preview={false}
                        src={`${config.apiUrl}/product/uploads/${
                          order.orderItems[0].productDetail.product.productPhotos.find(
                            (p) => p.photoType == "front"
                          )?.image
                        }`}
                      />
                    </div>
                    <div className="flex w-full gap-3 2xl:gap-5">
                      <div className="flex flex-col justify-between min-w-0 basis-3/6 ms-4">
                        <p className="mb-1 text-sm font-medium text-gray-800 line-clamp-2">
                          {`${order.orderItems[0].productDetail.product.brand.name} ${order.orderItems[0].productDetail.product.name}`}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {dayjs(order.createdAt).fromNow()}
                        </p>
                      </div>
                      <div className="h-full text-sm font-medium text-right text-primary basis-3/6">
                        Rp {order.order_total.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </li>
                {selectedOrder && (
                  <OrderDetailModal
                    openModal={showModal}
                    setOpenModal={setShowModal}
                    order={selectedOrder}
                  />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="flex items-center justify-center py-60">
              <Empty description="No order yet" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SiderContent;
