"use client"
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space, Table, TableProps, Tag } from "antd";
import BrandModalForm from "./common/modal/BrandModal";
import { useState } from "react";
import { createStyles } from "antd-style";
import { useBrand } from "#/hooks/brand";

interface BrandTableProps {
  brand: Brand[]
}

export default function BrandTable({ brand }: BrandTableProps) {
  const [form] = Form.useForm()

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
  const { styles } = useStyle();

  const columns: TableProps<Brand | undefined>['columns'] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
              setEditBrand(record)
              setEditing(true)
              setOpen(true)
            }}
          />
          {/* <Button
            icon={<DeleteOutlined />}
            type="default"
          /> */}
        </Space>
      ),
    },
  ]

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [editBrand, setEditBrand] = useState<Brand | undefined>()

  const { postBrand, patchBrand } = useBrand()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      if (editing) {
        await patchBrand(values.id, values)
      } else {
        await postBrand(values)
      }

    } catch (error) {

    } finally {
      setOpen(false)
      setLoading(false)
      setEditing(false)
      form.resetFields()
    }
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditing(false)
          setOpen(true)
        }}
      >
        Brand
      </Button>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={brand}
        scroll={{ y: 60 * 5 }}
        pagination={false}
      />

      <BrandModalForm
        form={form}
        brand={editBrand}
        isEditing={editing}
        loading={loading}
        onCancel={() => {
          setOpen(false)
          setEditing(false)
        }}
        onFinish={(values) => {
          onFinish(values)
        }}
        open={open}
      />
    </>
  )
}