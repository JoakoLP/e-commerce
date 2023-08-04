import React from "react";
import axios from "axios";
import productServices from "../../services/products";
import { useState } from "react";

const ToSubCategoryTemp = () => {
  // category to subCategory
  const [productList, setProductList] = useState();

  productServices.productGet(setProductList);

  const handleClick = () => {
    const newList = [];
    productList.forEach(async (product) => {
      const newProduct = { ...product };
      newProduct.subCategoryTemp = product.subCategory;
      newProduct.subCategory = null;
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
      subCategory to subCategoryTemp
    </button>
  );
};

export default ToSubCategoryTemp;
