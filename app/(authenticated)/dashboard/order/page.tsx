import { useOrder } from "#/hooks/order";
import { Button, Select, Table, TableProps } from "antd";
import { createStyles } from "antd-style";

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
  
  const columns: TableProps<Order[]>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      width: 300,
      key: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <div className="rounded-md size-16 aspect-square bg-zinc-50">
            <Image
              className="size-full"
              preview={false}
              src={`${config.apiUrl}/product/uploads/${
                record.productDetail.product.productPhotos.find(
                  (p) => p.photoType == "front"
                )?.image
              }`}
            />
          </div>
          <div className="flex gap-3 2xl:gap-5">
            <div className="flex-1 min-w-0 ms-4">
              <p className="mb-1 text-sm font-medium text-gray-800 2xl:text-sm line-clamp-1">
                {record.productName}
              </p>
              <p className="text-sm text-gray-500 2xl:text-sm line-clamp-2">
                Rp. {record.start_price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Starting Price",
      dataIndex: "start_price",
      key: "start_price",
      align: "left",
      render: (_, record) => (
        <p>Rp. {record.start_price.toLocaleString("id-ID")}</p>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (_, record) => (
        <p>{dayjs(record.start_date).format("DD MMM YYYY: HH:mm")}</p>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (_, record) => (
        <p>{dayjs(record.end_date).format("DD MMM YYYY: HH:mm")}</p>
      ),
    },
    // {
    // 	title: "Status",
    // 	key: "status",
    // 	dataIndex: "status",
    // 	align: "center",
    // 	render: (status) => (
    // 		<Tag color={status === "available" ? "green" : "red"}>{status}</Tag>
    // 	),
    // },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => {
              setIsEditing(true);
              setOpenModal(true);
              setEditData(record);
            }}
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

  const {styles} = useStyle();

  return (
		<div className="max-h-screen space-y-5">
			<div className="flex justify-between items-center">
				<div className="space-x-3">
					<Select
						className="select-bid"
						defaultValue="all"
						options={[
							{ value: "all", label: "All Product" },
							{ value: "sport", label: "Sport" },
							{ value: "casual", label: "Casual" },
						]}
					/>
					<Select
						className="select-bid"
						defaultValue="all"
						options={[
							{ value: "all", label: "All Brand" },
							{ value: "nike", label: "Nike" },
							{ value: "adidas", label: "Adidas" },
						]}
					/>
				</div>

				<Button
					type={"primary"}
					className="rounded-full text-xs h-[33px]"
				>
					Export
				</Button>
			</div>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={data}
        scroll={{ y: 100 * 5 }}
        pagination={false}
      />
		</div>
	);
}
