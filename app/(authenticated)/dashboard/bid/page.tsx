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
import dayjs from "dayjs";

import { createStyles } from "antd-style";
import BidModal from "#/components/common/modal/BidModal";
import { config } from "#/config/app";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
const { Dragger } = Upload;

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
              <p className="text-sm text-gray-500 2xl:text-sm line-clamp-2">
                Rp. {record.start_price.toLocaleString("id-ID")}
              </p>
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

  const { bids, isLoading, isError } = fetchBids();
  const { product } = fetchProduct();
  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();

  const [filteredProducts, setFilteredProducts] = useState<Bid[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [selectedBrand, setSelectedBrand] = useState("All Brand");

  const productBid: Bid[] = [];

  useEffect(() => {
    setFilteredProducts(productBid);
  }, [product]);
  

  useEffect(() => {
    let filtered = (bids ?? []).filter((bid) => {
       const product = bid.productDetail.product;

       console.log("Current Product Categories:", product.categories);
       console.log("Selected Category:", selectedCategory);
       console.log("Bid Product Detail:", bid.productDetail);

       const isCategoryMatch = 
           selectedCategory === "All Product" || 
           product.categories?.some((cate) => cate.name === selectedCategory);
       const isBrandMatch = 
           selectedBrand === "All Brand" || 
           product.brand.name === selectedBrand;
       return isCategoryMatch && isBrandMatch;
    });
 
    setFilteredProducts(filtered);
 }, [selectedCategory, selectedBrand, bids]);
  

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-h-screen space-y-5">
      <div className="flex justify-between items-center">
        <div className="space-x-3">
          <Select
            className="select-bid"
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              console.log("Selected Category:", value);
           }}
            options={[
              { value: "all", label: "All Product" },
              ...(category?.map((cat) => ({
                value: cat.name,
                label: cat.name,
              })) || []),
            ]}
          />
          <Select
            className="select-bid"
            defaultValue="all"
            onChange={(value) => {
              setSelectedBrand(value);
              console.log("Selected Brand:", value);
           }}
            options={[
              { value: "all", label: "All Product" },
              ...(brand?.map((brn) => ({
                value: brn.name,
                label: brn.name,
              })) || []),
            ]}
          />
        </div>

        <Button
          type={"primary"}
          className="rounded-full text-xs h-[33px]"
          onClick={() => {
            setOpenModal(true), setIsEditing(false), form.resetFields();
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

      {filteredProducts && (
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={filteredProducts}
          scroll={{ y: 100 * 5 }}
          pagination={false}
        />
      )}
    </div>
  );
}
