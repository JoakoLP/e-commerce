import React from "react";
import axios from "axios";
import productServices from "../../services/products";
import { useState } from "react";

const ToAttributes = () => {
  // subCategory to attributes
  const [productList, setProductList] = useState();

  productServices.productGet(setProductList);

  const handleClick = () => {
    // const newList = [];
    productList.forEach(async (product) => {
      const newProduct = { ...product, attributes: [] };
      newProduct.attributes = [product.subCategory, ...newProduct.attributes];
      newProduct.subCategory = null;
      // previousProd.attributes.push(product.subCategory);
      // newList.push(previousProd);
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
      SubCategory to Attributes
    </button>
  );
};

export default ToAttributes;
