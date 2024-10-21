"use client";

import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  message,
  Space,
  Typography,
  Card,
  Image,
  Row,
  Col,
  TabsProps,
  Tabs,
} from "antd";
import {
  CodeSandboxOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import DescAdd from "./DescAddProduct";
import StockAdd from "./StockProduct";
import EditStock from "./EditStock";
import EditDesc from "./EditDesc";

const { TabPane } = Tabs;

const { Title } = Typography;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
  {
    label: "4rd menu item",
    key: "4",
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

// TABS ADD PRODUCT

const onChange = (key: string) => {
  console.log(key);
};

// CARD TYPE DATA
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
}

export default function CardProduct() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = [
    {
      id: 1,
      name: " Adidas Handball Spezial Night Indigo",
      price: 2500000,
      stock: 214,
      sold: 214,
      image: "/product3.png",
    },
    {
      id: 2,
      name: "Adidas Handball Spezial",
      price: 2850000,
      stock: 214,
      sold: 214,
      image: "/product3.png",
    },
    {
      id: 3,
      name: "Adidas Handball Spezial",
      price: 2850000,
      stock: 214,
      sold: 214,
      image: "/product3.png",
    },
    {
      id: 4,
      name: "Adidas Handball Spezial",
      price: 2850000,
      stock: 214,
      sold: 214,
      image: "/product3.png",
    },
  ];

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  // OPEN CLOSE CARD ADD PRODUCT

  const [cardVisible, setCardVisible] = useState(false);

  const showAddCard = () => {
    setCardVisible(true);
  };

  const closeAddCard = () => {
    setCardVisible(false);
  };

    // OPEN CLOSE CARD EDIT PRODUCT

    const [cardVisible2, setCardVisible2] = useState(false);

    const showUpCard = () => {
      setCardVisible2(true);
    };
  
    const closeUpCard = () => {
      setCardVisible2(false);
    };

  return (
    <div>
      <div className="fixed header-fix">
        <div className="flex">
          <Title level={2}>Products</Title>
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
              <CodeSandboxOutlined /> All Product
            </Space>
          </Button>
          <Dropdown menu={menuProps} className="mx-3">
            <Button className="rounded-xl">
              <Space>
                All Brands
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button
            style={{
              transform: cardVisible || cardVisible2
                ? "translateX(45rem)"
                : "translateX(65rem)",
              transition: "all 0.3s ease", // Agar transisi perpindahan smooth
            }}
            onClick={showAddCard}
            className="rounded-xl buttonAdd"
            type="primary"
          >
            <PlusOutlined /> Add New Product
          </Button>
        </div>
      </div>

      <div
        className={`product-layout container mx-5 ${
          cardVisible || cardVisible2 ? "with-card" : ""
        }`}
      >
        <div className="productData">
          <Row className="product-list mt-10">
            {products.map((product, index) => (
              <Col
                span={(cardVisible && index === 3) || (cardVisible2 && index === 3) ? 24 : 6}
                key={product.id}
                style={{
                  marginBottom:(cardVisible && index === 3) || (cardVisible2 && index === 3)? "20px" : "0",
                }}
              >
                <Button onClick={showUpCard} className="border-hidden min-h-96 ">
                <Card
                  style={{ width: 300, cursor: "pointer" }}
                  className="mt-20 text-left"
                  onClick={() => selectProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt=""
                    width={290}
                    height={190}
                    className="mx-1 mt-1"
                  />
                  <p className="mt-4 font-semibold mx-3 text-xs">
                    {product.name}
                  </p>
                  <p className="text-green-500 mx-3 text-xs -mt-2">
                    {product.price}
                  </p>
                  <div className="flex">
                    <p className="mx-3 text-xs">
                      Total Stock{" "}
                      <span className="font-semibold">{product.stock}</span>
                    </p>
                    <p className="text-xs" style={{ marginLeft: "120px" }}>
                      Sold <span className="font-semibold">{product.sold}</span>
                    </p>
                  </div>
                </Card>
                </Button>
              </Col>
            ))}
          </Row>
        </div>

        {cardVisible && (
          <div className="product-card">
            <Card style={{ width: 320 }} className="add-product-card">
              <div className="mx-7 mt-4">
                <p className="font-medium text-2xl">Add Product</p>
                <div className="flex mx-2 -mt-5">
                  <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    className="buttonAddP"
                  >
                    <TabPane tab="Descriptions" key="1">
                      {/* Menampilkan DescAdd jika cardVisible true */}
                      {cardVisible && <DescAdd closeAddCard={closeAddCard} />}
                    </TabPane>
                    <TabPane tab="Stock" key="2">
                      {/* Menampilkan DescAdd jika cardVisible true */}
                      {cardVisible && <StockAdd closeAddCard={closeAddCard} />}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Card>
          </div>
        )}

        {cardVisible2 && (
          <div className="editProduct">
            <Card style={{ width: 320 }} className="add-product-card">
              <div className="mx-7 mt-4">
                <p className="font-medium text-2xl">Edit Product</p>
                <div className="flex mx-2 -mt-5">
                  <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    className="buttonAddP"
                  >
                    <TabPane tab="Descriptions" key="1">
                      {/* Menampilkan DescAdd jika cardVisible true */}
                      {cardVisible2 && <EditDesc closeUpCard={closeUpCard} />}
                    </TabPane>
                    <TabPane tab="Stock" key="2">
                      {/* Menampilkan DescAdd jika cardVisible true */}
                      {cardVisible2 && <EditStock closeUpCard={closeUpCard} />}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
