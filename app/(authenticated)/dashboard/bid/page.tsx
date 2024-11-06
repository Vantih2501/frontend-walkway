"use client";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Form,
	Image,
	Input,
	Modal,
	Select,
	Space,
	Spin,
	Table,
	TableProps,
	Tag,
	Upload,
} from "antd";
import { useState } from "react";
import { useProduct } from "#/hooks/product";
import { useBid } from "#/hooks/bid";
import { BidCardAdmin } from "#/components/common/card/BidCard";
import dayjs from "dayjs";

import { createStyles } from "antd-style";
import BidModal from "#/components/common/modal/BidModal";
import { config } from "#/config/app";
const { Dragger } = Upload;

export default function Bid() {
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

	const [openModal, setOpenModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Bid | undefined>();
	const { styles } = useStyle();
	const [form] = Form.useForm();

	const columns: TableProps<Bid>["columns"] = [
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
							src={`${config.apiUrl}/product/uploads/${record.productDetail.product.productPhotos.find((p) => p.photoType == 'front')?.image}`}
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

	const onCancel = () => {
		setOpenModal(false);
		setEditData(undefined);
		setIsEditing(false);
		form.resetFields();
	}

	const { fetchBids, postBid } = useBid();
	const { fetchProduct } = useProduct();

	const { bids, isLoading, isError } = fetchBids();
	const { product } = fetchProduct();

	if (isLoading) {
		return (
			<div className="w-full h-[80vh] flex items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return (
		// <div className="flex gap-x-3 max-h-screen">
		//   <div
		//     className={classNames(
		//       "space-y-4 transition-all duration-300 ease-in-out",
		//       { "w-3/4": showForm, "w-full": !showForm }
		//     )}
		//   >
		//     <div className="flex justify-between items-center">
		//       <div className="space-x-3">
		//         <Select
		//           defaultValue="all"
		//           options={[
		//             { value: "all", label: "All Product" },
		//             { value: "sport", label: "Sport" },
		//             { value: "casual", label: "Casual" },
		//           ]}
		//           className="!rounded-full"
		//         />
		//         <Select
		//           defaultValue="all"
		//           options={[
		//             { value: "all", label: "All Brand" },
		//             { value: "nike", label: "Nike" },
		//             { value: "adidas", label: "Adidas" },
		//           ]}
		//         />
		//       </div>

		//       <Button
		//         type="primary"
		//         icon={<PlusOutlined />}
		//         onClick={() => {
		//           if (!showForm && !isEditing) {
		//             setShowForm(true)
		//           }
		//           if (showForm && !isEditing) {
		//             setShowForm(false);
		//             setTimeout(() => {
		//               form.resetFields()
		//             }, 500);
		//           }
		//           if (showForm && isEditing) {
		//             setShowForm(false)
		//             setTimeout(() => {
		//               setIsEditing(false)
		//               setEditData(undefined)
		//               form.resetFields()
		//               setShowForm(true)
		//             }, 500);
		//           }
		//         }}
		//         className="rounded-full"
		//       >
		//         Add Bid
		//       </Button>
		//     </div>

		//     <div
		//       className={classNames(
		//         "grid gap-3 transition-all duration-300 ease-in-out",
		//         {
		//           "grid-cols-3": showForm,
		//           "grid-cols-4": !showForm,
		//         }
		//       )}
		//     >
		//       {bids && bids.map((bid) => (
		//         <BidCardAdmin
		//           bid={bid}
		//           key={bid.id}
		//         />
		//       ))}
		//     </div>
		//   </div>

		//   <div
		//     className={classNames(
		//       "transition-all duration-300 ease-in-out overflow-hidden rounded-xl overflow-y-auto no-scrollbar",
		//       {
		//         "w-1/4 border": showForm,
		//         "w-0": !showForm,
		//       }
		//     )}
		//   >
		//     <Form form={form} onFinish={(values) => onFinish(values)} className="py-6 px-2 mx-auto flex flex-col justify-between h-full gap-4" layout="vertical" requiredMark={false}>
		//       <div className="space-y-3">
		//         <h2 className="font-medium tracking-wide text-lg">
		//           {isEditing ? "Edit Bid" : "Add Bid"}
		//         </h2>
		//         <div className="flex items-center">
		//           <Button
		//             className="flex-1"
		//             type={tab == "description" ? "primary" : "text"}
		//             onClick={() => setTab("description")}
		//           >
		//             Description
		//           </Button>
		//           <Button
		//             className="flex-1"
		//             type={tab == "stock" ? "primary" : "text"}
		//             onClick={() => setTab("stock")}
		//             disabled
		//           >
		//             Participant
		//           </Button>
		//         </div>

		//         <div className={tab == 'description' ? "block space-y-2.5" : 'hidden'}>
		//           {isEditing && (
		//             <Form.Item
		//               hidden
		//               name="productId"
		//             >
		//               <Input
		//                 type="text"
		//                 hidden
		//               />
		//             </Form.Item>
		//           )}

		//           <Form.Item
		//             name="productId"
		//             label="Product"
		//             rules={[{ required: true, message: "Please select a product" }]}
		//           >
		//             <Select
		//               placeholder="Select a product"
		//               showSearch
		//               filterOption={(input, option) =>
		//                 (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
		//               }
		//               filterSort={(optionA, optionB) =>
		//                 (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
		//               }
		//               options={product && product.map((data) => ({ value: data.id, label: data.name }))}
		//               onChange={(data) => setSelectedId(data)}
		//             />
		//           </Form.Item>

		//           {selectedId && (
		//             <Form.Item
		//               name="size"
		//               label="Size"
		//               rules={[{ required: true, message: "Please select a size" }]}
		//             >
		//               <Select
		//                 placeholder="Select a size"
		//                 options={product && product.find((p) => p.id == selectedId)?.productDetails.sort((a, b) => a.size - b.size).map((data) => ({ value: data.id, label: data.size, disabled: data.stock <= 0 }))}
		//               />
		//             </Form.Item>
		//           )}

		//           <Form.Item
		//             name="price"
		//             label="Price"
		//             rules={[{ required: true, message: "Please input product price" }]}
		//           >
		//             <Input
		//               type="number"
		//               addonBefore="Rp"
		//               placeholder="Enter your product price"
		//               className="price-input"
		//             />
		//           </Form.Item>

		//           <Form.Item
		//             name="date-range"
		//             label="Select Date & Time Range"
		//             rules={[{ required: true, message: "Please select date" }]}
		//           >
		//             <DatePicker.RangePicker
		//               showTime
		//               format="YYYY-MM-DD HH:mm"
		//               onChange={handleDateChange}
		//               className="w-full"
		//             />
		//           </Form.Item>

		//           <Form.Item name="start_date" hidden>
		//             <input type="hidden" />
		//           </Form.Item>
		//           <Form.Item name="end_date" hidden>
		//             <input type="hidden" />
		//           </Form.Item>
		//         </div>
		//       </div>
		//       <div className="flex items-center gap-1">
		//         <Button
		//           className="flex-1 py-4"
		//           variant="filled"
		//           onClick={() => {
		//             setShowForm(false);
		//             setEditData(undefined);
		//             setIsEditing(false);
		//             form.resetFields()
		//           }}
		//         >
		//           Discard
		//         </Button>
		//         <Button
		//           className="flex-1 py-4"
		//           type="primary"
		//           htmlType="submit"
		//           loading={loading}
		//         >
		//           Save Changes
		//         </Button>
		//       </div>
		//     </Form>
		//   </div>
		// </div>

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
					onClick={() => {
						setOpenModal(true), setIsEditing(false), form.resetFields();
					}}
					icon={<PlusOutlined size={14} />}
				>
					Add Bid
				</Button>
			</div>

			<BidModal
				open={openModal}
				onCancel={onCancel}
				isEditing={isEditing}
				product={product}
				setOpenModal={setOpenModal}
				setIsEditing={setIsEditing}
				postBid={postBid}
				form={form}
				setEditData={setEditData}
				editData={editData}
			/>

			{bids && (
				<Table
					className={styles.customTable}
					columns={columns}
					dataSource={bids}
					scroll={{ y: 100 * 5 }}
					pagination={false}
				/>
			)}
		</div>
	);
}
