"use client";

import React, { useState } from "react";
import {
  Button,
  Select,
  Table,
  Image,
  Tag,
  Spin,
  Space,
  Modal,
  DatePicker,
  message,
  Dropdown,
  Menu,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";
import dayjs, { Dayjs } from "dayjs";
import { EllipsisVertical } from "lucide-react";

import { config } from "#/config/app";
import { useOrder } from "#/hooks/order";
import { capitalize } from "#/utils/capitalize";
import { TableProps } from "antd/lib";
import { HiEllipsisVertical, HiOutlineEye } from "react-icons/hi2";
import { EditOutlined } from "@ant-design/icons";
import OrderDetailModal from "#/components/common/modal/OrderDetailModal";

const { MonthPicker } = DatePicker;

type OrderStatus =
  | "confirmed"
  | "allocated"
  | "picking_up"
  | "picked"
  | "dropping_off"
  | "delivered";

type OrderStatusFlow = {
  [K in OrderStatus]: K extends "delivered" ? null : OrderStatus;
};

const ORDER_STATUS_FLOW: OrderStatusFlow = {
  confirmed: "allocated",
  allocated: "picking_up",
  picking_up: "picked",
  picked: "dropping_off",
  dropping_off: "delivered",
  delivered: null,
};
export const formatStatus = (status: string): string => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
export default function OrderPage() {
  const useStyle = createStyles(({ css }) => ({
    customTable: css`
      .ant-table {
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  }));

  const [openModal, setOpenModal] = useState(false);
  const [openModalExport, setOpenModalExport] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState<Order>();

  const { styles } = useStyle();
  const { fetchOrder, updateStatus } = useOrder();
  const { order, isError, isLoading } = fetchOrder();

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await updateStatus(
        orderId,
        newStatus == "allocated" ? "allocate" : newStatus
      );
      message.success("Status updated successfully!");
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    return ORDER_STATUS_FLOW[currentStatus];
  };

  const getActionMenu = (record: Order) => {
    const nextStatus = getNextStatus(record.status as OrderStatus);

    return (
      <Menu>
        <Menu.Item key="1">
          <Button
            className="flex items-center justify-start text-sm"
            icon={<HiOutlineEye size={16} />}
            type="text"
            block
            onClick={() => {
              setOpenModal(true);
              setDataOrder(record);
            }}
          >
            View Details
          </Button>
        </Menu.Item>
        {nextStatus && (
          <Menu.Item key="2">
            <Button
              className="flex items-center justify-start text-sm"
              icon={<EditOutlined />}
              type="text"
              block
              onClick={() => handleStatusChange(record.referenceId, nextStatus)}
            >
              Update to {formatStatus(nextStatus)}
            </Button>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const handleExport = async () => {
    if (!selectedMonth) {
      message.error("Please select a month");
      return;
    }

    try {
      setExportLoading(true);

      const month = selectedMonth.format("MM");
      const year = selectedMonth.format("YYYY");

      const response = await fetch(
        `${config.apiUrl}/order/export/excel?month=${month}&year=${year}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return message.error(
          `Failed to export orders: No orders found for the given period`
        );
      }

      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Order_Export_${year}_${month}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setOpenModal(false);
      message.success("Export completed successfully");
    } catch (error: any) {
      console.error("Export error:", error);
      message.error(`Failed to export orders`);
    } finally {
      setExportLoading(false);
    }
  };

  if (isError) return <div>Failed to load</div>;
  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <div className="rounded-md size-16 aspect-square bg-zinc-50">
            <Image
              className="size-full"
              preview={false}
              alt={`${
                record.orderItems.find(
                  (item) => item.productDetail.product.name
                )?.productDetail.product.name
              }`}
              src={`
								${config.apiUrl}/product/uploads/
								${
                  record.orderItems[0].productDetail.product.productPhotos.find(
                    (p) => p.photoType == "front"
                  )?.image
                }`}
            />
          </div>
          <div className="flex gap-3 2xl:gap-5">
            <div className="flex-1 min-w-0 ms-4">
              <p className="mb-1 text-sm font-medium text-gray-800 2xl:text-sm line-clamp-1">
                {
                  record.orderItems.find(
                    (item) => item.productDetail.product.brand.name
                  )?.productDetail.product.brand.name
                }{" "}
                {
                  record.orderItems.find(
                    (item) => item.productDetail.product.name
                  )?.productDetail.product.name
                }
              </p>
              <p className="text-sm text-gray-500 2xl:text-sm line-clamp-2">
                Rp. {record.order_total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Customer",
      key: "nama",
      align: "left",
      render: (_, record) => (
        <div>
          <p>{record.address.contact_name}</p>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
      align: "left",
      render: (_, record) => (
        <div>
          <p>
            {capitalize(record.address.city)},{" "}
            {capitalize(record.address.province)}
          </p>
        </div>
      ),
    },
    {
      title: "Purchase Date",
      dataIndex: "order_date",
      key: "order_date",
      align: "left",
      render: (_, record) => (
        <p>{dayjs(record.createdAt).format("DD MMM YYYY, HH:mm")}</p>
      ),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const nextStatus = getNextStatus(record.status as OrderStatus);
        return (
          <Tag className="!rounded-full" color={nextStatus ? "blue" : "green"}>
            {formatStatus(record.status)}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Dropdown
          overlay={getActionMenu(record)}
          placement="bottomCenter"
          className="cursor-pointer"
        >
          <div className="p-3 mx-auto w-fit rounded-xl hover:bg-zinc-100">
            <HiEllipsisVertical className="text-xl" />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="max-h-screen space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-x-3">
          {/* <Select
            className="select-bid"
            defaultValue="Month"
            options={[
              { value: "all", label: "All Product" },
              { value: "sport", label: "Sport" },
              { value: "casual", label: "Casual" },
            ]}
          /> */}
          <DatePicker.MonthPicker 
            placeholder="Select Month"
            defaultValue={dayjs()}
            className="rounded-full"
          />
          
          <Select
            className="select-bid"
            defaultValue="Status"
            options={[
              { value: "confirmed", label: "Confirmed" },
              { value: "pending", label: "Pending" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </div>

        <Button
          type="primary"
          onClick={() => setOpenModalExport(true)}
          className="rounded-full text-xs h-[33px]"
        >
          Export
        </Button>
      </div>

      <Modal
        title="Export Orders"
        open={openModalExport}
        onCancel={() => setOpenModalExport(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpenModalExport(false)}>
            Cancel
          </Button>,
          <Button
            key="export"
            type="primary"
            onClick={handleExport}
            loading={exportLoading}
            disabled={!selectedMonth}
          >
            Download Export
          </Button>,
        ]}
      >
        <div className="py-4">
          <h3 className="mb-2">Select Date Range</h3>
          <MonthPicker
            className="w-full"
            placeholder="Select Month"
            onChange={(date) => setSelectedMonth(date)}
          />
        </div>
      </Modal>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={order}
        scroll={{ y: 120 * 5 }}
        pagination={{ pageSize: 6, position: ["bottomRight"] }}
      />

      <OrderDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        order={dataOrder}
      />
    </div>
  );
}
