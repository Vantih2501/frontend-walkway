"use client"
import { useBrand } from "#/hooks/brand";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, UploadFile } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  onFinish: (value: any) => void;
  onCancel: () => void;
  form: any;
  loading: boolean;
  isEditing: boolean;
  brand?: Brand;
}

const BrandModalForm = ({ open, onFinish, onCancel, form, loading, brand, isEditing }: ModalProps) => {
  useEffect(() => {
    if (brand && isEditing) {
      form.setFieldsValue({
        id: brand.id,
        name: brand.name,
        status: brand.status
      });
    } else {
      form.resetFields();
    }
  }, [brand, isEditing, form]);

  const [image, setImage] = useState<string | undefined>()

  const { uploadImage } = useBrand()

  const handleUpload = async (file: UploadFile) => {
    const response = await uploadImage(file);
    if (!response) return;

    setImage(response.imageUrl);
  };


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
      title={isEditing ? "Edit Brand Data" : "Add Brand Data"}
      onCancel={() => {
        onCancel();
        setImage(undefined);
      }}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          onFinish={(values) => {
            onFinish({
              ...values,
              image
            });
            setImage(undefined)
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
          label="Brand Name"
          rules={[{ required: true, message: "Please input brand name!" }]}
        >
          <Input className="h-10" placeholder="Enter brand name" />
        </Form.Item>
        {!isEditing && (
          <Form.Item rules={[{ required: true, message: "Please upload at least 1 image" }]}>
            <Dragger
              beforeUpload={() => false}
              maxCount={1}
              onChange={(info) => {
                handleUpload(info.file);
              }}
              accept="image/*"
              listType="picture"
              className="upload-list-inline"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag images to upload
              </p>
            </Dragger>
          </Form.Item>
        )}
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

export default BrandModalForm;
