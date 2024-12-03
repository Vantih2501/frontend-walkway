"use client";

import CategoryTag from "#/components/ProductCategory/CategoryTag";
import DisplayProduct from "#/components/ProductCategory/DisplayProduct";
import { useBrand } from "#/hooks/brand";
import { useCategory } from "#/hooks/category";
import { useProduct, ProductDto } from "#/hooks/product";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ProductCategory = () => {
  const { fetchBrand } = useBrand();
  const { fetchCategory } = useCategory();
  const { fetchProduct } = useProduct();
  const router = useRouter();

  const { brand, isLoading: brandLoading } = fetchBrand();
  const { category, isLoading: categoryLoading } = fetchCategory();
  const { product, isLoading: productsLoading } = fetchProduct();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const searchParams = useSearchParams();
  const categoryQuery = searchParams ? searchParams.get('category') || 'All Product' : 'All Product';

  useEffect(() => {
    if(product && category) {
      // Setel kategori yang dipilih berdasarkan parameter kategori di URL
      setSelectedCategories([categoryQuery]);

      // Filter produk berdasarkan kategori yang dipilih
      const filtered = product.filter((product) =>
        categoryQuery === 'All Product'
          ? true
          : product.categories?.some((cat) => cat.name.toLowerCase() === categoryQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchParams, product]); 

  // Memperbarui produk yang difilter berdasarkan kategori dan brand yang dipilih
  const updateFilteredProducts = (categories: string[], brands: string[]) => {
    if (!product || product.length === 0) return;

    const filtered = product.filter((item) => {
      const categoryMatch = categories.length === 0 || item.categories.some((category) => categories.includes(category.name));
      const brandMatch = brands.length === 0 || brands.includes(item.brand.name);
  
      // Pastikan produk cocok dengan kategori dan brand yang dipilih
      return categoryMatch && brandMatch;
    });

    if (filtered.length === 0) {
      console.log('Tidak ada produk yang cocok dengan filter yang dipilih');
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (categories: string[], brands: string[], newCategory: string) => {
    console.log('Kategori yang Dipilih:', categories);
    console.log('Brand yang Dipilih:', brands);

    setSelectedCategories(categories);
    setSelectedBrands(brands);

    // Memperbarui produk berdasarkan filter yang baru
    updateFilteredProducts(categories, brands);
    router.push(`/product?category=${newCategory}`);
  };

  useEffect(() => {
    console.log('Produk yang sudah difilter:', filteredProducts);
    updateFilteredProducts(selectedCategories, selectedBrands);
  }, [selectedCategories, selectedBrands]); // Update ketika kategori atau brand berubah

  // Menampilkan loading state jika data brand, kategori, atau produk sedang dimuat
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
