import React from "react";
import DisplayProduct from "../../../components/Product-Category/DisplayProduct";

const ProductCategory = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3 bg-blue-100">
        kiri
      </div>
      <div className="col-span-9 bg-red-100">
        <DisplayProduct />
      </div>
    </div>
  );
};

export default ProductCategory;
