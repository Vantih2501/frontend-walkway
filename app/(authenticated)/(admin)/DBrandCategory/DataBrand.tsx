"use client";

import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const { Title } = Typography;

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  nameBrand: string;
}

const data: DataType[] = [
    {
        key: "1",
        nameBrand: "Nike",
    },
    {
        key: "2",
        nameBrand: "Adiddas",
    },
];

export default function BrandData() {
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
      title: "Brand",
      dataIndex: "nameBrand",
      key: "nameBrand",
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.nameBrand.includes(value as string),
      sorter: (a, b) => a.nameBrand.length - b.nameBrand.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => (
        <div className="flex">
          <Image src="/brand1.png" alt="" width={50} height={50} />
          <p className="font-medium mt-4 mx-5">{record.nameBrand}</p>
        </div>
      ),
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


  // UPLOAD IMAGE

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Card className="mx-10 mt-5 CardB">
        <div className="mx-4 mt-4 mr-4">
          <Button type="primary" onClick={showModal} className="mb-5">
            <PlusOutlined /> Brand
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
        <Title level={3}>Add Brand</Title>
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
            name="BrandName"
            rules={[{ required: true, message: "Please input your Brand Name!" }]}
          >
            <Input placeholder="Enter Brand Name" />
          </Form.Item>

          <Form.Item
            name="photo"
            rules={[{ required: true, message: "Please input your Photo!" }]}
          >
            <div className="LogoB mt-3">
              <Upload
                name="avatar"
                className="LogoB-upload"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>{" "}
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
        <Title level={3}>Edit Brand</Title>
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
            name="BrandName"
            rules={[{ required: true, message: "Please input your Brand Name!" }]}
          >
            <Input placeholder="Enter Brand Name" />
          </Form.Item>

          <Form.Item
            name="photo"
            rules={[{ required: true, message: "Please input your Photo!" }]}
          >
            <div className="LogoB mt-3">
              <Upload
                name="avatar"
                className="LogoB-upload"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>{" "}
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
