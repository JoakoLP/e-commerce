import React from "react";
import categoryService from "../../../../../services/category";
import { useDisableBodyScroll } from "../../../../useDisableBodySroll";

import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const SubCategoryDeleteModal = ({ delModal, setDelModal, subCategory, setSubCateg }) => {
  const closeModal = () => {
    setDelModal(!delModal);
    setSubCateg();
    // document.getElementById("editForm").reset();
  };

  const deleteSubCateg = () => {
    categoryService.subCategoryDel(subCategory._id);
    // window.location.reload(false);
  };

  return (
    <div
      className={
        " fixed flex justify-center items-center overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out " +
        (delModal ? " transition-opacity opacity-100 duration-500 bg-opacity-40 scale-100  " : " transition-opacity opacity-0 bg-opacity-0 scale-0 ")
      }
    >
      <section
        className={
          "max-w-xl absolute bg-white h-min delay-200 duration-500 ease-in-out transition-all transform rounded " + (delModal ? " scale-100 shadow-lg shadow-gray-700 " : "  shadow-none scale-0 ")
        }
      >
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
          <div className="flex flex-col items-center">
            <p>Se eliminará la subCategoría:</p>
            <div className="flex justify-center items-center flex-col border px-2  py-1.5 border-cyan-700 rounded">
              <p>
                <span className="font-medium">ID: </span>
                {subCategory?.id}
              </p>
              <p>
                <span className="font-medium">Nombre: </span>
                {subCategory?.name}
              </p>
              <p>
                <span className="font-medium">Categoría: </span>
                {subCategory?.category ? subCategory?.category?.name : "Ninguna"}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <div>
              <p>¿Está seguro que desea eliminarla?</p>
            </div>
            <div className="flex justify-evenly">
              <button
                type="button"
                onClick={deleteSubCateg}
                className="w-8 bg-red-500 border border-black rounded lg:hover:shadow-inner lg:hover:shadow-neutral-600 hover:bg-red-600 hover:border-red-950 auto-square"
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

export default SubCategoryDeleteModal;
