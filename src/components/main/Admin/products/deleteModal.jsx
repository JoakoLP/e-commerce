import React from "react";
import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import productServices from "../../../../services/products";

const DeleteModal = ({ delModal, setDelModal, delItem }) => {
  const closeModal = () => {
    setDelModal(!delModal);
    // document.getElementById("editForm").reset();
  };

  const deleteProd = async () => {
    console.log(delItem);
    await productServices.productDel(delItem._id);
    window.location.reload(false);
  };

  return (
    <div
      className={
        " fixed flex justify-center items-center overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out " +
        (delModal ? " transition-opacity opacity-100 duration-500 bg-opacity-40 scale-100  " : " transition-opacity opacity-0 bg-opacity-0 scale-0 ")
      }
    >
      <section className={"max-w-min absolute bg-white h-min delay-200 duration-500 ease-in-out transition-all transform  border-2 border-black rounded " + (delModal ? " scale-100 " : " scale-0 ")}>
        <header className="left-0 flex items-center justify-center w-full h-8 p-1 border-b border-gray-400">
          <span className="w-[100%] text-lg text-center leading-none  fixed top-2">
            ATENCIÓN!
            {/* <span className="text-base italic"> {delItem?.name}</span> */}
          </span>
          <button onClick={closeModal} className="fixed self-end top-2 right-2">
            <XMarkIcon className="w-5 h-5 text-black" />
          </button>
        </header>
        <div className="justify-between h-full p-3 ">
          <div className="flex flex-col items-center ">
            <p className="text-center">Se eliminará el producto:</p>
            <div className="flex  flex-col border min-w-[20vw] max-w-[60vw] max-h-[70vh] overflow-auto space-y-1 px-2  py-1.5 border-cyan-700 rounded">
              <div className="flex items-center justify-center w-full space-x-2">
                <img src={delItem?.img?.data || delItem?.img} alt={delItem?.prod_id} className="h-20 aspect-auto" />
              </div>
              <div className="flex items-center w-full space-x-2">
                <span className="font-medium">ID: </span>
                <p>{delItem?.prod_id}</p>
              </div>
              <div className="flex items-center w-full space-x-2">
                <span className="font-medium">Nombre: </span>
                <span>{delItem?.name}</span>
              </div>
              <div className="flex items-center w-full space-x-2">
                <span className="font-medium">Precio: </span>
                <span>${delItem?.price}</span>
              </div>
              <div className="flex flex-col items-center w-full space-x-2">
                <p className="w-full font-medium text-left">Categoria{delItem?.category?.length > 1 ? "s" : ""}: </p>
                <div className="flex flex-row">
                  {delItem?.category?.map((category) => {
                    return (
                      <div className="flex items-center pr-2 w-max flex-nowrap ">
                        <input type="checkbox" id={`category/${category?.id}`} checked disabled name="category" value={category?.id} />
                        <label htmlFor={`category/${category?.id}`} id={`category/${category?.id}/label`} className="pl-0.5">
                          {category?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center w-full space-x-2">
                <p className="w-full font-medium text-left">Subcategoria{delItem?.subCategory?.length > 1 ? "s" : ""}: </p>
                <div className="flex flex-row">
                  {delItem?.subCategory?.map((subCategory) => {
                    return (
                      <div className="flex items-center pr-2 w-max flex-nowrap ">
                        <input type="checkbox" id={`subCategory/${subCategory?.id}`} checked disabled name="subCategory" value={subCategory?.id} />
                        <label htmlFor={`subCategory/${subCategory?.id}`} id={`subCategory/${subCategory?.id}/label`} className="pl-0.5">
                          {subCategory?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center w-full space-x-2">
                <p className="w-full font-medium text-left">Etiqueta{delItem?.tags?.length > 1 ? "s" : ""}: </p>
                <div className="flex items-center pr-2 w-max flex-nowrap">
                  {delItem?.tags?.map((item, index) => {
                    return (
                      <div className="flex p-0.5 rounded bg-cyan-300 h-min whitespace-nowrap lg:hover:bg-cyan-400 w-min items-center px-1 m-1">
                        <span id={`tag ${index}`}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-1">
            <div>
              <p className="text-center">¿Está seguro que desea eliminarlo?</p>
            </div>
            <div className="flex pt-1 justify-evenly">
              <button
                type="button"
                onClick={deleteProd}
                className="w-8 bg-red-500 border border-black rounded lg:hover:shadow-inner lg:hover:shadow-neutral-600 hover:bg-red-600 hover:border-red-950 aspect-auto"
              >
                Si
              </button>
              <button type="button" onClick={closeModal} className="w-8 border border-black rounded aspect-auto lg:hover:shadow-inner lg:hover:shadow-neutral-600 ">
                No
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-screen h-full" onClick={closeModal}></div>
    </div>
  );
};

export default DeleteModal;
