"use client";

import { products } from "#/mock-data/products";
import { PlusOutlined } from "@ant-design/icons";
import {
	Form,
	Select,
	Input,
	Space,
	DatePicker,
	Upload,
	Button,
	TimePicker,
} from "antd";
import React from "react";

const AddForm = () => {
	return (
		<Form className="flex flex-col justify-between">
			<Space size={20} direction="vertical" style={{ display: "flex" }}>
				<Form.Item label="Product" layout="vertical">
					<Select placeholder="Select Product" style={{ height: "36px" }}>
						{products.slice(0, 5).map((product) => (
							<Select.Option value="demo" key={product.id}>
								{product.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Price" layout="vertical">
					<Input
						prefix={"Rp"}
						placeholder="Starting price"
						style={{ height: "36px" }}
					/>
				</Form.Item>
				<Form.Item
					layout="vertical"
					label="Set Time"
					name="SetTime"
					rules={[{ message: "Please input!" }]}
				>
					<TimePicker.RangePicker style={{ height: "36px", width: "100%" }} />
					{/* <div className="flex justify-between gap-2">
						<DatePicker style={{ width: "100%" }} placeholder="Start" />
						<DatePicker style={{ width: "100%" }} placeholder="End" />
					</div> */}
				</Form.Item>
			</Space>
		</Form>
	);
};

export default AddForm;
