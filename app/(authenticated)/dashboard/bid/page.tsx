"use client";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  TableProps,
  Tag,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useProduct } from "#/hooks/product";
import { useBid } from "#/hooks/bid";
import { BidCardAdmin } from "#/components/common/card/BidCard";
import dayjs, { Dayjs } from "dayjs";

import { createStyles } from "antd-style";
import BidModal from "#/components/common/modal/BidModal";
import { config } from "#/config/app";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
const { Dragger } = Upload;

interface BidStatusTagProps {
  startDate: string | Date | Dayjs;
  endDate: string | Date | Dayjs;
}

const BidStatusTag: React.FC<BidStatusTagProps> = ({ startDate, endDate }) => {
  const currentDate = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  let status = "Unknown";
  let color = "gray";

  if (currentDate.isBefore(start)) {
    status = "Not Started";
    color = "blue";
  } else if (
    (currentDate.isAfter(start) || currentDate.isSame(start)) &&
    (currentDate.isBefore(end) || currentDate.isSame(end))
  ) {
    status = "Ongoing";
    color = "green";
  } else if (currentDate.isAfter(end)) {
    status = "Ended";
    color = "red";
  }

  return (
    <Tag className="rounded-full text-[10px]" color={color}>
      {status}
    </Tag>
  );
};

export default function Bid() {
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

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Bid | undefined>();
  const { styles } = useStyle();
  const [form] = Form.useForm();

  const columns: TableProps<Bid>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      width: 300,
      key: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <div className="rounded-md size-16 aspect-square bg-zinc-50">
            <Image
              className="size-full"
              preview={false}
              src={`${config.apiUrl}/product/uploads/${
                record.productDetail.product.productPhotos.find(
                  (p) => p.photoType == "front"
                )?.image
              }`}
            />
          </div>
          <div className="flex gap-3 2xl:gap-5">
            <div className="flex-1 min-w-0 ms-4">
              <p className="mb-1 text-sm font-medium text-gray-800 2xl:text-sm line-clamp-1">
                {record.productName}
              </p>
              <BidStatusTag
                startDate={record.start_date}
                endDate={record.end_date}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Starting Price",
      dataIndex: "start_price",
      key: "start_price",
      align: "left",
      render: (_, record) => (
        <p>Rp. {record.start_price.toLocaleString("id-ID")}</p>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (_, record) => (
        <p>{dayjs(record.start_date).format("DD MMM YYYY: HH:mm")}</p>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (_, record) => (
        <p>{dayjs(record.end_date).format("DD MMM YYYY: HH:mm")}</p>
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
              setEditData(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const onCancel = () => {
    setOpenModal(false);
    setEditData(undefined);
    setIsEditing(false);
    form.resetFields();
  };

  const { fetchBids, postBid } = useBid();
  const { fetchProduct } = useProduct();
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();

  const { bids, isLoading } = fetchBids();
  const { product } = fetchProduct();
  const { brand } = fetchBrand();
  const { category } = fetchCategory();


  console.log(category)

  const [filteredProducts, setFilteredProducts] = useState<Bid[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    let filtered = (bids ?? []).filter((bid) => {
      const product = bid.productDetail.product;

      const currentDate = dayjs();
      const startDate = dayjs(bid.start_date);
      const endDate = dayjs(bid.end_date);

      const isCategoryMatch =
        selectedCategory === "all" ||
        product.categories?.some((cate) => cate.name === selectedCategory);
      const isBrandMatch =
        selectedBrand === "all" || product.brand.name === selectedBrand;

      const isStatusMatch =
        selectedStatus === "all" ||
        (selectedStatus === "not_started" && currentDate.isBefore(startDate)) ||
        (selectedStatus === "ongoing" &&
          currentDate.isAfter(startDate) &&
          currentDate.isBefore(endDate)) ||
        (selectedStatus === "ended" && currentDate.isAfter(endDate));

      return isCategoryMatch && isBrandMatch && isStatusMatch;
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, selectedStatus, bids]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-h-screen space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-x-3">
          <Select
            className="select-bid"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            options={[{ value: "all", label: "All Category" }].concat(
              category?.map((cat) => ({
                value: cat.name,
                label: cat.name,
              })) || []
            )}
          />
          <Select
            className="select-bid"
            defaultValue="all"
            onChange={(value) => setSelectedBrand(value)}
            options={[{ value: "all", label: "All Brand" }].concat(
              brand?.map((brn) => ({
                value: brn.name,
                label: brn.name,
              })) || []
            )}
          />
          <Select
            className="select-bid"
            defaultValue="all"
            onChange={(value) => setSelectedStatus(value)}
            options={[
              { value: "all", label: "All Status" },
              { value: "not_started", label: "Not Started" },
              { value: "ongoing", label: "Ongoing" },
              { value: "ended", label: "Ended" },
            ]}
          />
        </div>

        <Button
          type={"primary"}
          className="rounded-full text-xs h-[33px]"
          onClick={() => {
            setOpenModal(true);
            setIsEditing(false);
            form.resetFields();
          }}
          icon={<PlusOutlined size={14} />}
        >
          Add Bid
        </Button>
      </div>

      <BidModal
        open={openModal}
        onCancel={onCancel}
        isEditing={isEditing}
        product={product}
        setOpenModal={setOpenModal}
        setIsEditing={setIsEditing}
        postBid={postBid}
        form={form}
        setEditData={setEditData}
        editData={editData}
      />

      <Table
        className={`${styles.customTable} overflow-x-auto rounded-lg`}
        columns={columns}
        rowKey={(row) => row.id}
        dataSource={filteredProducts}
        // pagination={{ position: ["bottomRight"] }}
      />
    </div>
  );
}
