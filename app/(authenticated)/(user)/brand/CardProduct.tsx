"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Select, Typography } from "antd";

const { Title } = Typography;

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const products = [
  {
    id: 1,
    name: "Air Jordan 1 Low Midnight Navy",
    price: 2500000,
    image: "/product3.png",
  },
  {
    id: 2,
    name: "Adidas Handball Spezial",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 3,
    name: "Air Jordan 1 Low Midnight Navy",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 4,
    name: "Adidas Handball Spezial",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 5,
    name: "Adidas Handball Spezial",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 6,
    name: "Air Jordan 1 Low Midnight Navy",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 7,
    name: "Adidas Handball Spezial",
    price: 2850000,
    image: "/product3.png",
  },
  {
    id: 8,
    name: "Air Jordan 1 Low Midnight Navy",
    price: 2850000,
    image: "/product3.png",
  },
];

export default function ProductBrand() {
  return (
    <div className="container mx-auto mt-12">
      <div className="flex mt-16 mx-16">
        {/* <h3>Search Category</h3>
        <Select
          className="mx-4 -mt-1 w-64"
          showSearch
          placeholder="Select Category"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          defaultValue="All"
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "sports",
              label: "Sports",
            },
            {
              value: "sneakers",
              label: "Sneakers",
            },
            {
              value: "casual",
              label: "Casual",
            },
          ]}
        /> */}
      </div>

      <div className="productList mx-12 ">
        <Row className="mx-20 mt-20">
          {products.map((product, index) => (
            <Col
              lg={9}
              xl={6}  
              xxl={5}
              key={product.id}
              style={{
                marginBottom: "40px",
              }}
              className="xl:mr-20 2xl:mr-12" 
            >
              <Card style={{ width: 300 }}>
                <Image
                  src={product.image}
                  alt=""
                  width={290}
                  height={190}
                  className="mx-1 mt-1"
                />
                <p className="mt-4 font-semibold mx-5 text-xs">
                  {product.name}
                </p>
                <p className=" mx-5 text-xs -mt-2">{product.price}</p>
                <div className="flex mx-5 mt-3">
                  <Button type="primary">Buy Now</Button>
                  <Button type="default" className="mx-3"><ShoppingCartOutlined /></Button>
                </div>
                <br />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <br />
      <br />
    </div>
  );
}
