import React from "react";
import axios from "axios";
import productServices from "../../services/products";
import { useState } from "react";

const DeleteAllProd = () => {
  // subCategory to attributes
  const [productList, setProductList] = useState();

  productServices.productGet(setProductList);

  const handleClick = () => {
    // const newList = [];
    productList.forEach(async (product) => {
      // const newProduct = { ...product };
      // newProduct.prod_id = product.id;
      // delete newProduct.id;
      // previousProd.attributes.push(product.subCategory);
      // newList.push(newProduct);
      // console.log(newProduct);
      // await productServices.productEdit(newProduct, product._id);
      // console.log(product._id);
      const id = product._id;
      console.log(id);
      await productServices.productDel(id);
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
      Delete all products
    </button>
  );
};

export default DeleteAllProd;
