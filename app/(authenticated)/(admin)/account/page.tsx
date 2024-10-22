"use client";

import React, { useState } from "react";
import { Avatar, Button, Dropdown, Form, Input, Modal, Space, Table, Tag } from "antd";
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
	name: string;
	email: string;
	phoneNumber: string;
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
		title: "Name",
		dataIndex: "name",
		width: 300,
		key: "name",
		render: (text) => text,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Phone Number",
		dataIndex: "phoneNumber",
		key: "phoneNumber",
	},
	{
		title: "Status",
		key: "tags",
		dataIndex: "tags",
		render: (_, { tags }) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? "orange" : "green";
					if (tag === "Active") {
						color = "green";
					} else {
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
			<Space direction="horizontal" size={4}>
				<Button icon={<MoreOutlined />} type="default" />
				<Button icon={<MoreOutlined />} type="default" />
			</Space>
		),
	},
];

const data: DataType[] = [
	{
		key: "1",
		name: "Farel Widianto",
		email: "farel@gmail.com",
		phoneNumber: "+62 895-0991-4782",
		tags: ["Active"],
	},
	{
		key: "2",
		name: "Nadin",
		email: "nadin@gmail.com",
		phoneNumber: "+62 895-0991-4782",
		tags: ["Active"],
	},
	{
		key: "3",
		name: "Gandara",
		email: "gandara@gmail.com",
		phoneNumber: "+62 895-0991-4782",
		tags: ["Active"],
	},
	{
		key: "4",
		name: "Aril",
		email: "aril@gmail.com",
		phoneNumber: "+62 895-0991-4782",
		tags: ["Active"],
	},
	{
		key: "5",
		name: "rizky Widianto",
		email: "rizky@gmail.com",
		phoneNumber: "+62 895-0991-4782",
		tags: ["Active"],
	},
];

const App: React.FC = () => {
	const { styles } = useStyle();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	return (
		<div className="space-y-5">
			<Button
				type={"primary"}
				className="rounded-md text-xs h-[33px]"
				onClick={showModal}
			>
				+ Admin
			</Button>
			<Modal title="Add Data Admin" open={isModalOpen} footer={false}>
				<Form>
					<Form.Item label={"Name"} layout="vertical">
						<Input placeholder="Enter name" className="h-11"/>
					</Form.Item>
				</Form>
			</Modal>
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
