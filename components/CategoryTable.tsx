"use client"
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import { createStyles } from "antd-style";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import CategoryModalForm from "./common/modal/CategoryModal";

interface CategoryTableProps {
  category: Category[]
}

export default function CategoryTable({ category }: CategoryTableProps) {
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

  const columns: TableProps<Category | undefined>['columns'] = [
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
              setEditCategory(record)
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
  const [editCategory, setEditCategory] = useState<Category | undefined>()

  const { postCategory, patchCategory } = useCategory()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      if (editing) {
        await patchCategory(values.id, values)
      } else {
        await postCategory(values)
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
        Category
      </Button>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={category}
        scroll={{ y: 60 * 5 }}
        pagination={false}
      />

      <CategoryModalForm
        form={form}
        category={editCategory}
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