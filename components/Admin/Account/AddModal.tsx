import { Button, Form, Input, message, Modal } from "antd";
import React from "react";

interface AddModalProps {
	openModalAdd: boolean;
	setOpenModalAdd: (value: boolean) => void;
	onCreate: (value: any) => void;
	form: any;
}

const AddModal = ({
	openModalAdd,
	setOpenModalAdd,
	onCreate,
	form,
}: AddModalProps) => {
	return (
		<Modal
			footer={[
				<Button
					block
					key="submit"
					type="primary"
					htmlType="submit"
					className="h-11"
				>
					Add Data
				</Button>,
			]}
			open={openModalAdd}
			title="Add Data Admin"
			okText="Save"
			cancelText="Cancel"
			okButtonProps={{ autoFocus: true, htmlType: "submit" }}
			onCancel={() => setOpenModalAdd(false)}
			destroyOnClose
			modalRender={(dom) => (
				<Form
					layout="vertical"
					form={form}
					name="form_in_modal"
					clearOnDestroy
					onFinish={(values) => onCreate(values)}
				>
					{dom}
				</Form>
			)}
		>
			<div className="py-6">
				<div className="flex justify-between gap-4">
					<Form.Item
						className="grow"
						name="name"
						label="Name"
						rules={[{ message: "Please input your full name!" }]}
					>
						<Input className="h-10 " placeholder="Full name" />
					</Form.Item>
					<Form.Item
						className="grow"
						name="email"
						label="Email"
						rules={[
							{ message: "Please input your email!" },
							{
								type: "email",
								message: "Please enter a valid email",
							},
						]}
					>
						<Input className="h-10 " placeholder="Enter your email address" />
					</Form.Item>
				</div>
				<div className="flex justify-between gap-4">
					<Form.Item
						className="grow mb-0"
						name="phoneNumber"
						label="Phone Number"
						rules={[
							{ message: "Please input your phone number!" },
							{
								pattern: new RegExp(/^[0-9]+$/),
								message: "Phone number must be digits only.",
							},
							{
								min: 10,
								message: "Phone number must be at least 10 digits long.",
							},
						]}
					>
						<Input className="h-10 " placeholder="Enter your phone number" />
					</Form.Item>
					<Form.Item className="grow mb-0" name="password" label="Password">
						<Input.Password className="h-10 " placeholder="Password" />
					</Form.Item>
				</div>
			</div>
		</Modal>
	);
};

export default AddModal;
