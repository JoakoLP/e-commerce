import React from "react";
import categoryService from "../../../../../services/category";
import { useDisableBodyScroll } from "../../../../useDisableBodySroll";
import CategoryDeleteModal from "./categoryDeleteModal";

import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";

const CategoryEditModal = ({ edit, setEdit, editItem, setEditItem }) => {
  const [SubCategoryList, setSubCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [delModal, setDelModal] = useState(false);

  const checkSubCategory = async () => {
    await categoryService.subCategoryGet(setSubCategoryList);
    editItem?.subCategories?.forEach((subCategory) => {
      let isOnCateg = document.getElementById(`subCategory/${subCategory?.id}/${editItem?.id}`);
      if (subCategory && isOnCateg) {
        console.log("si");
        document.getElementById(`subCategory/${subCategory?.id}/${editItem?.id}`).checked = true;
      }
    });
    setIsLoading(false);
    // console.log(checked);
  };

  useEffect(() => {
    checkSubCategory();
  }, [edit]);

  const sendEdition = (e) => {
    e.preventDefault();

    const checkboxes = document.getElementsByName(`subCategory/${editItem?.id}`);
    let subCategories = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // const subCategory = { _id: checkbox._id, id: checkbox.value, name: document.getElementById(`subCategory/${checkbox?.value}/label`).text };
        const subCategory = SubCategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        subCategories.push(subCategory[0]);
      }
      // console.log(subCategories);
    });

    const category = {
      id: document.getElementById(`categoryId/${editItem.id}`).value,
      name: document.getElementById(`categoryName/${editItem.id}`).value,
      subCategories: subCategories,
    };
    // console.log(editItem);

    categoryService.categoryEdit(category, editItem._id);

    // window.location.reload(false);
    closeModal();
  };

  const closeModal = () => {
    setEdit(!edit);
    setEditItem();
    setDelModal(false);
    document.getElementById(`editForm/${editItem?.id}`).reset();
  };

  const style = "flex justify-between items-center py-1.5 w-full px-2";
  const inputStyle = "w-[70%] rounded";
  useDisableBodyScroll(edit);
  return (
    <>
      <div
        className={
          " fixed flex justify-center items-center  overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out transition-opacity  " +
          (edit ? "  opacity-100 duration-500 bg-opacity-40 scale-100  " : "  opacity-0 bg-opacity-0 scale-0 ")
        }
      >
        <section
          className={
            "max-w-xl absolute bg-white delay-200 duration-500 ease-in-out transition-all transform rounded p-4 max-h-[85vh] " +
            (edit ? " scale-100 shadow-lg shadow-gray-700 " : "  shadow-none scale-0 ")
          }
        >
          <header className="flex justify-between">
            <span className="text-lg truncate max-w-[90%]">
              Editar categoría:
              <span className="text-base italic"> {editItem?.name}</span>
            </span>
            <button onClick={closeModal}>
              <XMarkIcon className="w-6 h-6 text-black" />
            </button>
          </header>
          <div className="max-h-[70vh] overflow-auto w-full p-2 whitespace-nowrap">
            {editItem ? (
              <>
                <form id={`editForm/${editItem?.id}`} className="w-full max-h-[90%] border px-2  py-1.5 border-cyan-700 rounded" onSubmit={sendEdition}>
                  <div className={style}>
                    <label htmlFor={`categoryId/${editItem.id}`} title="ID de la categoría">
                      ID
                    </label>
                    <input type="text" name="" id={`categoryId/${editItem.id}`} placeholder="Ej: PC" className={` ${inputStyle}`} defaultValue={editItem.id} />
                  </div>
                  <div className={style}>
                    <label htmlFor={`categoryName/${editItem.id}`} title="Nombre de la categoría">
                      Nombre
                    </label>
                    <input type="text" name="" id={`categoryName/${editItem.id}`} placeholder="Ej: Computación" className={inputStyle} defaultValue={editItem.name} form="editForm" />
                  </div>
                  <div className={`${style} flex-col`}>
                    <p className="self-start">SubCategorías:</p>
                    <div className={`${style} max-w-[95%] grid grid-cols-3 gap-1 self-end max-h-[20%] overflow-auto`}>
                      {isLoading ? (
                        <p>Cargando...</p>
                      ) : (
                        SubCategoryList?.map((subCategory) => {
                          return (
                            <div className="flex items-center pr-2">
                              <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.id}`} name={`subCategory/${editItem?.id}`} value={subCategory?.id} />
                              <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.id}`} id={`subCategory/${subCategory?.id}/label`} className="pl-0.5">
                                {subCategory?.name}
                              </label>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className={`${style} flex-col`}>
                    <button
                      type="submit"
                      className="p-1 duration-300 border border-black rounded text-neutral-200 bg-cyan-700 active:scale-90 active:duration-75 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800"
                    >
                      Enviar edición
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDelModal(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </form>
                <CategoryDeleteModal delModal={delModal} setDelModal={setDelModal} category={editItem} />
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
        <div className="w-screen h-full" onClick={closeModal}></div>
      </div>
    </>
  );
};

export default CategoryEditModal;
