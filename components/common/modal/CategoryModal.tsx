"use client"
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onFinish: (value: any) => void;
  onCancel: () => void;
  form: any;
  loading: boolean;
  isEditing: boolean;
  category?: Category;
}

const CategoryModalForm = ({ open, onFinish, onCancel, form, loading, category, isEditing }: ModalProps) => {
  useEffect(() => {
    if (category && isEditing) {
      form.setFieldsValue({
        id: category.id,
        name: category.name,
        status: category.status
      });
    } else {
      form.resetFields();
    }
  }, [category, isEditing, form]);


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
      title={isEditing ? "Edit Category Data" : "Add Category Data"}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          onFinish={(values) => {
            onFinish(values)
          }}
        >
          {dom}
        </Form>
      )}
    >
      <div className="space-y-2">
        {isEditing && (
          <Form.Item
            name="id"
            hidden
          >
            <Input hidden />
          </Form.Item>
        )}
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input className="h-10" placeholder="Enter category name" />
        </Form.Item>
        {isEditing && (
          <Form.Item
            name="status"
            label="Status"
            className="col-span-2"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select
              placeholder="Select account status"
              className="h-10"
              options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
            />
          </Form.Item>
        )}
      </div>
    </Modal>
  );
};

export default CategoryModalForm;
