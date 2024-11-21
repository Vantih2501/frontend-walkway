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
} from "antd";
import { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";
import dayjs, { Dayjs } from "dayjs";
import { EllipsisVertical } from "lucide-react";

import { config } from "#/config/app";
import { useOrder } from "#/hooks/order";
import { capitalize } from "#/utils/capitalize";

const { MonthPicker } = DatePicker;

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
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  const { styles } = useStyle();
  const { fetchOrder } = useOrder();
  const { order, isError, isLoading } = fetchOrder();

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

  const columns: ColumnsType<Order> = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => {
        const firstItem = record.orderItems[0];
        const firstProduct = firstItem?.productDetail?.product;
        const frontPhoto = firstProduct?.productPhotos?.find(
          (p) => p.photoType === "front"
        );

        return (
          <div className="flex items-center">
            <div className="rounded-md size-16 aspect-square bg-zinc-50">
              <Image
                className="bg-white size-full"
                preview={false}
                alt={firstProduct?.name || "Product"}
                src={
                  frontPhoto
                    ? `${config.apiUrl}/product/uploads/${frontPhoto.image}`
                    : "/default-product.png"
                }
              />
            </div>
            <div className="flex gap-3 2xl:gap-5">
              <div className="flex-1 min-w-0 ms-4">
                <p className="mb-1 text-sm font-medium text-gray-800 2xl:text-sm line-clamp-1">
                  {firstProduct?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500 2xl:text-sm line-clamp-2">
                  Rp. {record.order_total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        );
      },
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
      render: (_, record) => (
        <Tag
          className="!rounded-full"
          color={record.status == "confirmed" ? "green" : "red"}
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EllipsisVertical />} type="default" />
        </Space>
      ),
    },
  ];

  return (
    <div className="max-h-screen space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-x-3">
          <Select
            className="select-bid"
            defaultValue="Month"
            options={[
              { value: "all", label: "All Product" },
              { value: "sport", label: "Sport" },
              { value: "casual", label: "Casual" },
            ]}
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
          onClick={() => setOpenModal(true)}
          className="rounded-full text-xs h-[33px]"
        >
          Export
        </Button>
      </div>

      <Modal
        title="Export Orders"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpenModal(false)}>
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
        scroll={{ y: 100 * 5 }}
        pagination={false}
      />
    </div>
  );
}
