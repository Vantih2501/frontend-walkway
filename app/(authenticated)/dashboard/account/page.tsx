"use client";

import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import AddModal from "#/components/Admin/Account/AddModal";
import EditModal from "#/components/Admin/Account/EditModal";

const { confirm } = Modal;

interface Values {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  status?: boolean;
}

interface DataType {
  key: string;
  name: string;
  email: string;
  phoneNumber: string;
  tags: string[];
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

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      align: "center",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag === "Active" ? "green" : "red";

            return (
              <Tag
                color={color}
                style={{
                  borderRadius: "30px",
                  borderColor: "transparent",
                  fontWeight: "500",
                  margin: 0,
                }}
                key={tag}
              >
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space direction="horizontal" size={4}>
          <Button
            icon={<EditOutlined className="text-zinc-700" />}
            type="default"
            onClick={showEditModal}
          />
          <Button
            icon={<DeleteOutlined className="text-zinc-700" />}
            type="default"
            onClick={showDeleteConfirm}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Farel Widianto",
      email: "farel@gmail.com",
      phoneNumber: "+62 895-0991-4782",
      tags: ["Active"],
    },
    {
      key: "2",
      name: "Nadin",
      email: "nadin@gmail.com",
      phoneNumber: "+62 895-0991-4782",
      tags: ["Active"],
    },
    {
      key: "3",
      name: "Gandara",
      email: "gandara@gmail.com",
      phoneNumber: "+62 895-0991-4782",
      tags: ["Active"],
    },
    {
      key: "4",
      name: "Aril",
      email: "aril@gmail.com",
      phoneNumber: "+62 895-0991-4782",
      tags: ["Active"],
    },
    {
      key: "5",
      name: "rizky Widianto",
      email: "rizky@gmail.com",
      phoneNumber: "+62 895-0991-4782",
      tags: ["Active"],
    },
  ];

  const { styles } = useStyle();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Values>();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const showAddModal = () => {
    setOpenModalAdd(true);
  };

  const showEditModal = () => {
    setOpenModalEdit(true);
  };

  const onCreate = (values: Values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpenModalAdd(false);
    setOpenModalEdit(false);
  };

  return (
    <div className="space-y-5">
      <Button
        type={"primary"}
        className="rounded-md text-xs h-[33px]"
        onClick={showAddModal}
      >
        + Admin
      </Button>

      <AddModal
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        onCreate={onCreate}
        form={form}
      />

      <EditModal
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        onCreate={onCreate}
        form={form}
        handleChange={handleChange}
      />

      <Table<DataType>
        className={styles.customTable}
        columns={columns}
        dataSource={data}
        scroll={{ y: 120 * 5 }}
        pagination={false}
      />
    </div>
  );
};

export default AccountTable;
