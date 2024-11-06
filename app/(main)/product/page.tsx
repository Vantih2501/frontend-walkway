"use client"
import CategoryTag from "#/components/ProductCategory/CategoryTag";
import DisplayProduct from "#/components/ProductCategory/DisplayProduct";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import { Spin } from "antd";
// import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ProductCategory = () => {
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();
  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  console.log(selectedBrands, selectedCategories)
  const handleFilterChange = (categories: string[], brands: string[]) => {
    setSelectedCategories(categories);
    setSelectedBrands(brands);
  };

  useEffect(() => {
    const query = new URLSearchParams();
    if (selectedCategories.length > 0) {
      query.append("category", selectedCategories.join(" "));
    }
    if (selectedBrands.length > 0) {
      query.append("brand", selectedBrands.join(" "));
    }
    // router.push(`?${query.toString()}`, undefined, { shallow: true });
  }, [selectedCategories, selectedBrands, 
    // router
  ]);

  if (brandLoading || categoryLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-5 p-24">
      <div className="col-span-3">
        <CategoryTag
          brand={brand}
          category={category}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="col-span-9">
        <DisplayProduct
        // Use selectedCategories and selectedBrands to filter displayed products if needed
        />
      </div>
    </div>
  );
};

export default ProductCategory;
