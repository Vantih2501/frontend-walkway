"use client";
import CarouselStock from "#/components/Admin/Dashboard/CarouselStock";
// import { products } from "#/mock-data/products";
import React from "react";
import ContainerInfo from "#/components/Admin/Dashboard/ContainerInfo";
import SiderContent from "#/components/Admin/Dashboard/SiderContent";
import Charts from "#/components/Admin/Dashboard/Charts";
import { useProduct } from "#/hooks/product";
import { Spin } from "antd";
import { useOrder } from "#/hooks/order";

const Dashboard = () => {
  const { fetchProduct } = useProduct();
  const { fetchOrder } = useOrder();

  const { product, isLoading: productLoading } = fetchProduct();
  const { order, isLoading: orderLoading } = fetchOrder();

  if (productLoading || orderLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="h-full col-span-8">
        <div className="mb-4">
          {product && (
            <ContainerInfo
              product={product}
              className="flex justify-between gap-4 h-fit"
            />
          )}
        </div>

        <Charts />

        {/* <div className="h-fit">
          <CarouselStock dataFetch={products} />
        </div> */}
      </div>

      <div className="h-full col-span-4 transition-all ease-in-out border rounded-lg border-zinc-300 hover:border-primary hover:shadow-md">
        {order && <SiderContent orders={order} />}
      </div>
    </div>
  );
};

export default Dashboard;
