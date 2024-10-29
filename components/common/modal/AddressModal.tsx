"use client"
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onFinish?: (value: any) => void;
  onCancel: () => void;
  loading?: boolean;
  isEditing?: boolean;
  address?: Address;
}

const AddressModalForm = ({ open, onFinish, onCancel, loading, address, isEditing }: ModalProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (address && isEditing) {
      form.setFieldsValue({
        id: address.id,
        contact_name: address.contact_name,
        contact_number: address.contact_number,
        province: address.province,
        city: address.city,
        district: address.district,
        zipcode: address.zipcode,
        address: address.address,
        note: address.note
      });
    } else {
      form.resetFields();
    }
  }, [address, isEditing, form]);


  return (
    <Modal
      footer={[
        <Button
          block
          loading={loading}
          type="primary"
          htmlType="submit"
          className="h-11"
        >
          {isEditing ? "Update Data" : "Add Data"}
        </Button>,
      ]}
      open={open}
      title={isEditing ? "Edit Address Data" : "Add Address Data"}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          requiredMark="optional"
          onFinish={(values) => {

          }}
        >
          {dom}
        </Form>
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        {isEditing && (
          <Form.Item
            name="id"
            hidden
          >
            <Input hidden />
          </Form.Item>
        )}
        <Form.Item
          name="contact_name"
          label="Contact Info"
          rules={[{ required: true, message: "Please input contact name!" }]}
        >
          <Input className="h-10" placeholder="Enter contact name" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label
          rules={[{ required: true, message: "Please input your phone number" }]}
        >
          <Input
            type="number"
            addonBefore="+62"
            placeholder="Enter your Phone Number"
            className="phone-input"
          />
        </Form.Item>
      </div>
    </Modal>
  );
};

export default AddressModalForm;
