"use client";
import { ProductCardAdmin } from "#/components/common/card/ProductCard";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  Upload,
  UploadFile,
} from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useProduct } from "#/hooks/product";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import PriceInput from "#/components/common/input/PriceInput";
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
  status: string;
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

  const [editData, setEditData] = useState<Product | undefined>();
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState({
    front: "",
    side: ["", ""],
    bottom: "",
  });

  function CategorySelector({ value = [], onChange }: CategorySelectorProps) {
    const handleCategoryChange = (category: Category) => {
      const isSelected = value.some((item) => item.id === category.id);

      if (isSelected) {
        const newValue = value.filter((item) => item.id !== category.id);
        onChange(newValue);
      } else {
        onChange([...value, category]);
      }
    };

    return (
      <div className="flex flex-wrap gap-2">
        {category &&
          category.map((category) => {
            const isSelected = value.some((item) => item.id === category.id);

            return (
              <button
                key={category.id}
                type="button"
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  isSelected
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
    // If it's a removal operation (file status is 'removed')
    if (file.status === "removed") {
      setPhotos((prev: any) => {
        const updatedPhotos = { ...prev };

        // Reset the structure based on remaining files
        updatedPhotos.front = undefined;
        updatedPhotos.side = [];
        updatedPhotos.bottom = undefined;

        // Reassign photos based on remaining fileList
        fileList.forEach((remainingFile, index) => {
          const imageUrl =
            remainingFile.response?.imageUrl || remainingFile.url;

          if (index === 0) {
            updatedPhotos.front = imageUrl;
          } else if (index === 1 || index === 2) {
            if (!updatedPhotos.side) updatedPhotos.side = [];
            updatedPhotos.side.push(imageUrl);
          } else if (index === 3) {
            updatedPhotos.bottom = imageUrl;
          }
        });

        return updatedPhotos;
      });

      setFileList(fileList);
      return false;
    }

    // Handle new file upload
    try {
      const response = await uploadImage(file);
      if (!response) return Upload.LIST_IGNORE;

      setPhotos((prev: any) => {
        const updatedPhotos = { ...prev };

        if (fileList.length === 1) {
          updatedPhotos.front = response.imageUrl;
        } else if (fileList.length === 2) {
          updatedPhotos.side = [response.imageUrl];
        } else if (fileList.length === 3) {
          updatedPhotos.side = [
            ...(updatedPhotos.side || []),
            response.imageUrl,
          ];
        } else if (fileList.length === 4) {
          updatedPhotos.bottom = response.imageUrl;
        } else {
          return Upload.LIST_IGNORE;
        }

        return updatedPhotos;
      });

      setFileList(fileList);
      return false;
    } catch (error) {
      console.error("Upload error:", error);
      return Upload.LIST_IGNORE;
    }
  };

  useEffect(() => {
    if (editData && isEditing) {
      const productNameWithoutBrand = editData.name
        .replace(editData.brand.name, "")
        .trim();

      const selectedCategories = editData.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }));

      const stockDetails =
        editData.productDetails?.map((detail) => ({
          size: detail.size.toString(),
          stock: detail.stock.toString(),
        })) || [];

      form.setFieldsValue({
        productId: editData.id,
        name: productNameWithoutBrand,
        brand: editData.brand.id,
        categories: selectedCategories,
        price: editData.price,
        status: editData.status,
        stock: stockDetails,
      });
    } else {
      form.resetFields();
      setPhotos({
        front: "",
        side: ["", ""],
        bottom: "",
      });
    }
  }, [editData, isEditing, form]);

  const { fetchProduct, uploadImage, postProduct, patchProduct } = useProduct();
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();

  const { product, isLoading: productLoading } = fetchProduct();
  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [selectedBrand, setSelectedBrand] = useState("All Brand");

  const product2: Product[] = [];

  useEffect(() => {
    setFilteredProducts(product2);
  }, [product]);

  useEffect(() => {
    let filtered = (product ?? []).filter(
      (prod) =>
        (selectedCategory === "All Product" ||
          prod.categories.find((cate) => cate.name === selectedCategory)) &&
        (selectedBrand === "All Brand" || prod.brand.name === selectedBrand)
    );


    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, product]);

   
  if (productLoading || brandLoading || categoryLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      const categoryIds = values.categories.map(
        (category: Category) => category.id
      );
      const productDetails = values.stock.map((detail: ProductDetail) => ({
        size: Number(detail.size),
        stock: Number(detail.stock),
      }));

      const formattedPrice = Number(values.price.toString().replace(/,/g, ""));

      const payload = {
        brandId: values.brand,
        categoryId: categoryIds,
        name: values.name,
        price: formattedPrice,
        status: values.status,
        productDetails: productDetails,
        productPhotos: photos,
        weight: 400,
      };

      if (isEditing) {
        await patchProduct(values.productId, payload);
      } else {
        await postProduct(payload);
        message.success("Product created successfully!");
      }
    } catch (error) {
      console.error(error);
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
  };

  return (
    <div className="flex max-h-screen gap-x-3">
      <div
        className={classNames(
          "space-y-4 transition-all duration-300 ease-in-out",
          { "w-3/4": showForm, "w-full": !showForm }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="space-x-3">
            <Select
              defaultValue="All Product"
              onChange={(value) => setSelectedCategory(value)}
              options={[
                { value: "All Product", label: "All Product" },
                ...(category?.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                })) || []),
              ]}
              className="!rounded-full"
            />

            <Select
              defaultValue="All Brand"
              onChange={(value) => setSelectedBrand(value)}
              options={[
                { value: "All Brand", label: "All Brand" },
                ...(brand?.map((brn) => ({
					value: brn.name,
					label: brn.name
				})) || []),
              ]}
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (!showForm && !isEditing) {
                setShowForm(true);
              }
              if (showForm && !isEditing) {
                setShowForm(false);
                setTimeout(() => {
                  form.resetFields();
                }, 500);
              }
              if (showForm && isEditing) {
                setShowForm(false);
                setTimeout(() => {
                  setIsEditing(false);
                  setEditData(undefined);
                  form.resetFields();
                  setShowForm(true);
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
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCardAdmin
                product={product}
                key={product.id}
                frontImage={product.frontImage}
                sold={0}
                onClick={(product) => {
                  if (!showForm && !isEditing) {
                    setIsEditing(true);
                    setEditData(product);
                    setShowForm(true);
                  }
                  if (showForm && !isEditing) {
                    setShowForm(false);
                    setTimeout(() => {
                      setIsEditing(true);
                      setEditData(product);
                      form.resetFields();
                      setShowForm(true);
                    }, 500);
                  }
                  if (showForm && isEditing) {
                    setShowForm(false);
                    setTimeout(() => {
                      setIsEditing(false);
                      setEditData(undefined);
                      form.resetFields();
                    }, 500);
                  }
                }}
              />
            ))}
        </div>
      </div>

      <div
        className={classNames(
          "transition-all duration-300 ease-in-out overflow-hidden rounded-xl",
          {
            "w-1/4 border": showForm,
            "w-0": !showForm,
          }
        )}
      >
        <Form
          form={form}
          onFinish={(values) => onFinish(values)}
          className="flex flex-col justify-between h-full gap-4 px-4 py-4 mx-auto"
          layout="vertical"
          requiredMark={false}
        >
          <div className="space-y-3 overflow-y-auto no-scrollbar">
            <h2 className="text-lg font-medium tracking-wide">
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

            <div
              className={tab == "description" ? "block space-y-2.5" : "hidden"}
            >
              {!isEditing ? (
                <Form.Item
                  name="productPhotos"
                  rules={[
                    {
                      required: true,
                      message: "Please upload at least 1 image",
                    },
                  ]}
                >
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
                <Form.Item hidden name="productId">
                  <Input type="text" hidden />
                </Form.Item>
              )}

              <Form.Item label="Product Name" required>
                <Space.Compact block>
                  <Form.Item
                    name="brand"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please select product brand",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Brand"
                      options={brand?.map((brand) => ({
                        value: brand?.id,
                        label: brand?.name,
                      }))}
                      style={{ width: "30%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    noStyle
                    rules={[
                      { required: true, message: "Please enter product name" },
                    ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please select at least one category",
                  },
                ]}
              >
                <CategorySelector onChange={() => {}} />
              </Form.Item>

              {/* 
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
              </Form.Item> */}

              <PriceInput
                currencyPrefix="Rp"
                label="Price"
                name="price"
                placeholder="Enter product price"
                required
              />

              <Form.Item
                name="status"
                label="Status"
                className="col-span-2"
                rules={[
                  { required: true, message: "Please select product status" },
                ]}
              >
                <Select
                  placeholder="Select account status"
                  className="h-10"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className={tab == "stock" ? "block space-y-2" : "hidden"}>
              <Form.List name="stock">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label="Size"
                          rules={[
                            {
                              required: true,
                              message: "Please input the size",
                            },
                          ]}
                        >
                          <Input placeholder="Size" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "stock"]}
                          label="Quantity"
                          rules={[
                            {
                              required: true,
                              message: "Please input the quantity",
                            },
                          ]}
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
          <div className="flex items-center gap-3">
            <Button
              className="flex-1 py-4"
              variant="filled"
              onClick={() => {
                setShowForm(false);
                setEditData(undefined);
                setIsEditing(false);
                setFileList([]);
                form.resetFields();
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
