import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

interface EditModalProps {
	openModalEdit: boolean;
	setOpenModalEdit: (value: boolean) => void;
	onCreate: (value: any) => void;
    handleChange: (value: string) => void;
	form: any;
}

const EditModal = ( { openModalEdit, setOpenModalEdit, onCreate, form, handleChange } : EditModalProps ) => {
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
					Save
				</Button>,
			]}
			open={openModalEdit}
			title="Edit Data Admin"
			okButtonProps={{ autoFocus: true, htmlType: "submit" }}
			onCancel={() => setOpenModalEdit(false)}
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
			<Form.Item
				className="mb-5 mt-6"
				name="name"
				label="Name"
				rules={[{ message: "Please input the title of collection!" }]}
			>
				<Input className="h-10" placeholder="Full name" />
			</Form.Item>
			<div className="flex justify-between gap-4">
				<Form.Item className="grow" name="phoneNumber" label="Phone Number">
					<Input className="h-10 " placeholder="Enter your phone number" />
				</Form.Item>
				<Form.Item className="grow" name="status" label="Status">
					<Select
						className="w-1/2 h-10"
						defaultValue="Active"
						onChange={handleChange}
						options={[
							{ value: "active", label: "Active" },
							{ value: "deactive", label: "Deactive" },
						]}
					/>
				</Form.Item>
			</div>
		</Modal>
	);
};

export default EditModal;
