"use client";

import { products } from "#/mock-data/products";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Select, Input, Space, DatePicker, Upload } from "antd";
import React from "react";

const AddForm = () => {

	return (
		<Form>
			<Form.Item label="Product" layout="vertical" className="mb-4">
				<Select placeholder="Select Product">
					{products.slice(0, 5).map((product) => (
						<Select.Option value="demo" key={product.id}>
							{product.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Price" layout="vertical" className="mb-4">
				<Input prefix={"Rp"} placeholder="Starting price" />
			</Form.Item>
			<Form.Item
				layout="vertical"
				label="Set Time"
				name="SetTime"
				rules={[{ message: "Please input!" }]}
			>
				<div className="flex justify-between gap-2">
					<DatePicker style={{ width: "100%" }} placeholder="Start" />
					<DatePicker style={{ width: "100%" }} placeholder="End" />
				</div>
			</Form.Item>
		</Form>
	);
};

export default AddForm;
