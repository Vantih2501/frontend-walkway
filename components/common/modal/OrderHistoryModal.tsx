import React from 'react';
import {
  Button,
  Calendar,
  Collapse,
  Divider,
  Image,
  Modal,
  Spin,
  Tag,
  Timeline,
} from "antd";
import {
  CheckCircleFilled,
  LoadingOutlined,
  InboxOutlined,
  CarOutlined,
  HomeOutlined,
  CalendarOutlined,
  TruckOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { config } from "#/config/app";
import { formatPhoneNumber, urlFormatter } from "#/utils/formatter";
import Link from "next/link";
import { formatStatus } from "#/app/(authenticated)/dashboard/order/page";
import { CollapseProps } from "antd/lib";
import { useOrder } from "#/hooks/order";

type OrderStatus =
  | "confirmed"
  | "allocated"
  | "picking_up"
  | "picked"
  | "dropping_off"
  | "delivered";

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
  const { trackOrder } = useOrder();
  const { order: track, isLoading } = trackOrder(order.referenceId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircleFilled className="text-green-500" />;
      case "allocated":
        return <CalendarOutlined className="text-blue-500" />;
      case "picking_up":
        return <SolutionOutlined className="text-blue-500" />;
      case "picked":
        return <InboxOutlined className="text-blue-500" />;
      case "dropping_off":
        return <TruckOutlined className="text-blue-500" />;
      case "delivered":
        return <HomeOutlined className="text-green-500" />;
      default:
        return <LoadingOutlined className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "allocated":
      case "picking_up":
      case "picked":
      case "dropping_off":
        return "blue";
      case "delivered":
        return "green";
      default:
        return "default";
    }
  };

  const formatTrackingDate = (date: string) => {
    return dayjs(date).format("DD MMM YYYY, HH:mm");
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <h2 className="flex items-center justify-between text-sm">
          Order Tracking
        </h2>
      ),
      children: isLoading ? (
        <div className="flex items-center justify-center w-full h-56">
          <Spin size="large" />
        </div>
      ) : track?.history ? (
        <div className="flex flex-col items-start gap-2 px-4 py-2">
          <Timeline
            reverse
            items={track.history.map((item: any) => ({
              color: getStatusColor(item.status),
              dot: getStatusIcon(item.status),
              children: (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium capitalize">
                      {item.status.replace(/_/g, " ")}
                    </span>
                    {/* <Tag 
                      color={getStatusColor(item.status)} 
                      className="text-xs capitalize"
                    >
                      {item.service_type}
                    </Tag> */}
                  </div>
                  <p className="text-xs text-gray-500">{item.note}</p>
                  <span className="text-xs text-gray-400">
                    {formatTrackingDate(item.updated_at)}
                  </span>
                </div>
              ),
            }))}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-32">
          <p className="text-sm text-gray-500">No tracking data available</p>
        </div>
      ),
      className: "!pb-0",
    },
  ];

  return (
    <Modal
      className="p-5 rounded-xl !no-scrollbar"
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
              color="green"
            >
              {formatStatus(order.status)}
            </Tag>
            <p className="text-xs">
              {dayjs(order.order_date).format("DD MMMM YYYY, HH:mm")}
            </p>
          </div>
          <h1 className="flex items-center gap-1 text-xs">
            Receipt:
            <Link
              href={`${config.apiUrl}/order/export/${order.id}`}
              target="_blank"
              className="text-green-700 underline cursor-pointer hover:underline hover:text-green-800"
            >
              {order.receipt}
            </Link>
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
              <h1 className="mb-1 text-sm font-medium">Ninja Express</h1>
              <p className="text-xs text-zinc-500">
                {order.address.address}
              </p>
            </div>
          </div>
        </div>
        {track && (
          <>
            <Divider />
            <Collapse
              items={items}
              ghost
              expandIconPosition="end"
              className="delivery-select"
            />
          </>
        )}
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