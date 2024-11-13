import { config } from "#/config/app";
import { Table, Tag, Image, TableProps } from "antd";
import { createStyles } from "antd-style";
import React from "react";

const DashboardTable = ({ product }: any) => {
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

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      width: 300,
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <div className="rounded-md size-16 aspect-square bg-zinc-50">
            <Image
              alt="product"
              className="size-full"
              preview={false}
              src={`${config.apiUrl}/product/uploads/${
                record.productPhotos.find((p) => p.photoType == "front")?.image
              }`}
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="mb-1 text-xs line-clamp-2">{record.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (_, record) => <p>Rp. {record.price.toLocaleString("id-ID")}</p>,
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
      align: "center",
      render: (_, record) => (
        <p>{record.productDetails.find((p) => p.stock > 0)?.stock}</p>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  const { styles } = useStyle();

  return (
    <div className="w-full p-4 transition-all ease-in-out border rounded-lg border-zinc-300 hover:border-primary hover:shadow-md">
      <h1 className="mb-4 text-base">Stock Product</h1>
      {product && (
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={product}
          scroll={{ y: 40 * 5 }}
          pagination={false}
        />
      )}
    </div>
  );
};

export default DashboardTable;
