import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useDisableBodyScroll } from "../../../useDisableBodySroll";
import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import productsService from "../../../../services/products";
import categoryService from "../../../../services/category";
import { useEffect } from "react";
import { CartContext } from "../../../../contexts/CartProvider";
import { useContext } from "react";
import DeleteModal from "./deleteModal";
import { useLayoutEffect } from "react";

const EditModal = ({ edit, setEdit, editItem, setEditItem }) => {
  const [delModal, setDelModal] = useState(false);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategRest, setSubCategRest] = useState([]);

  // category fetch
  const loadCategories = async () => {
    await categoryService.categoryGet(setCategoryList).then(() => {
      editItem?.category?.forEach((category) => {
        let isOnCateg = document.getElementById(`category/${category?.id}/${editItem?.prod_id}`);
        let isOnItem = editItem?.category?.filter((cat) => {
          return cat.id == category.id;
        });
        if (isOnCateg && isOnItem) {
          document.getElementById(`category/${category?.id}/${editItem?.prod_id}`).checked = true;
        } else {
          if (isOnCateg) {
            document.getElementById(`category/${category?.id}/${editItem?.prod_id}`).checked = false;
          }
        }
      });
    });

    await categoryService.subCategoryGet(setSubCategoryList).then(() => {
      editItem?.subCategory?.forEach((subCategory) => {
        let isOnCateg = document.getElementById(`subCategory/${subCategory?.id}/${editItem?.prod_id}`);
        let isOnItem = editItem?.subCategory?.filter((subCat) => {
          return subCat.id == subCategory.id;
        });
        if (isOnCateg && isOnItem) {
          document.getElementById(`subCategory/${subCategory?.id}/${editItem?.prod_id}`).checked = true;
        } else {
          if (isOnCateg) {
            document.getElementById(`subCategory/${subCategory?.id}/${editItem?.prod_id}`).checked = false;
          }
        }
      });
    });
    if (edit) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (edit) {
      // document.getElementById("editForm")?.reset();
      setTags(editItem?.tags ? editItem.tags : []);
    }
    loadCategories();
    filterSubCategRest();
  }, [edit, editItem]);

  useLayoutEffect(() => {
    if (!isLoading && edit) {
      checkCateg();
      checkImgURL();
      checkImgFile();
    }
  }, [isLoading]);

  const sendEdition = (e) => {
    e.preventDefault();
    // check categories
    const catCheckboxes = document.getElementsByName(`category/${editItem?.prod_id}`);
    let categories = [];
    console.log({ catCheckboxes });
    catCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const category = CategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        categories.push(category[0]);
        console.log({ categories });
      }
    });
    // check subcategories
    const subCatCheckboxes = document.getElementsByName(`subCategory/${editItem?.prod_id}`);
    let subCategories = [];
    subCatCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const subCategory = SubCategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        subCategories.push(subCategory[0]);
        console.log({ subCategories });
      }
    });
    const product = {
      prod_id: document.getElementById("elementID").value,
      name: document.getElementById("elementName").value,
      price: document.getElementById("elementPrice").value,
      tags: tags,
      category: categories,
      subCategory: subCategories,
      desc: document.getElementById("elementDesc").value,
      img: image,
      reputation: document.getElementById("elementRep").value,
      brand: document.getElementById("elementBrand").value,
      color: document.getElementById("elementColor").value,
    };
    console.log(product, editItem._id);
    productsService.productEdit(product, editItem._id).then(() => {
      window.location.reload(false);
    });
  };

  const closeModal = () => {
    setIsLoading(true);
    setEdit(!edit);
    setEditItem(null);
    document.getElementById("editForm").reset();
  };

  // IMG
  const [image, setImage] = useState({ type: "", data: {} });
  const checkImgFile = (e) => {
    const ImgFile = document.getElementById("elementImageFile");
    const ImgURL = document.getElementById("elementImageURL");
    if (e?.target?.files[0] || ImgFile?.files[0]) {
      // console.log(e.target.files[0]);
      ImgURL.disabled = true;
      ImgURL.required = false;
      setImage({ type: "File", data: e.target.files[0] });
    } else {
      ImgURL.disabled = false;
      ImgURL.required = true;
    }
  };
  const checkImgURL = (e) => {
    const ImgURL = document.getElementById("elementImageURL");
    const ImgFile = document.getElementById("elementImageFile");
    // console.log(!!e.target.value);
    if (e?.target?.value || ImgURL?.value) {
      ImgFile.disabled = true;
      ImgFile.required = false;
      setImage({ type: "URL", data: e?.target?.value || ImgURL?.value });
    } else {
      ImgFile.disabled = false;
      ImgFile.required = true;
    }
  };

  // set "required" false if any category is checked
  const checkCateg = () => {
    let categInputs = [];
    CategoryList.forEach((category) => {
      categInputs.push(document.getElementById(`category/${category?.id}/${editItem?.prod_id}`));
    });
    console.log({ categInputs });
    let categCheckeds = categInputs.filter((categ) => {
      return categ.checked === true;
    });
    if (categCheckeds.length > 0) {
      console.log({ categCheckeds });
      let categUncheckeds = categInputs.filter((categ) => {
        return categ.checked === false;
      });
      categUncheckeds.forEach((categ) => {
        return (categ.required = false);
      });
    }
  };

  const filterSubCategRest = () => {
    const check = SubCategoryList.filter((subCategory) => {
      return subCategory?.category === null;
    });
    setSubCategRest(check);
    console.log(subCategRest);
  };

  // tags
  const [tags, setTags] = useState(editItem?.tags ? editItem.tags : []);
  const addTag = (e) => {
    e.preventDefault();
    const newTag = document.getElementById("elementTag").value;
    const checkOnTags = tags.filter((tag) => {
      return tag === newTag;
    });
    console.log(newTag);
    console.log(newTag.length);
    switch (true) {
      case newTag:
        console.log(checkOnTags);
      case checkOnTags < 1 && newTag.length > 0:
        console.log(newTag);
        setTags([...tags, newTag]);
        break;
      default:
        break;
    }
    console.log(tags);
    const input = document.getElementById("elementTag");
    input.value = "";
  };
  const deleteTag = (index) => {
    console.log(index);
    const delTag = document.getElementById(`tag ${index}`).textContent;
    console.log(delTag);
    setTags(
      tags.filter((tag) => {
        return tag != delTag;
      })
    );
    console.log(tags);
  };

  const style = "flex justify-between items-center py-1.5 w-full px-2";
  const inputStyle = "w-[70%] rounded-sm";
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
            "max-w-[95vw] sm:max-w-xl xl:max-w-2xl md:min-w-[40vw] absolute bg-white delay-200 duration-500 ease-in-out transition-all transform outline outline-2 outline-black rounded-sm p-4 max-h-[85vh] " +
            (edit ? " scale-100 " : " scale-0 ")
          }
        >
          <header className="flex justify-between">
            <span className="text-lg truncate max-w-[90%]">
              Editar producto:
              <span className="text-base italic"> {editItem?.name}</span>
            </span>
            <button onClick={closeModal}>
              <XMarkIcon className="w-6 h-6 text-black" />
            </button>
          </header>
          <div className="max-h-[70vh] overflow-auto w-full p-3 border border-gray-400 rounded-sm whitespace-nowrap">
            <>
              <form id="editForm" className={`${editItem ? "visible" : "hidden"} w-full max-h-[90%] rounded-sm`} onSubmit={sendEdition}>
                {/* img preview */}
                <div className="flex items-center justify-center w-full space-x-2">
                  <img src={editItem?.img?.data || editItem?.img} alt={editItem?.prod_id} className="h-24 aspect-auto" />
                </div>
                {/* id */}
                <div className={style}>
                  <label htmlFor="elementId" title="ID interna del producto.">
                    ID
                  </label>
                  <input type="number" name="" id="elementID" placeholder="ID" className={` text-gray-600 ${inputStyle}`} value={editItem?.prod_id} />
                </div>

                {/* name */}
                <div className={style}>
                  <label htmlFor="elementName" title="Nombre que se mostrará.">
                    Nombre
                  </label>
                  <input type="text" name="" id="elementName" placeholder="Nombre" className={inputStyle} defaultValue={editItem?.name} form="editForm" />
                </div>

                {/* price */}
                <div className={style}>
                  <label htmlFor="elementPrice" title="Valor del producto.">
                    Precio
                  </label>
                  <div className={`${inputStyle} relative`}>
                    <input type="number" name="" step="0.01" id="elementPrice" placeholder="Precio" className={"w-full rounded-sm pl-6"} defaultValue={editItem?.price} />
                    <div className="absolute top-0 flex items-center justify-center h-full select-none left-3">
                      <p>$</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-500 rounded-sm my-1.5 w-full flex flex-col justify-center items-center overflow-hidden">
                  <p className="text-lg text-center cursor-default">Categorización</p>
                  <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
                  <div className={isLoading ? "hidden" : `visible grid grid-flow-row grid-cols-2 shrink-0 gap-3 justify-between py-1.5 w-[100%] px-2 items-start`}>
                    {CategoryList.map((category) => {
                      return (
                        <div className="text-black w-min">
                          <div className="flex items-center space-x-1 justify-start">
                            <input type="checkbox" id={`category/${category?.id}/${editItem?.prod_id}`} onChange={checkCateg} required name={`category/${editItem?.prod_id}`} value={category?.id} />
                            <label htmlFor={`category/${category?.id}/${editItem?.prod_id}`} id={`category/${category?.id}/label`} className="w-min font-semibold pl-0.5">
                              {category?.name}
                            </label>
                          </div>
                          {category?.subCategories.length > 0 ? (
                            <ul className="flex flex-col items-start pl-3 text-sm">
                              {category?.subCategories?.map((subCategory) => (
                                <li className="flex items-center space-x-1 justify-center">
                                  <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name={`subCategory/${editItem?.prod_id}`} value={subCategory?.id} />
                                  <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
                                    {subCategory?.name}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            {}
                          )}
                        </div>
                      );
                    })}
                    <div className={subCategRest.length > 0 ? "visible text-black w-min" : "hidden"}>
                      <ul className="list-disc list-inside">
                        <li className="font-semibold">Otras subcategorías</li>
                        <ul className="flex flex-col items-start pl-3 text-sm">
                          {subCategRest?.map((subCategory) => {
                            // console.log(subCategory);
                            return (
                              <li className="flex items-center space-x-1 justify-center">
                                <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name={`subCategory/${editItem?.prod_id}`} value={subCategory?.id} />
                                <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
                                  {subCategory?.name}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </ul>
                    </div>
                  </div>

                  {/* category
                  <div className={`${style} flex-col`}>
                    <p className="self-start">Categoría:</p>
                    <div className={`${style} max-w-[95%] self-end max-h-[20%] overflow-hidden`}>
                      <div className={`items-center w-full grid auto-cols-max max-w-full gap-1`}>
                        <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
                        {CategoryList?.map((category) => {
                          return (
                            <div className={isLoading ? "hidden" : "visible flex items-center pr-2 min-w-min"}>
                              <input type="checkbox" id={`category/${category?.id}/${editItem?.prod_id}`} onChange={checkCateg} required name={`category/${editItem?.prod_id}`} value={category?.id} />
                              <label htmlFor={`category/${category?.id}/${editItem?.prod_id}`} id={`category/${category?.id}/label`} className="w-min text-sm pl-0.5">
                                {category?.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div> */}

                  {/* subcategory
                  <div className={`${style} flex-col`}>
                    <p className="self-start">SubCategorías:</p>
                    <div className={`${style} max-w-[95%] self-end max-h-[20%] overflow-auto`}>
                      <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
                      <div className={isLoading ? "hidden" : `visible${style} grid shrink-1 grid-cols-3 gap-1 gap-x-0`}>
                        {SubCategoryList?.map((subCategory) => {
                          return (
                            <div className={" flex items-center w-min min-w-min"}>
                              <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name={`subCategory/${editItem?.prod_id}`} value={subCategory?.id} />
                              <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
                                {subCategory?.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div> */}

                  {/* subCategory temp */}
                  <div className={`${style}`}>
                    <label htmlFor="elementSubCateg" title="Sub categoría a la que pertenecerá. Ej: Notebooks.">
                      Sub categoría temp
                    </label>
                    <input type="text" name="" id="elementSubCateg" placeholder="subCategoría" disabled className={`text-gray-600 ${inputStyle}`} defaultValue={editItem?.subCategoryTemp} />
                  </div>

                  {/* tags */}
                  <form className="border border-cyan-500 border-dashed py-1.5 rounded-b-sm m-[-1px] mt-0">
                    <p className="text-lg text-center cursor-default" title="Etiquetas del producto que ayudarán a su búsqueda. Ej: amd, notebook, portatil, etc.">
                      Etiquetas
                    </p>
                    <div className={style}>
                      <label htmlFor="elementTag">Agregar</label>
                      <div className="flex">
                        <input type="text" id="elementTag" placeholder="Etiqueta" className="rounded-l-sm rounded-r-none" defaultValue="" />
                        <button
                          className="px-3 py-2 border border-l-0 border-black rounded-l-none rounded-r-sm bg-cyan-400 hover:bg-cyan-600 hover:shadow-inner lg:hover:shadow-neutral-800 "
                          title="Agregar"
                          onClick={addTag}
                        >
                          <PlusSmallIcon className="w-6 h-6 text-black" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5 w-full px-2">
                      <p className="cursor-default">Etiquetas</p>
                      <div className="flex flex-wrap justify-end max-w-[80%]">
                        {tags.map((item, index) => {
                          return (
                            <div className="flex p-0.5 rounded-sm bg-cyan-300 outline outline-1 outline-cyan-600 md:hover:shadow-inner md:hover: w-min items-center px-1 m-1">
                              <span id={`tag ${index}`}>{item}</span>
                              <button
                                type="button"
                                className="flex ml-0.5 items-center text-center justify-center w-4 h-4 border border-black rounded-sm md:hover:bg-cyan-500 md:hover:shadow-inner md:hover:shadow-neutral-800"
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log(index);
                                  deleteTag(index);
                                }}
                              >
                                <XMarkIcon className="w-6 h-6 text-black" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </form>
                </div>

                {/* desc */}
                <div className={style}>
                  <label htmlFor="elementDesc" title="Descripción del producto. Ej: 'Ordenador portatil ideal para ofimática...'">
                    Descripción
                  </label>
                  <input type="text" name="" id="elementDesc" placeholder="Descripción" className={inputStyle} defaultValue={editItem?.desc} />
                </div>

                {/* image */}
                <div className={style}>
                  <label htmlFor="elementImage">Imagen:</label>
                  <div className="flex flex-col w-[70%] space-y-1">
                    <input
                      type="text"
                      name=""
                      id="elementImageURL"
                      className="rounded-sm"
                      placeholder="Ej: https://i.imgur.com/nsvoUWH.jpg"
                      required
                      onChange={checkImgURL}
                      defaultValue={editItem?.img?.data || editItem?.img}
                    />
                    <input type="file" accept=".png,.jpg,.jpeg" id="elementImageFile" className="w-full text-xs border border-black rounded-sm" name="" required onChange={checkImgFile} />
                    <span className="text-xs">Subir archivo o link de imagen, no ambos.</span>
                  </div>
                </div>

                {/* reputation */}
                <div className={style}>
                  <label htmlFor="elementRep" title="Reputación del producto.">
                    Reputación
                  </label>
                  <input type="number" name="" id="elementRep" placeholder="Reputación" className={inputStyle} defaultValue={editItem?.reputation} />
                </div>

                {/* brand */}
                <div className={style}>
                  <label htmlFor="elementBrand" title="Marca del producto. Ej: Lenovo.">
                    Marca
                  </label>
                  <input type="text" name="" id="elementBrand" placeholder="Marca" className={inputStyle} defaultValue={editItem?.brand} />
                </div>

                {/* color */}
                <div className={style}>
                  <label htmlFor="elementColor" title="Color del producto. Ej: Negro.">
                    Color
                  </label>
                  <input type="text" name="" id="elementColor" placeholder="Color" className={inputStyle} defaultValue={editItem?.color} />
                </div>

                <div className="flex justify-evenly w-full py-1.5">
                  <button
                    type="button"
                    className="flex self-end p-1 text-white duration-100 bg-red-500 border border-black rounded-sm select-none active:scale-90 active:duration-75 active:bg-red-600 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-red-600 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800"
                    onClick={() => {
                      setDelModal(!delModal);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    type="submit"
                    className="p-1 text-white duration-100 border border-black rounded-sm select-none bg-cyan-700 active:scale-90 active:duration-75 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   sendEdition();
                    // }}
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </>
          </div>
        </section>
        <div className="w-screen h-full" onClick={closeModal}></div>
      </div>
      <DeleteModal delModal={delModal} setDelModal={setDelModal} delItem={editItem} />
    </>
  );
};

export default EditModal;
