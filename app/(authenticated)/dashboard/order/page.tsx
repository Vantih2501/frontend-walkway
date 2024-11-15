"use client";

import { config } from "#/config/app";
import { useOrder } from "#/hooks/order";
import { capitalize } from "#/utils/capitalize";
import {
  Button,
  Select,
  Table,
  TableProps,
  Image,
  Tag,
  Spin,
  Space,
} from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";

export default function Order() {
  const useStyle = createStyles(({ css }) => {
    return {
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
    };
  });

  const { styles } = useStyle();
  const { fetchOrder } = useOrder();
  const { order, isError, isLoading } = fetchOrder();

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
              className="bg-white size-full"
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
      title: "Purcase Date",
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
          <Button
    				icon={<EllipsisVertical />}
    				type="default"
    				// onClick={() => {
    				// 	setIsEditing(true);
    				// 	setOpenModal(true);
    				// 	setEditData(record);
    				// }}
    			/>
          {/* <Button
      icon={<DeleteOutlined />}
      type="default"
      onClick={() => confirmDelete(record.id)}
    /> */}
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
              { value: "casual", label: "Casual" },
            ]}
          />
          <Select
            className="select-bid"
            defaultValue="Status"
            options={[
              { value: "confirmed", label: "Comfirmed" },
              { value: "pending", label: "Pending" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </div>

        <Button type={"primary"} className="rounded-full text-xs h-[33px]">
          Export
        </Button>
      </div>

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
