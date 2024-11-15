"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import AccountModalForm from "#/components/common/modal/AccountModal";
import { useUser } from "#/hooks/user";
import { useRole } from "#/hooks/role";
import { formatPhoneNumber } from "#/utils/formatter";
import { capitalize } from "#/utils/capitalize";

const { confirm } = Modal;

interface FormValues {
  userId: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
  status: string;
}

const AccountTable = () => {
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
  const { fetchUser, postUser, patchUser, deleteUser } = useUser();
  const { fetchRole } = useRole();
  const [form] = Form.useForm();
  const { styles } = useStyle();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserData, setEditUserData] = useState<User>();

  const [roleData, setRoleData] = useState("all");

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      key: "role",
      render: (record) => <p>{capitalize(record.role.name)}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      key: "phone_number",
      render: (record) => <p>{formatPhoneNumber(record.phone_number)}</p>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
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
              setEditUserData(record);
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

  const confirmDelete = (userId: string) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await deleteUser(userId);
      },
    });
  };

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      if (isEditing) {
        await patchUser(
          values.userId,
          values.name,
          values.phone_number,
          values.status
        );
      } else {
        await postUser(
          values.name,
          values.email,
          values.phone_number,
          values.password,
          values.role
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpenModal(false);
      setLoading(false);
      form.resetFields();
    }
  };

  const { user, isLoading: isUserLoading } = fetchUser();
  const { role, isLoading: isRoleLoading } = fetchRole();

  if (isUserLoading || isRoleLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-row-reverse justify-between">
        <Button
          type={"primary"}
          className="rounded-md text-xs h-[33px]"
          onClick={() => {
            setOpenModal(true), setIsEditing(false), setEditUserData(undefined);
          }}
          icon={<PlusOutlined />}
        >
          Account
        </Button>

        <Select
          className="select-bid"
          defaultValue="all"
          onChange={(value) => {
            setRoleData(value);
            console.log("Selected Brand:", value);
          }}
          options={[
            { value: "all", label: "All Role" },
            ...(role?.map((role) => ({
              value: role.name,
              label: capitalize(role.name),
            })) || []),
          ]}
        />
      </div>

      <AccountModalForm
        open={openModal}
        onFinish={onFinish}
        onCancel={() => {
          setOpenModal(false);
          setEditUserData(undefined);
          setIsEditing(false);
        }}
        form={form}
        roles={role}
        userData={editUserData}
        loading={loading}
        isEditing={isEditing}
      />

      {user && (
        <Table<User>
          className={styles.customTable}
          columns={columns}
          dataSource={
            roleData == "all"
              ? user
              : user?.filter((user) => user.role.name == roleData)
          }
          scroll={{ y: 60 * 5 }}
          pagination={false}
        />
      )}
    </div>
  );
};

export default AccountTable;
