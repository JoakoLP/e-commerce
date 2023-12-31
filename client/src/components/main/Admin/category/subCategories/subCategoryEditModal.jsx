import React, { useEffect, useState } from "react";

import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import categoryService from "../../../../../services/category";
import { useDisableBodyScroll } from "../../../../useDisableBodySroll";
import { Button } from "@material-tailwind/react";

const SubCategoryEditModal = ({ editModal, setEditModal, subCategory, setSubCateg }) => {
  const subCategoryEdit = () => {
    const newSubCateg = {
      id: document.getElementById(`subCategoryId/${subCategory?.id}`).value,
      name: document.getElementById(`subCategoryName/${subCategory?.id}`).value,
      category: Category,
    };
    categoryService.subCategoryEdit(newSubCateg, subCategory._id);
    // window.location.reload(false);
    console.log(newSubCateg);
  };

  const [CategoryList, setCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [Category, setCategory] = useState({});

  const loadCategories = async () => {
    await categoryService.categoryGet(setCategoryList);
    // console.log(subCategory);
    const category = subCategory?.category;
    if (category) {
      // console.log(category);
      document.getElementById(`category/${category?.id}/${subCategory?.id}`).checked = true;
      setCategory({ id: category?.id, name: category?.name });
    }
    setIsLoading(false);
  };

  const oneCategChecked = (id) => {
    // console.log(id);
    CategoryList.forEach((category) => {
      if (category?.id !== id) {
        // console.log(category?.id);
        // console.log(id);
        const cat = document.getElementById(`category/${category?.id}/${subCategory?.id}`);
        return (cat.checked = false);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, [subCategory]);

  const closeModal = () => {
    document.getElementById(`subCategoryForm/${subCategory?.id}`).reset();
    setEditModal(!editModal);
    setSubCateg();
  };

  const style = "flex justify-between items-center py-1.5 w-full px-2";
  const inputStyle = "w-[70%] rounded";
  useDisableBodyScroll(editModal);
  return (
    <div
      className={
        " fixed flex justify-center items-center  overflow-hidden bg-gray-900 z-10 inset-0 transform ease-in-out transition-opacity  " +
        (editModal ? "  opacity-100 duration-500 bg-opacity-40 scale-100  " : "  opacity-0 bg-opacity-0 scale-0 ")
      }
    >
      <section
        className={
          "max-w-full mx-2 md:max-w-xl absolute bg-white delay-200 duration-500 ease-in-out transition-all transform rounded p-4 max-h-[85vh] " +
          (editModal ? " scale-100 shadow-lg shadow-gray-700 " : "  shadow-none scale-0 ")
        }
      >
        <header className="flex justify-between">
          <span className="text-lg truncate max-w-[90%]">
            Editar sub categoría:
            <span className="text-base italic"> {subCategory?.name}</span>
          </span>
          <button onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 text-black" />
          </button>
        </header>
        <div className="max-h-[70vh] overflow-auto w-full p-2 whitespace-nowrap">
          <form
            id={`subCategoryForm/${subCategory?.id}`}
            className="w-full max-h-[90%] border px-2 py-1.5 border-cyan-700 rounded"
            onSubmit={(e) => {
              e.preventDefault();
              subCategoryEdit();
            }}
          >
            <div className={`${style}`}>
              <label htmlFor={`subCategoryId/${subCategory?.id}`} title="ID de sub categoría.">
                ID:
              </label>
              <input type="text" name="" placeholder='Ejemplo: "PC-NTBK"' defaultValue={subCategory?.id} required id={`subCategoryId/${subCategory?.id}`} className={inputStyle} />
            </div>
            <div className={`${style}`}>
              <label htmlFor={`subCategoryName/${subCategory?.id}`} title="Nombre de sub categoría.">
                Nombre:
              </label>
              <input type="text" name="" placeholder='Ejemplo: "Notebook"' defaultValue={subCategory?.name} required id={`subCategoryName/${subCategory?.id}`} className={inputStyle} />
            </div>
            <div className={`${style} flex-col`}>
              <p className="self-start">Categorías:</p>
              <div className={`${style} max-w-[95%] self-end max-h-[20%] overflow-auto`}>
                <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
                <div className={isLoading ? "hidden" : " justify-between items-center py-1.5 px-2 min-w-min grid shrink-0 grid-cols-2 gap-1"}>
                  {CategoryList?.map((category) => {
                    return (
                      <div className={"flex items-center pr-2 w-min"}>
                        <input
                          type="checkbox"
                          id={`category/${category?.id}/${subCategory?.id}`}
                          name="category"
                          value={category?.id}
                          onClick={(e) => {
                            // console.log(e?.target?.value);
                            const checkedCategory = CategoryList.filter((element) => {
                              return element.id === e?.target?.value;
                            });
                            const { id, name } = checkedCategory[0];
                            oneCategChecked(e?.target?.value);
                            setCategory({ id, name });
                            console.log(Category);
                          }}
                        />
                        <label htmlFor={`category/${category?.id}/${subCategory?.id}`} id={`category/${category?.id}/${subCategory?.id}/label`} className="pl-0.5">
                          {category?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={`${style} flex-col`}>
              <Button type="submit" className="bg-cyan-700" size="sm" title="Enviar edición">
                Enviar edición
              </Button>
            </div>
          </form>
        </div>
      </section>
      <div className="w-screen h-full" onClick={closeModal}></div>
    </div>
  );
};

export default SubCategoryEditModal;
