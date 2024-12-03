import { capitalize } from "#/utils/capitalize";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import PhoneNumberInput from "../input/PhoneNumberInput";

interface ModalProps {
  open: boolean;
  onFinish: (value: any) => void;
  onCancel: () => void;
  form: any;
  roles?: Role[];
  loading: boolean;
  userData?: User;
  isEditing: boolean;
}

const AccountModalForm = ({
  open,
  onFinish,
  onCancel,
  form,
  roles,
  loading,
  userData,
  isEditing,
}: ModalProps) => {
  useEffect(() => {
    if (userData && isEditing) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number?.replace(/^\+62/, ""),
        role: userData.roleId,
        status: userData.status,
        userId: userData.id,
      });
    } else {
      form.resetFields();
    }
  }, [userData, isEditing, form]);

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
      title={isEditing ? "Edit Account Data" : "Add Account Data"}
      onCancel={() => onCancel()}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          onFinish={(values) => {
            const formattedValues = {
              ...values,
              phone_number: "+62" + values.phone_number.replace(/-/g, ""),
            };
            onFinish(formattedValues);
          }}
        >
          {dom}
        </Form>
      )}
    >
      <div className="grid grid-cols-2 gap-2 py-2">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input className="h-10" placeholder="Enter your full name" />
        </Form.Item>
        {!isEditing && (
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input className="h-10" placeholder="Enter your email address" />
          </Form.Item>
        )}

        <PhoneNumberInput
          label="Phone Number"
          placeholder="Enter your Phone Number"
          name="phone_number"
          required
        />
        {/* <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number" },
          ]}
        >
          <Input
            type="text"
            addonBefore="+62"
            placeholder="Enter your phone number without +62"
            className="phone-input"
          />
        </Form.Item> */}
        {!isEditing && (
          <>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                className="h-10"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              className="col-span-2"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Select your role"
                className="h-10"
                options={roles?.map((role) => ({
                  value: role.id,
                  label: capitalize(role?.name),
                }))}
              />
            </Form.Item>
          </>
        )}
        {isEditing && (
          <>
            <Form.Item hidden name="userId">
              <Input type="text" hidden />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              className="col-span-2"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select
                placeholder="Select account status"
                className="h-10"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            </Form.Item>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AccountModalForm;
