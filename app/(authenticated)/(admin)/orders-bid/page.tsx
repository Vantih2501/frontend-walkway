"use client";

import React, { useState } from "react";
import { Avatar, Button, Dropdown, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

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

interface DataType {
	key: string;
	product: string;
	winner: string;
	startingPrice: string;
	startDate: string;
	endDate: string;
	tags: string[];
}

const items: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.antgroup.com"
			>
				Edit
			</a>
		),
	},
	{
		key: "2",
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.antgroup.com"
			>
				Delete
			</a>
		),
	},
];

const columns: TableProps<DataType>["columns"] = [
	{
		title: "Product",
		dataIndex: "product",
		width: 300,
		key: "product",
		render: (text, record) => (
			<div className="flex items-center">
				<div className="size-16 aspect-square bg-zinc-50 rounded-md">
					<Avatar
						className="size-full"
						src={"/mock/shoe-mock-1.png"}
						shape="square"
					/>
				</div>
				<div className="flex gap-3 2xl:gap-5">
					<div className="flex-1 min-w-0 ms-4">
						<p className="text-sm 2xl:text-sm text-gray-800 font-medium line-clamp-1 mb-1">
							{text}
						</p>
						<p className="text-sm 2xl:text-sm text-gray-500 line-clamp-2">
							{record.startingPrice}
						</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Winner",
		dataIndex: "winner",
		key: "winner",
	},
	{
		title: "Starting Price",
		dataIndex: "startingPrice",
		key: "startingPrice",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
	},
	{
		title: "Status",
		key: "tags",
		dataIndex: "tags",
		render: (_, { tags }) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? "orange" : "green";
					if (tag === "Lose") {
						color = "red";
					}
					return (
						<Tag
							color={color}
							style={{
								borderRadius: "30px",
								borderColor: "transparent",
								fontWeight: "500",
							}}
							key={tag}
						>
							{tag}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: "Action",
		key: "action",
		render: (_, record) => (
			<Dropdown menu={{ items }} placement="bottom">
				<Button icon={<MoreOutlined />} type="text" />
			</Dropdown>
		),
	},
];

const data: DataType[] = [
	{
		key: "1",
		product: "New Balance white shoes",
		winner: "Asep Balon",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Win"],
	},
	{
		key: "2",
		product: "Nike shark series, black accent",
		winner: "Farel Prayoga",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Lose"],
	},
	{
		key: "3",
		product: "Adidas Air Jordan Limited",
		winner: "Mulyono",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Ongoing"],
	},
	{
		key: "4",
		product: "New Balance white shoes",
		winner: "Asep Balon",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Win"],
	},
	{
		key: "5",
		product: "Nike shark series, black accent",
		winner: "Farel Prayoga",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Lose"],
	},
	{
		key: "6",
		product: "New Balance white shoes",
		winner: "Asep Balon",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Win"],
	},
	{
		key: "7",
		product: "Nike shark series, black accent",
		winner: "Farel Prayoga",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Lose"],
	},
	{
		key: "8",
		product: "Adidas Air Jordan Limited",
		winner: "Mulyono",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Ongoing"],
	},
	{
		key: "9",
		product: "New Balance white shoes",
		winner: "Asep Balon",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Win"],
	},
	{
		key: "10",
		product: "Nike shark series, black accent",
		winner: "Farel Prayoga",
		startingPrice: "Rp. 2,500,000",
		startDate: "06 Sep 2024, 09:19",
		endDate: "06 Sep 2024, 12:19",
		tags: ["Lose"],
	},
];

const App: React.FC = () => {
	const { styles } = useStyle();
	const [ activeButton, setActiveButton ] = useState<string | null>(null)

	const handleFilterClick = (buttonName: string) => {
		setActiveButton(buttonName);
	}

	return (
		<div className="space-y-5">
		<Space direction="horizontal" size={10}>
			<Button type={ activeButton === "all" ? "primary" : "default" } className="rounded-full" onClick={() => handleFilterClick('all')}>All</Button>
			<Button type={ activeButton === "startDate" ? "primary" : "default" } className="rounded-full" onClick={() => handleFilterClick('startDate')}>Start Date</Button>
			<Button type={ activeButton === "endDate" ? "primary" : "default" } className="rounded-full" onClick={() => handleFilterClick('endDate')}>End Date</Button>
			<Button type={ activeButton === "status" ? "primary" : "default" } className="rounded-full" onClick={() => handleFilterClick('status')}>Status</Button>
		</Space>
		<Table<DataType>
			className={styles.customTable}
			columns={columns}
			dataSource={data}
			scroll={{ y: 120 * 5 }}
			pagination={false}
		/>
		</div>
	);
};

export default App;
