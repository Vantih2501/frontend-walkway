"use client";

import {
  ArrowDownOutlined,
  CalendarOutlined,
  CodeSandboxOutlined,
  DeleteOutlined,
  DownOutlined,
  FlagOutlined,
  MinusOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  MenuProps,
  Modal,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  nameProduct: string;
  priceProduct: number;
  nameCust: string;
  address: string;
  dateOrder: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    nameProduct: "New Balance 1906R Silver Metallic Sea Salt",
    priceProduct: 2000000,
    nameCust: "Nadyne",
    address: "New York No. 1 Lake Park",
    dateOrder: "2020-10-01",
    status: "Delivered",
  },
  {
    key: "2",
    nameProduct: "Silver Metallic Sea Salt",
    priceProduct: 2000000,
    nameCust: "Nadyne",
    address: "London No. 1 Lake Park",
    dateOrder: "2020-10-01",
    status: "Pending",
  },
  {
    key: "3",
    nameProduct: "New Balance 1906R Silver Metallic Sea Salt",
    priceProduct: 2000000,
    nameCust: "Gandara",
    address: "Sydney No. 1 Lake Park",
    dateOrder: "2020-10-01",
    status: "Cancelled",
  },
  {
    key: "4",
    nameProduct: "Silver Metallic Sea Salt",
    priceProduct: 2000000,
    nameCust: "Farel",
    address: "London No. 2 Lake Park",
    dateOrder: "2020-10-01",
    status: "Delivered",
  },
  {
    key: "4",
    nameProduct: "Silver Metallic Sea Salt",
    priceProduct: 2000000,
    nameCust: "Farel",
    address: "London No. 2 Lake Park",
    dateOrder: "2020-10-01",
    status: "Pending",
  },
];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank">
        <DeleteOutlined /> Delete
      </a>
    ),
  },
];

const getStatusClass = (status: string) => {
  if (status === "Delivered") return "status1";
  if (status === "Pending") return "status2";
  if (status === "Cancelled") return "status3";
  return "";
};

export default function TableOrder() {
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

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "nameProduct",
      key: "nameProduct",
      filteredValue: filteredInfo.nameProduct || null,
      onFilter: (value, record) => record.nameProduct.includes(value as string),
      sorter: (a, b) => a.nameProduct.length - b.nameProduct.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => (
        <div>
          <div>{record.nameProduct}</div>
          <p>{`Rp ${record.priceProduct.toLocaleString()}`}</p>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "nameCust",
      key: "nameCust",
      filteredValue: filteredInfo.nameCust || null,
      onFilter: (value, record) => record.nameCust.includes(value as string),
      sorter: (a, b) => a.nameCust.length - b.nameCust.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Purchase Date",
      dataIndex: "dateOrder",
      key: "dateOrder",
      filteredValue: filteredInfo.dateOrder || null,
      onFilter: (value, record) => record.dateOrder.includes(value as string),
      sorter: (a, b) => a.dateOrder.length - b.dateOrder.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value as string),
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
      render: (status) => {
        let className = "";
        if (status === "Delivered") {
          className = "status1";
        } else if (status === "Pending") {
          className = "status2";
        } else if (status === "Cancelled") {
          className = "status3";
        }
        return <span className={className}>{status}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Dropdown menu={{ items }} className="decoration-black">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreOutlined />
              </Space>
            </a>
          </Dropdown>
          <Button
            type="text"
            onClick={showModal}
            className="mx-3"
            style={{ color: "#29362C" }}
          >
            View Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        className=" header-fix mt
        -3"
      >
        <div className="flex">
          <Title level={2}>Orders</Title>
          <div className="profAdmin flex">
            <Avatar
              className="mt-1"
              src={<img src="fotoprof.jpg" alt="avatar" />}
            />
            <div>
              <p className="mt-1 mx-2 font-medium">Farel Widianto</p>
              <p className="mx-2 text-xs -mt-4" style={{ color: "gray" }}>
                farelWidianto@gmail.com
              </p>
            </div>
          </div>
        </div>
        <hr className="hradmin" />
        <br />
        <div className="flex container mx-5">
          <Button className="rounded-xl">
            <Space>
              <CalendarOutlined /> Month
            </Space>
          </Button>
          <Button className="rounded-xl mx-3">
            <Space>
              <FlagOutlined /> Status
            </Space>
          </Button>
        </div>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        className="mt-10"
      />

      <Modal
        width={950}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        <div className="flex w-max">
          {<p className={`${getStatusClass("Delivered")} text-sm`}>Arrived</p>}
          <p className="mt-4 mx-2">10 September 2024</p>
          <div className="flex mt-4 mx-56">
            <p>Nomor Resi </p>
            <p style={{ color: "#0F930F" }} className="mx-2">
              LDKV-6317328462
            </p>
          </div>
        </div>
        <hr />
        <Row>
          <Col>
            <div className="flex">
              <Image
                src="/product1.png"
                width={150}
                height={150}
                className="rounded-md -mx-5"
              />
              <div className="w-56 -mx-8 mt-8">
                <h4>New Balance 1906R Silver Metallic Sea Salt</h4>
                <div className="flex">
                  <div className="quantity-input">
                    <Button className="rounded-full w-1 buttonqty">
                      <MinusOutlined style={{ fontSize: "8px" }} />
                    </Button>
                    <input
                      min={1}
                      defaultValue={1}
                      style={{
                        width: 30,
                        textAlign: "center",
                        height: "30px",
                        border: "none",
                        outline: "none",
                        fontSize: "15px",
                      }}
                    />
                    <Button className="rounded-full w-1">
                      <PlusOutlined style={{ fontSize: "8px" }} />
                    </Button>
                  </div>
                </div>
              </div>
              <h4 className="mt-8 mx-3">Rp 2.500.000</h4>
            </div>
            <hr className="mb-8" />
            <h4 className="text-base font-semibold">Customer Details</h4>
            <div className="flex mt-3">
              <p className="mr-36">Nama</p>
              <p className="text-right flex-grow font-medium">
                Nadyne Lourensia
              </p>
            </div>
            <hr className="mb-2 -mt-2" />
            <div className="flex mt-3">
              <p className="mr-36">Alamat</p>
              <p className="text-right flex-grow font-medium">
                Jl. Mawar A, No. 18 RT/RW 004/001
              </p>
            </div>
            <hr className="mb-2 -mt-2" />
            <div className="flex mt-3">
              <p className="mr-36">No. Telfon</p>
              <p className="text-right flex-grow font-medium">
                08583292040
              </p>
            </div>
            <hr className="mb-2 -mt-2" />
            <div className="flex mt-3">
              <p className="mr-36">Email</p>
              <p className="text-right flex-grow font-medium">
                saebrinan@gmail.com
              </p>
            </div>
            <hr className="mb-2 -mt-2" />
            <div className="flex mt-3">
              <p className="mr-36">Order date</p>
              <p className="text-right flex-grow font-medium">
                02/09/2024
              </p>
            </div>
          </Col>

          <Col className="mx-7 mt-4" style={{ width: "410px" }}>
            <div className="flex mt-3">
              <p className="mr-36">Payment Method</p>
              <p className="text-right flex-grow font-medium">
                Bank BCA
              </p>
            </div>
            <hr className="mb-8 -mt-2" />
            <h3>
              Nadyne |<span style={{ color: "gray" }}> +62 085 3283 2932 </span>
            </h3>
            <div className="flex">
              <Image
                src="/maps-ui.png"
                alt=""
                width={20}
                height={30}
                className="ml-5"
              />
              <div className="ml-9">
                <h4>JNE Regular</h4>
                <p className="mb-3">
                  Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
                  Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
                </p>
              </div>
            </div>
            <hr className="mb-5" />
            <div className="flex">
              <p className="mr-40">Subtotal (2 Product)</p>
              <p>Rp 5.000.000</p>
            </div>
            <div className="flex mb-16">
              <p className="mr-64">Shipping</p>
              <p>Rp 24.000</p>
            </div>
            <div className="flex">
              <h3 className="mr-48">Order Total</h3>
              <h3>Rp 5.024.000</h3>
            </div>
          </Col>
        </Row>
        <hr className="mt-6 mb-4"/>
        <Button type="primary" style={{ marginLeft:'46rem' }}><ArrowDownOutlined /> Export</Button>
        <br />
      </Modal>
    </div>
  );
}
