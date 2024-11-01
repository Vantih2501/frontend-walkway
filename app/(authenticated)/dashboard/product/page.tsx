"use client"
import { ProductCardAdmin } from "#/components/common/card/ProductCard";
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space, Spin, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useProduct } from "#/hooks/product";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
const { Dragger } = Upload;

interface CategorySelectorProps {
  value?: Category[];
  onChange: (selectedCategories: Category[]) => void;
}

interface FormValues {
  productId: string;
  name: string;
  price: number;
  weight: number;
  brand: string;
  categories: Category[];
  stock: ProductDetail[];
  productPhotos: {
    front: string;
    side: string[];
    bottom: string;
  };
}


export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [editData, setEditData] = useState<Product | undefined>()
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState({
    front: "",
    side: ["", ""],
    bottom: "",
  });

  function CategorySelector({ value = [], onChange }: CategorySelectorProps) {
    const handleCategoryChange = (category: Category) => {
      const isSelected = value.some(item => item.id === category.id);

      if (isSelected) {
        const newValue = value.filter(item => item.id !== category.id);
        onChange(newValue);
      } else {
        onChange([...value, category]);
      }
    };

    return (
      <div className="flex flex-wrap gap-2">
        {category && category.map((category) => {
          const isSelected = value.some(item => item.id === category.id);

          return (
            <button
              key={category.id}
              type="button"
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${isSelected
                ? "bg-primary-200 border border-primary-200 text-white"
                : "border border-gray-200 text-gray-900"
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    );
  }


  const handleUpload = async (file: UploadFile, fileList: UploadFile[]) => {
    const response = await uploadImage(file);
    if (!response) return;

    setPhotos((prev: any) => {
      const updatedPhotos = { ...prev };

      if (fileList.length === 1) {
        updatedPhotos.front = response.imageUrl;
      } else if (fileList.length === 2) {
        updatedPhotos.side = [response.imageUrl];
      } else if (fileList.length === 3) {
        updatedPhotos.side = [...updatedPhotos.side, response.imageUrl];
      } else if (fileList.length === 4) {
        updatedPhotos.bottom = response.imageUrl;
      } else {
        return Upload.LIST_IGNORE;
      }

      return updatedPhotos;
    });

    setFileList(fileList);
    return false;
  };



  useEffect(() => {
    if (editData && isEditing) {
      const productNameWithoutBrand = editData.name.replace(editData.brand.name, '').trim();

      const selectedCategories = editData.categories.map(cat => ({
        id: cat.id,
        name: cat.name
      }));

      const stockDetails = editData.productDetails?.map(detail => ({
        size: detail.size.toString(),
        stock: detail.stock.toString()
      })) || [];

      form.setFieldsValue({
        productId: editData.id,
        name: productNameWithoutBrand,
        brand: editData.brand.id,
        categories: selectedCategories,
        price: editData.price,
        status: 'active',
        stock: stockDetails
      });
    } else {
      form.resetFields();
      setPhotos({
        front: '',
        side: ['', ''],
        bottom: ''
      });
    }
  }, [editData, isEditing, form]);

  const { fetchProduct, uploadImage, postProduct, patchProduct } = useProduct();
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();

  const { product, isLoading: productLoading } = fetchProduct();
  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();

  if (productLoading || brandLoading || categoryLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true)
      const categoryIds = values.categories.map((category: Category) => category.id);
      const productDetails = values.stock.map((detail: ProductDetail) => ({
        size: Number(detail.size),
        stock: Number(detail.stock),
      }));
      const payload = {
        brandId: values.brand,
        categoryId: categoryIds,
        name: values.name,
        price: Number(values.price),
        productDetails: productDetails,
        productPhotos: photos,
        weight: 400,
      };
      if (isEditing) {
        await patchProduct(values.productId, payload)
      } else {
        await postProduct(payload);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setShowForm(false);
      setLoading(false);
      setPhotos({
        front: "",
        side: ["", ""],
        bottom: "",
      });
      setFileList([]);
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
            Add New Product
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
          {product && product.map((product) => (
            <ProductCardAdmin
              product={product}
              key={product.id}
              frontImage={product.frontImage}
              sold={0}
              onClick={(product) => {
                if (!showForm && !isEditing) {
                  setIsEditing(true)
                  setEditData(product)
                  setShowForm(true)
                }
                if (showForm && !isEditing) {
                  setShowForm(false);
                  setTimeout(() => {
                    setIsEditing(true)
                    setEditData(product)
                    form.resetFields()
                    setShowForm(true)
                  }, 500);
                }
                if (showForm && isEditing) {
                  setShowForm(false)
                  setTimeout(() => {
                    setIsEditing(false)
                    setEditData(undefined)
                    form.resetFields()
                  }, 500);
                }
              }}
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
        <Form form={form} onFinish={(values) => onFinish(values)} className="py-6 px-2 mx-auto flex flex-col justify-between h-full gap-4" layout="vertical" requiredMark={false}>
          <div className="space-y-3">
            <h2 className="font-medium tracking-wide text-lg">
              {isEditing ? "Edit Product" : "Add Product"}
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
                Stock
              </Button>
            </div>

            <div className={tab == 'description' ? "block space-y-2.5" : 'hidden'}>
              {!isEditing ? (
                <Form.Item name="productPhotos" rules={[{ required: true, message: "Please upload at least 1 image" }]}>
                  <Dragger
                    beforeUpload={() => false}
                    multiple={true}
                    maxCount={4}
                    onChange={(info) => {
                      handleUpload(info.file, info.fileList);
                    }}
                    accept="image/*"
                    listType="picture"
                    className="upload-list-inline"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag images to upload
                    </p>
                    {/* <p className="ant-upload-hint">
                      Upload in the order: Front, Side 1 & 2, Bottom
                    </p> */}
                  </Dragger>
                </Form.Item>
              ) : (
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

              <Form.Item label="Product Name" required>
                <Space.Compact block>
                  <Form.Item
                    name="brand"
                    noStyle
                    rules={[{ required: true, message: "Please select product brand" }]}
                  >
                    <Select
                      placeholder="Brand"
                      options={brand?.map((brand) => ({
                        value: brand?.id,
                        label: brand?.name
                      }))}
                      style={{ width: "30%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    noStyle
                    rules={[{ required: true, message: "Please enter product name" }]}
                  >
                    <Input
                      placeholder="Product Name"
                      className="rounded-lg"
                      style={{ width: "70%" }}
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>

              <Form.Item
                name="categories"
                label="Product Category"
                rules={[{ required: true, message: "Please select at least one category" }]}
              >
                <CategorySelector onChange={() => { }} />
              </Form.Item>

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
                name="status"
                label="Status"
                className="col-span-2"
                rules={[{ required: true, message: "Please select product status" }]}
              >
                <Select
                  placeholder="Select account status"
                  className="h-10"
                  options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                />
              </Form.Item>
            </div>

            <div className={tab == 'stock' ? "block space-y-2" : 'hidden'}>
              <Form.List name="stock">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label="Size"
                          rules={[{ required: true, message: "Please input the size" }]}
                        >
                          <Input placeholder="Size" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "stock"]}
                          label="Quantity"
                          rules={[{ required: true, message: "Please input the quantity" }]}
                        >
                          <Input placeholder="Quantity" type="number" />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ width: "100%" }}
                      >
                        Add Size
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
                setFileList([]);
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
