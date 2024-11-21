"use client";

import CategoryTag from "#/components/ProductCategory/CategoryTag";
import DisplayProduct from "#/components/ProductCategory/DisplayProduct";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import { useProduct, ProductDto } from "#/hooks/product";
import { Spin } from "antd";
import React, { useState, useEffect } from "react";

const ProductCategory = () => {
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();
  const { fetchProduct } = useProduct();

  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();
  const { product, isLoading: productsLoading } = fetchProduct();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Update produk yang difilter berdasarkan kategori dan brand
  const updateFilteredProducts = (categories: string[], brands: string[]) => {
    if (!product || product.length === 0) return;

    const filtered = product.filter((item) => {
      const categoryMatch = categories.length === 0 || item.categories.some((category) => categories.includes(category.name));
      const brandMatch = brands.length === 0 || brands.includes(item.brand.name);
  
      // Memastikan setidaknya ada satu produk yang cocok dengan filter
      return categoryMatch && brandMatch;
    });
  
    if (filtered.length === 0) {
      console.log('No products match the selected filters'); // Log jika tidak ada produk yang cocok
    }
  
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (categories: string[], brands: string[]) => {
    console.log('Selected Categories:', categories);
    console.log('Selected Brands:', brands);
    setSelectedCategories(categories);
    setSelectedBrands(brands);
    updateFilteredProducts(categories, brands);
  };

  useEffect(() => {
    console.log('Filtered Products:', filteredProducts);
    updateFilteredProducts(selectedCategories, selectedBrands);
  }, [selectedCategories, selectedBrands]);

  // Loading state
  if (brandLoading || categoryLoading || productsLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8 px-24 py-16">
      <div className="col-span-3">
        <CategoryTag
          brand={brand}
          category={category}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="col-span-9">
        <DisplayProduct products={filteredProducts} selectedCategories={selectedCategories} selectedBrands={selectedBrands} />
      </div>
    </div>
  );
};

export default ProductCategory;
