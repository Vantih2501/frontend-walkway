"use client";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  message,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import BrandModalForm from "./common/modal/BrandModal";
import { useState } from "react";
import { createStyles } from "antd-style";
import { useBrand } from "#/hooks/brand";
import { config } from "#/config/app";
import { capitalize } from "#/utils/capitalize";

interface BrandTableProps {
  brand: Brand[];
}

export default function BrandTable({ brand }: BrandTableProps) {
  const [form] = Form.useForm();

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

  const columns: TableProps<Brand | undefined>["columns"] = [
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <div className="flex items-center gap-2">
          <Image
            width={54}
            className="object-contain bg-black rounded-md aspect-square invert"
            preview={false}
            src={`${config.apiUrl}/brand/uploads/${record.image}`}
          />
          <p>{record.name}</p>
        </div>
      ),
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
              setEditBrand(record);
              setEditing(true);
              setOpen(true);
            }}
          />
          {/* <Button
            icon={<DeleteOutlined />}
            type="default"
          /> */}
        </Space>
      ),
    },
  ];

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | undefined>();

  const [brandStatus, setBrandStatus] = useState("all");

  const { postBrand, patchBrand } = useBrand();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (editing) {
        await patchBrand(values.id, values);
        message.success("Brand updated successfully");
      } else {
        await postBrand(values);
        message.success("Brand created successfully");
      }
    } catch (error: any) {
      message.error(`Error Occurred: ${error.response.body.message}`);
    } finally {
      setOpen(false);
      setLoading(false);
      setEditing(false);
      form.resetFields();
    }
  };

  return (
    <>
      <div className="flex flex-row-reverse items-center justify-between">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(false);
            setOpen(true);
          }}
        >
          Brand
        </Button>

        <Select
          className="select-bid"
          defaultValue="all"
          onChange={(value) => {
            setBrandStatus(value);
          }}
          options={[
            { value: "all", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </div>

      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={
          brandStatus == "all"
            ? brand
            : brand.filter((b) => b.status == brandStatus)
        }
        // scroll={{ y: 60 * 5 }}
        pagination={{ pageSize: 7, position: ["bottomRight"] }}
      />

      <BrandModalForm
        form={form}
        brand={editBrand}
        isEditing={editing}
        loading={loading}
        onCancel={() => {
          setOpen(false);
          setEditing(false);
        }}
        onFinish={(values) => {
          onFinish(values);
        }}
        open={open}
      />
    </>
  );
}
