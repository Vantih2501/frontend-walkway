"use client"
import { ProductCardAdmin } from "#/components/common/card/ProductCard";
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Select, Space, Spin, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useProduct } from "#/hooks/product";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import { useBid } from "#/hooks/bid";
import { BidCardAdmin } from "#/components/common/card/BidCard";
import dayjs from "dayjs";
const { Dragger } = Upload;

// interface FormValues {
//   productId: string;
//   name: string;
//   price: number;
//   weight: number;
//   brand: string;
//   categories: Category[];
//   stock: ProductDetail[];
//   productPhotos: {
//     front: string;
//     side: string[];
//     bottom: string;
//   };
// }


export default function Bid() {
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [editData, setEditData] = useState<Bid | undefined>()
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData && isEditing) {
      // const productNameWithoutBrand = editData.name.replace(editData.brand.name, '').trim();

      // const selectedCategories = editData.categories.map(cat => ({
      //   id: cat.id,
      //   name: cat.name
      // }));

      // const stockDetails = editData.productDetails?.map(detail => ({
      //   size: detail.size.toString(),
      //   stock: detail.stock.toString()
      // })) || [];

      // form.setFieldsValue({
      //   productId: editData.id,
      //   name: productNameWithoutBrand,
      //   brand: editData.brand.id,
      //   categories: selectedCategories,
      //   price: editData.price,
      //   status: 'active',
      //   stock: stockDetails
      // });
    } else {
      form.resetFields();
    }
  }, [editData, isEditing, form]);

  const { fetchBids, postBid } = useBid()
  const { fetchProduct } = useProduct()

  const { bids, isLoading, isError } = fetchBids()
  const { product } = fetchProduct()

  if (isLoading) {
    <Spin size="large" />
  }

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      form.setFieldsValue({
        start_date: startDate,
        end_date: endDate,
      });
    } else {
      form.setFieldsValue({
        start_date: null,
        end_date: null,
      });
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const payload = {
        productDetailId: values.size,
        start_date: dayjs(values.start_date).format(),
        end_date: dayjs(values.end_date).format(),
        start_price: Number(values.price)
      }
      if (isEditing) {
        // await patchProduct(values.productId, values)
      } else {
        await postBid(payload)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setShowForm(false);
      setLoading(false);
      setSelectedId(undefined)
      form.resetFields();
      if (isEditing) {
        setIsEditing(false);
        setEditData(undefined);
      }
    }
  }


  return (
    <div className="flex gap-x-3 max-h-screen">
      <div
        className={classNames(
          "space-y-4 transition-all duration-300 ease-in-out",
          { "w-3/4": showForm, "w-full": !showForm }
        )}
      >
        <div className="flex justify-between items-center">
          <div className="space-x-3">
            <Select
              defaultValue="all"
              options={[
                { value: "all", label: "All Product" },
                { value: "sport", label: "Sport" },
                { value: "casual", label: "Casual" },
              ]}
              className="!rounded-full"
            />
            <Select
              defaultValue="all"
              options={[
                { value: "all", label: "All Brand" },
                { value: "nike", label: "Nike" },
                { value: "adidas", label: "Adidas" },
              ]}
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (!showForm && !isEditing) {
                setShowForm(true)
              }
              if (showForm && !isEditing) {
                setShowForm(false);
                setTimeout(() => {
                  form.resetFields()
                }, 500);
              }
              if (showForm && isEditing) {
                setShowForm(false)
                setTimeout(() => {
                  setIsEditing(false)
                  setEditData(undefined)
                  form.resetFields()
                  setShowForm(true)
                }, 500);
              }
            }}
            className="rounded-full"
          >
            Add Bid
          </Button>
        </div>

        <div
          className={classNames(
            "grid gap-3 transition-all duration-300 ease-in-out",
            {
              "grid-cols-3": showForm,
              "grid-cols-4": !showForm,
            }
          )}
        >
          {bids && bids.map((bid) => (
            <BidCardAdmin
              bid={bid}
              key={bid.id}
            />
          ))}
        </div>
      </div>

      <div
        className={classNames(
          "transition-all duration-300 ease-in-out overflow-hidden rounded-xl overflow-y-auto no-scrollbar",
          {
            "w-1/4 border": showForm,
            "w-0": !showForm,
          }
        )}
      >
        <Form form={form} onFinish={(values) => onFinish(values)} className="w-96 py-6 px-2 mx-auto flex flex-col justify-between h-full gap-4" layout="vertical" requiredMark={false}>
          <div className="space-y-3">
            <h2 className="font-medium tracking-wide text-lg">
              {isEditing ? "Edit Bid" : "Add Bid"}
            </h2>
            <div className="flex items-center">
              <Button
                className="flex-1"
                type={tab == "description" ? "primary" : "text"}
                onClick={() => setTab("description")}
              >
                Description
              </Button>
              <Button
                className="flex-1"
                type={tab == "stock" ? "primary" : "text"}
                onClick={() => setTab("stock")}
              >
                Participant
              </Button>
            </div>

            <div className={tab == 'description' ? "block space-y-2.5" : 'hidden'}>
              {isEditing && (
                <Form.Item
                  hidden
                  name="productId"
                >
                  <Input
                    type="text"
                    hidden
                  />
                </Form.Item>
              )}

              <Form.Item
                name="productId"
                label="Product"
                rules={[{ required: true, message: "Please select a product" }]}
              >
                <Select
                  placeholder="Select a product"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={product && product.map((data) => ({ value: data.id, label: data.name }))}
                  onChange={(data) => setSelectedId(data)}
                />
              </Form.Item>

              {selectedId && (
                <Form.Item
                  name="size"
                  label="Size"
                  rules={[{ required: true, message: "Please select a size" }]}
                >
                  <Select
                    placeholder="Select a size"
                    options={product && product.find((p) => p.id == selectedId)?.productDetails.sort((a, b) => a.size - b.size).map((data) => ({ value: data.id, label: data.size, disabled: data.stock <= 0 }))}
                  />
                </Form.Item>
              )}


              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input product price" }]}
              >
                <Input
                  type="number"
                  addonBefore="Rp"
                  placeholder="Enter your product price"
                  className="price-input"
                />
              </Form.Item>

              <Form.Item
                name="date-range"
                label="Select Date & Time Range"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker.RangePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  onChange={handleDateChange}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item name="start_date" hidden>
                <input type="hidden" />
              </Form.Item>
              <Form.Item name="end_date" hidden>
                <input type="hidden" />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              className="flex-1 py-4"
              variant="filled"
              onClick={() => {
                setShowForm(false);
                setEditData(undefined);
                setIsEditing(false);
                form.resetFields()
              }}
            >
              Discard
            </Button>
            <Button
              className="flex-1 py-4"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
