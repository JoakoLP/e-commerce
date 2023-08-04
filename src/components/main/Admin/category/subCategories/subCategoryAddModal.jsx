import React from "react";
import categoryService from "../../../../../services/category";
import { useDisableBodyScroll } from "../../../../useDisableBodySroll";

import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const SubCategoryAddModal = ({ addModal, setAddModal }) => {
  const subCategoryAdd = () => {
    const subCategory = {
      id: document.getElementById("subCategoryId").value,
      name: document.getElementById("subCategoryName").value,
    };
    categoryService.subCategoryAdd(subCategory);
    window.location.reload(false);
    console.log(subCategory);
  };

  const closeModal = () => {
    setAddModal(!addModal);
    document.getElementById("subCategoryForm").reset();
  };

  const style = "flex justify-between items-center py-1.5 w-full px-2";
  const inputStyle = "w-[70%] rounded";
  useDisableBodyScroll(addModal);
  return (
    <div
      className={
        " fixed flex justify-center items-center  overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out transition-opacity  " +
        (addModal ? "  opacity-100 duration-500 bg-opacity-40 scale-100  " : "  opacity-0 bg-opacity-0 scale-0 ")
      }
    >
      <section
        className={
          "max-w-xl absolute bg-white delay-200 duration-500 ease-in-out transition-all transform rounded p-4 max-h-[85vh] " +
          (addModal ? " scale-100 shadow-lg shadow-gray-700 " : "  shadow-none scale-0 ")
        }
      >
        <header className="flex justify-between">
          <span className="text-lg truncate max-w-[90%]">
            Agregar sub categoría:
            {/* <span className="text-base italic"> {editItem?.name}</span> */}
          </span>
          <button onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 text-black" />
          </button>
        </header>
        <div className="max-h-[70vh] overflow-auto w-full p-2 whitespace-nowrap">
          <form
            id="subCategoryForm"
            className="w-full max-h-[90%] border px-2 py-1.5 border-cyan-700 rounded"
            onSubmit={(e) => {
              e.preventDefault();
              subCategoryAdd();
            }}
          >
            <div className={`${style}`}>
              <label htmlFor="subCategoryId" title="ID de sub categoría.">
                ID:
              </label>
              <input type="text" name="" placeholder='Ejemplo: "PC-NTBK"' required id="subCategoryId" className={inputStyle} />
            </div>
            <div className={`${style}`}>
              <label htmlFor="subCategoryName" title="Nombre de sub categoría.">
                Nombre:
              </label>
              <input type="text" name="" placeholder='Ejemplo: "Notebook"' required id="subCategoryName" className={inputStyle} />
            </div>

            <div className={`${style} flex-col`}>
              <button
                className="p-1 duration-300 border border-black rounded text-neutral-200 bg-cyan-700 active:scale-90 active:duration-75 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800"
                title="Agregar sub categoría"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className="w-screen h-full" onClick={closeModal}></div>
    </div>
  );
};

export default SubCategoryAddModal;
