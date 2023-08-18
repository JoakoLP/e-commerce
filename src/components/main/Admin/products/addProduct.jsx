import React, { useEffect, useState } from "react";
import productService from "../../../../services/products";
import categoryService from "../../../../services/category";
import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const AddProduct = () => {
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategRest, setSubCategRest] = useState([]);

  // category fetch
  const loadCategories = async () => {
    await categoryService.subCategoryGet(setSubCategoryList);
    await categoryService.categoryGet(setCategoryList);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterSubCategRest();
  }, [SubCategoryList]);

  const script = (e) => {
    e.preventDefault();
    // check categories
    const catCheckboxes = document.getElementsByName("category");
    let categories = [];
    catCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const category = CategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        categories.push(category[0]);
      }
    });

    // check subcategories
    const subCatCheckboxes = document.getElementsByName("subCategory");
    let subCategories = [];
    subCatCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const subCategory = SubCategoryList.filter((element) => {
          return element.id === checkbox.value;
        });
        subCategories.push(subCategory[0]);
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
    console.log(product);
    productService.productAdd(product);
  };

  // IMG
  const [image, setImage] = useState({ type: "", data: {} });
  const checkImgFile = (e) => {
    const ImgURL = document.getElementById("elementImageURL");
    if (e.target.files[0]) {
      // console.log(e.target.files[0]);
      ImgURL.disabled = true;
      setImage({ type: "File", data: e.target.files[0] });
      console.log(image);
    } else {
      ImgURL.disabled = false;
    }
  };
  const checkImgURL = (e) => {
    const ImgFile = document.getElementById("elementImageFile");
    // console.log(!!e.target.value);
    if (e.target.value) {
      ImgFile.disabled = true;
      setImage({ type: "URL", data: e.target.value });
      console.log(image);
    } else {
      ImgFile.disabled = false;
    }
  };

  // set required false if any category is checked
  const checkCateg = () => {
    let categInputs = [];
    CategoryList.forEach((category) => {
      categInputs.push(document.getElementById(`category/${category?.id}`));
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
        categ.required = false;
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

  // Tags
  const [tags, setTags] = useState([]);
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
        return tag !== delTag;
      })
    );
    console.log(tags);
  };

  const style = "flex justify-between items-center py-1.5 w-full px-2";

  return (
    <div className="flex justify-center py-3 md:px-4">
      <div className="max-w-[95vw] sm:max-w-xl xl:max-w-2xl md:min-w-[50vw] shadow-sm-light bg-white shadow-neutral-500 p-4 sm:m-10 rounded whitespace-nowrap">
        <span className="text-lg truncate pb-3 font-semibold max-w-[90%]">Agregar producto:</span>
        <form id="element" onSubmit={script} className="w-full max-h-min border px-2 py-1.5 border-cyan-700 rounded-sm whitespace-nowrap">
          {/* id */}
          <div className={style}>
            <label htmlFor="elementID">ID:</label>
            <input type="number" name="" id="elementID" required className="rounded-sm w-[70%]" placeholder="Ej: 103" />
          </div>

          {/* name */}
          <div className={style}>
            <label htmlFor="elementName">Nombre:</label>
            <input type="text" name="" id="elementName" required className="rounded-sm w-[70%]" placeholder="Ej: Placa De Video GeForce RTX 3070 Ti 8Gb Msi Ventus 3X Oc" />
          </div>

          {/* price */}
          <div className={style}>
            <label htmlFor="elementPrice">Precio:</label>
            <div className={`rounded-sm w-[70%] relative`}>
              <input type="number" name="" step="0.01" id="elementPrice" placeholder="Precio" className={"w-full rounded-sm pl-6"} />
              <div className="absolute top-0 flex items-center justify-center h-full select-none left-3">
                <p>$</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-500 rounded-sm my-1.5">
            <p className="text-xl font-semibold text-center cursor-default">Categorización</p>
            <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
            <div className={isLoading ? "hidden" : `visible grid grid-flow-row grid-cols-2 shrink-0 gap-3 justify-between py-1.5 w-[100%] px-2 items-start`}>
              {CategoryList.map((category) => {
                return (
                  <div className="text-black w-min">
                    <div className="flex items-center justify-start space-x-1">
                      <input type="checkbox" id={`category/${category?.id}`} onChange={checkCateg} required name="category" value={category?.id} />
                      <label htmlFor={`category/${category?.id}`} id={`category/${category?.id}/label`} className="w-min text-sm pl-0.5">
                        {category?.name}
                      </label>
                    </div>

                    <ul className={category?.subCategories.length > 0 ? ` visible flex flex-col items-start pl-3 text-sm` : "hidden"}>
                      {category?.subCategories?.map((subCategory) => (
                        <li className="flex items-center justify-center space-x-1">
                          <input type="checkbox" id={`subCategory/${subCategory?.id}`} name="subCategory" value={subCategory?.id} />
                          <label htmlFor={`subCategory/${subCategory?.id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
                            {subCategory?.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className={subCategRest.length > 0 ? "visible text-black w-min" : "hidden"}>
                <ul className="list-disc list-inside">
                  <li className="font-semibold">
                    <span className="ml-[-10px]">Otras subcategorías</span>
                  </li>
                  <ul className="flex flex-col items-start pl-3 text-sm">
                    {subCategRest?.map((subCategory) => {
                      // console.log(subCategory);
                      return (
                        <li className="flex items-center justify-center space-x-1">
                          <input type="checkbox" id={`subCategory/${subCategory?.id}`} name="subCategory" value={subCategory?.id} />
                          <label htmlFor={`subCategory/${subCategory?.id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
                            {subCategory?.name}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </ul>
              </div>
            </div>

            {/* tags */}
            <form className="border border-cyan-500 border-dashed py-1.5 rounded-b-sm m-[-1px] mt-0">
              <p className="text-lg text-center cursor-default" title="Etiquetas del producto que ayudarán a su búsqueda. Ej: amd, notebook, portatil, etc.">
                Etiquetas
              </p>
              <div className={style}>
                <label htmlFor="elementTag">Agregar</label>
                <div className="flex">
                  <input type="text" id="elementTag" placeholder="Ej: gpu, placa de video, escritorio, etc" className="rounded-l-sm rounded-r-none" defaultValue="" />
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
                          className="flex ml-0.5 items-center text-center justify-center w-4 h-4 border border-black rounded hover:bg-cyan-500 hover:shadow-inner lg:hover:shadow-neutral-800"
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

          {/* description */}
          <div className={style}>
            <label htmlFor="elementDesc">Descripción:</label>
            <input type="text" name="" id="elementDesc" className="rounded-sm w-[70%]" placeholder="Ej: Placa de video para gaming..." />
          </div>

          {/* image */}
          <div className={style}>
            <label htmlFor="elementImage">Imagen:</label>
            <div className="flex flex-col w-[70%] space-y-1">
              <input type="text" name="" id="elementImageURL" className="rounded-sm" placeholder="Ej: https://i.imgur.com/nsvoUWH.jpg" required onChange={checkImgURL} />
              <input type="file" accept=".png,.jpg,.jpeg" id="elementImageFile" className="w-full text-xs border border-black rounded-sm" name="" required onChange={checkImgFile} />
              <span className="text-xs">Subir archivo o link de imagen, no ambos.</span>
            </div>
          </div>

          {/* reputation */}
          <div className={style}>
            <label htmlFor="elementRep">Reputation:</label>
            <input type="number" name="" id="elementRep" className="rounded-sm w-[70%]" placeholder="Reputación" />
          </div>

          {/* brand */}
          <div className={style}>
            <label htmlFor="elementBrand">Marca:</label>
            <input type="text" name="" id="elementBrand" className="rounded-sm w-[70%]" required placeholder="Ej: MSI" />
          </div>

          {/* color */}
          <div className={style}>
            <label htmlFor="elementColor">Color:</label>
            <input type="text" name="" id="elementColor" className="rounded-sm w-[70%]" placeholder="Ej: Negro" />
          </div>

          <div className={`${style} flex-col`}>
            <button className="p-1 px-2 text-white duration-100 border border-black rounded-sm select-none bg-cyan-700 active:scale-90 active:duration-75 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
