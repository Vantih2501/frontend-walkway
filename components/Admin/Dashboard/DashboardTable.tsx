import { config } from "#/config/app";
import { Table, Tag, Image, TableProps, Spin, Empty } from "antd";
import { createStyles } from "antd-style";
import { useProduct } from "#/hooks/product";
import React from "react";

const DashboardTable = () => {
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
						<p className="mb-1 text-base font-medium text-gray-800 2xl:text-sm line-clamp-2">
							{record.name}
						</p>
					</div>
				</div>
			),
		},
		{
			title: "Price",
			key: "price",
			dataIndex: "price",
			align: "center",
			render: (_, record) => <p>{record.price.toLocaleString("id-ID")}</p>,
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
				<Tag color={status === "available" ? "green" : "red"}>{status}</Tag>
			),
		},
	];

    const { styles } = useStyle();
    const { fetchProduct } = useProduct();
    const { product, isLoading } = fetchProduct();

    if (!product) return <Empty />;

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        )
    }

	return (
		<div className="w-full rounded-lg p-4 border border-zinc-300">
            <h1 className="text-lg mb-4">Stock Product</h1>
			{product && (
				<Table
					className={styles.customTable}
					columns={columns}
					dataSource={product}
					scroll={{ y: 100 * 5 }}
					pagination={false}
				/>
			)}
		</div>
	);
};

export default DashboardTable;
