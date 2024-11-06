import { Button, Form, Input, Select, DatePicker, Modal } from "antd";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import PriceInput from "../input/PriceInput";

interface ModalProps {
	open: boolean;
	onCancel: () => void;
	isEditing: boolean;
	product: Product[] | undefined;
	postBid: any;
	setOpenModal: (values: false) => void;
	setIsEditing: (values: false) => void;
	editData: Bid | undefined;
	setEditData: (values: Bid | undefined) => void;
	form: any;
}

const BidModal = ({ open, onCancel, product, postBid, isEditing, setIsEditing, setOpenModal, form, editData, setEditData }: ModalProps) => {
	const [tab, setTab] = useState("description");
	const [selectedId, setSelectedId] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (editData && isEditing) {
			form.setFieldsValue({
				productId: editData.productName,
				size: editData.productDetail.size,
				price: editData.start_price,
				date_range: [
					dayjs(editData.start_date), 
					dayjs(editData.end_date)
				],
			});
		} else {
			form.resetFields();
		}
	}, [editData, isEditing, form]);

	const handleDateChange = (dates: any) => {
		if (dates && dates.length === 2) {
			const [startDate, endDate] = dates;
			form.setFieldsValue({
				start_date: startDate,
				end_date: endDate,
			});
		} else {
			form.setFieldsValue({
				start_date: null,
				end_date: null,
			});
		}
	};

	const onFinish = async (values: any) => {
		try {
			setLoading(true);
			const payload = {
				productDetailId: values.size,
				start_date: dayjs(values.start_date).format(),
				end_date: dayjs(values.end_date).format(),
				start_price: Number(values.price),
			};
			if (isEditing) {
				console.log(values.productId, values)
			} else {
				await postBid(payload);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setOpenModal(false);
			setLoading(false);
			setSelectedId(undefined);
			form.resetFields();
			if (isEditing) {
				setIsEditing(false);
				setEditData(undefined);
			}
		}
	};

	return (
		<Modal
			footer={[
				<Button
					key={""}
					block
					loading={loading}
					type="primary"
					htmlType="submit"
					className="h-10"
				>
					{isEditing ? "Update Data" : "Add Data"}
				</Button>,
			]}
			open={open}
			onCancel={() => onCancel()}
			title={isEditing ? "Edit Bid Data" : "Add Bid Data"}
			destroyOnClose
			modalRender={(dom) => (
				<Form
					form={form}
					onFinish={(values) => onFinish(values)}
					layout="vertical"
					requiredMark={false}
					className="p-6 mx-auto flex flex-col justify-between h-full gap-4"
				>
					{dom}
				</Form>
			)}
		>
			<div className="space-y-4 py-4">
				<div className="flex items-center">
					<Button
						className="flex-1 h-9"
						type={tab == "description" ? "primary" : "text"}
						onClick={() => setTab("description")}
					>
						Description
					</Button>
					<Button
						className="flex-1 h-9"
						type={tab == "stock" ? "primary" : "text"}
						onClick={() => setTab("stock")}
						disabled
					>
						Participant
					</Button>
				</div>

				<div className={tab == "description" ? "block space-y-3" : "hidden"}>
					{isEditing && (
						<Form.Item hidden name="productId">
							<Input type="text" hidden />
						</Form.Item>
					)}

					<Form.Item
						name="productId"
						label="Product"
						rules={[{ required: true, message: "Please select a product" }]}
					>
						<Select
							className="h-9"
							placeholder="Select a product"
							showSearch
							filterOption={(input, option) =>
								(option?.label ?? "")
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? "")
									.toLowerCase()
									.localeCompare((optionB?.label ?? "").toLowerCase())
							}
							options={
								product &&
								product.map((data) => ({ value: data.id, label: data.name }))
							}
							onChange={(data) => setSelectedId(data)}
						/>
					</Form.Item>

					{selectedId && (
						<Form.Item
							name="size"
							label="Size"
							rules={[{ required: true, message: "Please select a size" }]}
						>
							<Select
								className="h-9"
								placeholder="Select a size"
								options={
									product &&
									product
										.find((p) => p.id == selectedId)
										?.productDetails.sort((a, b) => a.size - b.size)
										.map((data) => ({
											value: data.id,
											label: data.size,
											disabled: data.stock <= 0,
										}))
								}
							/>
						</Form.Item>
					)}

					{/* <Form.Item
						name="price"
						label="Price"
						initialValue={0}
						rules={[{ required: true, message: "Please input product price" }]}
					>
						<Input
							style={{ height: "40px" }}
							type="number"
							addonBefore="Rp"
							placeholder="Enter your product price"
							className="price-input"
						/>
					</Form.Item> */}

					<PriceInput
						currencyPrefix="Rp"
						label="Price"
						name="price"
						placeholder="Enter your product price"
						required
					/>

					<Form.Item
						name="date_range"
						label="Select Date & Time Range"
						rules={[{ required: true, message: "Please select date" }]}
					>
						<DatePicker.RangePicker
							showTime
							format="YYYY-MM-DD HH:mm"
							onChange={handleDateChange}
							className="h-9 w-full"
						/>
					</Form.Item>

					<Form.Item name="start_date" hidden>
						<input type="hidden" />
					</Form.Item>
					<Form.Item name="end_date" hidden>
						<input type="hidden" />
					</Form.Item>

					{/* <Form.Item
						name="status"
						label="Status"
						rules={[
							{ required: true, message: "Please select product status" },
						]}
					>
						<Select
							placeholder="Set bid status"
							className="h-9"
							defaultValue={"available"}
							options={[
								{ value: "available", label: "Available" },
								{ value: "cancelled", label: "Cancelled" },
							]}
						/>
					</Form.Item> */}
				</div>
			</div>
		</Modal>
	);
};

export default BidModal;
