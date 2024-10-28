"use client";

import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, GetProp, Image, Input, message, Modal, Table, TableColumnsType, TableProps, Typography, Upload, UploadProps } from "antd";
import { useState } from "react";

const { Title } = Typography;

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  nameCategory: string;
}

const data: DataType[] = [
    {
        key: "1",
        nameCategory: "Sport",
    },
    {
        key: "2",
        nameCategory: "Sneakers",
    },
];


export default function CategoryData() {

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    
    const showModal2 = () => {
      setIsModalOpen2(true);
    };
    
    const handleOk2 = () => {
      setIsModalOpen2(false);
    };
    
    const handleCancel2 = () => {
      setIsModalOpen2(false);
    };


    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  
    const handleChange2: OnChange = (pagination, filters, sorter) => {
      console.log("Various parameters", pagination, filters, sorter);
      setFilteredInfo(filters);
      setSortedInfo(sorter as Sorts);
    };
  
    const columns: TableColumnsType<DataType> = [
      {
        title: "Category",
        dataIndex: "nameCategory",
        key: "nameCategory",
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.nameCategory.includes(value as string),
        sorter: (a, b) => a.nameCategory.length - b.nameCategory.length,
        sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: () => (
          <div>
            <div className="flex">
              <Button
                  onClick={showModal2}
                className="mx-3 -mt-1 h-9"
                style={{ color: "#29362C" }}
              >
                <EditOutlined />
              </Button>
              <Button
                //   onClick={showModal}
                className="mx-3 -mt-1 h-9"
                style={{ color: "#29362C" }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        ),
      },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


  return (
    <div>
      <Card className="mx-5 mt-5 CardC">
        <div className="mx-4 mt-4 mr-4">
          <Button type="primary"  onClick={showModal} className="mb-5">
            <PlusOutlined /> Category
          </Button>
          <Table<DataType>
            columns={columns}
            dataSource={data}
            onChange={handleChange2}
          />
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Title level={3}>Add Category</Title>
        <hr />
        <br />
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="CategorName"
            rules={[{ required: true, message: "Please input your Category Name!" }]}
          >
            <Input placeholder="Enter Category Name" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
        width={400}
      >
        <Title level={3}>Edit Category</Title>
        <hr />
        <br />
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="CategorName"
            rules={[{ required: true, message: "Please input your Category Name!" }]}
          >
            <Input placeholder="Enter Category Name" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
