"use client";
import React, { useState } from "react";
import { Button } from "antd";

interface CategoryTagProps {
  brand?: Brand[];
  category?: Category[];
  onFilterChange?: (selectedCategories: string[], selectedBrands: string[], newCategory: string) => void;
}

const TagStyle =
  "m-0 py-4 px-5 rounded-full text-xs border-zinc-300 hover:border-primary hover:text-primary active:bg-primary active:text-white";

const CategoryTag = ({
  brand,
  category,
  onFilterChange
}: CategoryTagProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleSelection = (
    name: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prevList) =>
      prevList.includes(name)
        ? prevList.filter((item) => item !== name)
        : [...prevList, name]
    );
  };

  return (
    <div className="p-6 space-y-8 border border-zinc-300 rounded-2xl">
      <div className="pb-8 border-b border-zinc-300">
        <p className="mb-4">Category</p>
        <div className="flex flex-wrap gap-2">
          {category &&
            category.map((cat) => (
              <Button
                key={cat.id}
                type={selectedCategories.includes(cat.name) ? "primary" : "default"}
                className={`${TagStyle} ${selectedCategories.includes(cat.name) ? "text-white" : "text-zinc-900 bg-white"}`}
                onClick={() => {
                  const newCategory = cat.name;
                  toggleSelection(cat.name, selectedCategories, setSelectedCategories);
                  if (onFilterChange) {
                    onFilterChange(selectedCategories, selectedBrands, newCategory); // Directly use selectedCategories and newCategory
                  }
                }}
              >
                {cat.name}
              </Button>
            ))}
        </div>
      </div>

      <div>
        <p className="mb-4">Brands</p>
        <div className="flex flex-wrap gap-2">
          {brand &&
            brand.map((br) => (
              <Button
                key={br.id}
                type={selectedBrands.includes(br.name) ? "primary" : "default"}
                className={`${TagStyle} ${selectedBrands.includes(br.name) ? "text-white" : "text-zinc-900 bg-white"}`}
                onClick={() => {
                  toggleSelection(br.name, selectedBrands, setSelectedBrands);
                  if (onFilterChange) {
                    onFilterChange(selectedCategories, selectedBrands, ""); // Passing selectedCategories and selectedBrands for the brands change
                  }
                }}
              >
                {br.name}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTag;
