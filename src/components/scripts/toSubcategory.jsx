import React from "react";
import axios from "axios";
import productServices from "../../services/products";
import { useState } from "react";

const ToSubCategory = () => {
  // category to subCategory
  const [productList, setProductList] = useState();

  productServices.productGet(setProductList);

  const handleClick = () => {
    const newList = [];
    productList.forEach(async (product) => {
      const newProduct = { ...product };
      newProduct.subCategory = product.category;
      newProduct.category = null;
      // previousProd.attributes.push(product.subCategory);
      newList.push(newProduct);
      await productServices.productEdit(newProduct, newProduct._id);
    });
    // console.log(productList[0]);
    // console.log(newList[0]);
    // console.log(newList);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      Category to subCategory
    </button>
  );
};

export default ToSubCategory;
