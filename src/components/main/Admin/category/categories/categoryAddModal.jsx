import React, { useState, useEffect } from "react";
import categoryService from "../../../../../services/category";
import { useDisableBodyScroll } from "../../../../useDisableBodySroll";

import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const CategoryAddModal = ({ addModal, setAddModal }) => {
  const categoryAdd = () => {
    const checkboxes = document.getElementsByName("subCategory");
    let subCategories = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const subCategory = SubCategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        subCategories.push(subCategory[0]);
      }
    });

    const category = {
      id: document.getElementById("categoryId").value,
      name: document.getElementById("categoryName").value,
      subCategories: subCategories,
    };
    console.log(category);

    categoryService.categoryAdd(category);
  };

  const [SubCategoryList, setSubCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadSubCategories = async () => {
    await categoryService.subCategoryGet(setSubCategoryList);
    setIsLoading(false);
  };

  useEffect(() => {
    document.getElementById("categoryForm").reset();
    loadSubCategories();
  }, []);

  const closeModal = () => {
    setAddModal(!addModal);
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
            Agregar categoría:
            {/* <span className="text-base italic"> {editItem?.name}</span> */}
          </span>
          <button onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 text-black" />
          </button>
        </header>
        <div className="max-h-[70vh] overflow-auto w-full p-2 whitespace-nowrap">
          <form
            id="categoryForm"
            className="w-full max-h-[90%] border px-2 py-1.5 border-cyan-700 rounded"
            onSubmit={(e) => {
              e.preventDefault();
              categoryAdd();
              window.location.reload(false);
            }}
          >
            <div className={style}>
              <label htmlFor="categoryId" title="ID de la categoría">
                ID:
              </label>
              <input type="text" name="" id="categoryId" placeholder="Ej: PC" required className={` ${inputStyle}`} />
            </div>
            <div className={style}>
              <label htmlFor="categoryName" title="Nombre de la categoría">
                Nombre:
              </label>
              <input type="text" name="" id="categoryName" placeholder="Ej: Computación" required className={inputStyle} form="editForm" />
            </div>
            <div className={`${style} flex-col`}>
              <p className="self-start">SubCategorías:</p>
              <div className={`${style} max-w-[95%] self-end max-h-[20%] overflow-auto`}>
                <div className={` justify-between items-center py-1.5  px-2 min-w-min grid shrink-0 grid-cols-3 gap-1`}>
                  {isLoading ? (
                    <p>Cargando...</p>
                  ) : (
                    SubCategoryList?.map((subCategory) => {
                      return (
                        <div className="flex items-center pr-2 min-w-min">
                          <input type="checkbox" id={`subCategory/${subCategory?.id}`} name="subCategory" value={subCategory?.id} />
                          <label htmlFor={`subCategory/${subCategory?.id}`} id={`subCategory/${subCategory?.id}/label`} className="pl-0.5">
                            {subCategory?.name}
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className={`${style} flex-col`}>
              <button
                className="p-1 duration-300 border border-black rounded text-neutral-200 bg-cyan-700 active:scale-90 active:duration-75 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800"
                title="Agregar categoría"
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

export default CategoryAddModal;
