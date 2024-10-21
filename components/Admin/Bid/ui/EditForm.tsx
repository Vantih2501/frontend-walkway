import { Form, Input, Select, Space, TimePicker } from "antd";
import React from "react";
import { products } from "#/mock-data/products";

const EditForm = () => {
	return (
		<Form  className="flex flex-col justify-between">
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
				<Form.Item
					layout="vertical"
					label="Set Status"
					name="SetStatus"
					rules={[{ message: "Please input!" }]}
				>
					<Select placeholder="Select Product"  style={{ height: "36px" }}>
							<Select.Option value="ongoing">
								<p>Ongoing</p>
							</Select.Option>
							<Select.Option value="finish">
								<p>Finish</p>
							</Select.Option>
					</Select>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default EditForm;
