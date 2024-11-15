"use client";
import { Button, Divider, Image, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { config } from "#/config/app";
import { formatPhoneNumber, urlFormatter } from "#/utils/formatter";
import Link from "next/link";
import React from "react";

interface OrderHistoryProps {
  order: Order;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const OrderHistoryModal = ({
  order,
  openModal,
  setOpenModal,
}: OrderHistoryProps) => {
  return (
    <Modal
      className="p-5 rounded-xl w-[1000px]"
      footer={
        order.orderItems.length < 2 ? (
          <Link
            href={`/product/${order.orderItems[0].productDetail.product.brand.name.toLowerCase()}/${urlFormatter(
              order.orderItems[0].productDetail.product.name
            )}`}
          >
            <Button block type="primary" className="text-xs h-11">
              Buy Again
            </Button>
          </Link>
        ) : (
          <></>
        )
      }
      open={openModal}
      title="Order Detail"
      onCancel={() => setOpenModal(false)}
      destroyOnClose
    >
      <div className="py-4 space-y-5">
        <div className="flex justify-between item-center">
          <div className="flex items-center">
            <Tag
              className="rounded-full text-[10px]"
              color={`${order.status === "confirmed" ? "green" : "red"}`}
            >
              {order.status}
            </Tag>
            <p className="text-xs">
              {dayjs(order.order_date).format("DD MMMM YYYY, HH:mm")}
            </p>
          </div>
          <h1 className="flex items-center gap-1 text-xs">
            Receipt:<span className="text-green-600 underline cursor-pointer">{order.receipt}</span>
          </h1>
        </div>
        <Divider />
        <div className="">
          {order.orderItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex gap-4 text-sm">
                <Image
                  preview={false}
                  alt="img"
                  src={`${config.apiUrl}/product/uploads/${
                    item.productDetail.product.productPhotos.find(
                      (t) => t.photoType == "front"
                    )?.image
                  }`}
                  className="rounded-xl !size-20 object-contain border aspect-square !border-zinc-300"
                />
                <div className="flex-1 space-y-2">
                  <h1 className="w-3/5 line-clamp-2">
                    {item.productDetail.product.name}
                  </h1>
                  <div className="flex gap-3 text-zinc-400">
                    <p>Size: {item.productDetail.size}</p>
                    <p>Quantity: {order.orderItems.length}</p>
                  </div>
                </div>
                <h1>
                  Rp {item.productDetail.product.price.toLocaleString("id-ID")}
                </h1>
              </div>
							{index < order.orderItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
				<Divider />
        <div className="space-y-3">
          <h1 className="space-x-1.5 text-sm">
            <span className="font-medium">{order.address.contact_name}</span>
            <span className="font-normal">|</span>
            <span className="font-normal">
              {formatPhoneNumber(order.address.contact_number)}
            </span>
          </h1>
          <div className="flex gap-3">
            <Image alt="" src="" sizes="20" />
            <div>
              <h1 className="mb-1 text-sm font-medium">JNE Pengiriman</h1>
              <p className="text-xs text-zinc-500">
                Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="">
          <div className="flex items-center justify-between mb-3 text-sm">
            <h1>Subtotal ({`${order.orderItems.length}`} Product)</h1>
            <p>
              Rp{" "}
              {(order.order_total * order.orderItems.length).toLocaleString(
                "en-US"
              )}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <h1>Shipping</h1>
            <p>Rp 24,000</p>
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-between mt-5 text-base font-medium">
          <h1>ORDER TOTAL</h1>
          <p>Rp {(24000 + order.order_total).toLocaleString("en-US")}</p>
        </div>
      </div>
    </Modal>
  );
};

export default OrderHistoryModal;
