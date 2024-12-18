"use client";
import BrandTable from "#/components/BrandTable";
import CategoryTable from "#/components/CategoryTable";
import BrandModalForm from "#/components/common/modal/BrandModal";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space, Spin, Table, TableProps, Tag } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

export default function Categories() {

  const { fetchBrand, postBrand } = useBrand();
  const { fetchCategory } = useCategory();

  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();

  if (brandLoading || categoryLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-12 overflow-hidden">
      <div className="col-span-7 p-4 space-y-3 border rounded-md">
        {brand && (<BrandTable brand={brand} />)}
      </div>

      <div className="col-span-5 p-4 space-y-3 border rounded-md">
        {category && (<CategoryTable category={category} />)}
      </div>
    </div>
  )
}