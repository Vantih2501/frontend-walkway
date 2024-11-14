"use client";
import CarouselStock from "#/components/Admin/Dashboard/CarouselStock";
// import { products } from "#/mock-data/products";
import React from "react";
import ContainerInfo from "#/components/Admin/Dashboard/ContainerInfo";
import SiderContent from "#/components/Admin/Dashboard/SiderContent";
import Charts from "#/components/Admin/Dashboard/Charts";
import DashboardTable from "#/components/DashboardTable";
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
    <div className="space-y-4">
      {/* <div className="grid grid-cols-12 gap-4">
        <div className="h-full col-span-8">
          <div className="mb-4">
            {product && order && (
              <ContainerInfo
                product={product}
                order={order}
                className="flex justify-between gap-4 h-fit"
              />
            )}
          </div>

          {order && <Charts order={order} />}
        </div>

        <aside className="h-full col-span-4 transition-all ease-in-out border rounded-lg border-zinc-300 hover:border-primary hover:shadow-md">
          {order && <SiderContent orders={order} />}
        </aside>
      </div>
      <footer className="w-full">
        <DashboardTable product={product} />
      </footer> */}
    </div>
  );
};

export default Dashboard;
