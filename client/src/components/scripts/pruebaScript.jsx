import React from "react";
import axios from "axios";

import productService from "../../services/products";
import { productList } from "../cart/productList";

const PruebaScript = () => {
  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";

  const script = (e) => {
    e.preventDefault();
    const product = {
      name: document.getElementById("elementName").value,
      price: document.getElementById("elementPrice").value,
      category: document.getElementById("elementCategory").value,
      subCategory: document.getElementById("elementSubCateg").value,
      desc: document.getElementById("elementDesc").value,
      img: document.getElementById("elementImage").value,
      reputation: document.getElementById("elementRep").value,
      brand: document.getElementById("elementBrand").value,
      color: document.getElementById("elementColor").value,
    };

    console.log(product);

    productService.productAdd(product);
  };

  const toDB = async () => {
    // console.log(productList[0]);
    // const credentials = { ...productList[0] };
    // console.log({ ...credentials });
    try {
      // await axios.post("http://localhost:8080/api/cart/product", { ...credentials }, { withCredentials: true }).then((res) => {
      //   console.log(res.data);
      // });

      productList.forEach((product) => {
        const credentials = { ...product };
        console.log(credentials);
        axios.post(`${SERVER_URL}/api/products/add`, { ...credentials }, { withCredentials: true }).then((res) => {
          // axios.post("http://localhost:8080/api/products/add", { ...credentials }, { withCredentials: true }).then((res) => {
          console.log(res.data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const style = "flex justify-between items-center m-2.5";
  return (
    <>
      <div className="p-2 m-10 border border-black rounded-xl w-min whitespace-nowrap">
        <form id="element" onSubmit={script}>
          <div className={style}>
            <label htmlFor="elementName">Name</label>
            <input type="text" name="" id="elementName" placeholder="Nombre" />
          </div>
          <div className={style}>
            <label htmlFor="elementPrice">Price</label>
            <input type="text" name="" id="elementPrice" placeholder="Precio" />
          </div>
          <div className={style}>
            <label htmlFor="elementCategory">Category</label>
            <input type="text" name="" id="elementCategory" placeholder="Categoría" />
          </div>
          <div className={style}>
            <label htmlFor="elementSubCateg">subCategory</label>
            <input type="text" name="" id="elementSubCateg" placeholder="subCategoría" />
          </div>
          <div className={style}>
            <label htmlFor="elementDesc">Description</label>
            <input type="text" name="" id="elementDesc" placeholder="Descripción" />
          </div>
          <div className={style}>
            <label htmlFor="elementImage">Image</label>
            <input type="text" name="" id="elementImage" placeholder="Imagen" />
          </div>
          <div className={style}>
            <label htmlFor="elementRep">Reputation</label>
            <input type="text" name="" id="elementRep" placeholder="Reputación" />
          </div>
          <div className={style}>
            <label htmlFor="elementBrand">Brand</label>
            <input type="text" name="" id="elementBrand" placeholder="Marca" />
          </div>
          <div className={style}>
            <label htmlFor="elementColor">Color</label>
            <input type="text" name="" id="elementColor" placeholder="Color" />
          </div>
          <button className="flex self-end p-1 border border-black rounded hover:bg-orange-200">Enviar</button>
        </form>
        <button onClick={toDB}>Agregar a DB!</button>
      </div>
    </>
  );
};

export default PruebaScript;
