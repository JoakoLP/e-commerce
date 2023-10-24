import React, { useEffect, useState } from "react";
import productService from "../../../../services/products";
import categoryService from "../../../../services/category";
import { XMarkIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

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
  const [preview, setPreview] = useState();
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
    const file = e.target.files[0];
    previewImage(file);
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

  const previewImage = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview();
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

    let subCategInputs = [];
    SubCategoryList.forEach((subcategory) => {
      subCategInputs.push(document.getElementById(`subCategory/${subcategory?.id}`));
    });
    // console.log({ subCategInputs });
    let subCategCheckeds = subCategInputs.filter((subCateg) => {
      return subCateg?.checked === true;
    });

    if (categCheckeds.length > 0 || subCategCheckeds.length > 0) {
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

  const checkboxChange = (e) => {
    const catCheckboxes = document.getElementsByName("category");
    const subCatCheckboxes = document.getElementsByName("subCategory");

    // if the checkbox onChange is a category
    if (e?.target?.name == "category") {
      // if it's checked
      if (e?.target?.checked) {
        // set all the checkbox except the selected to 'false'
        catCheckboxes.forEach((checkbox) => {
          if (checkbox?.value !== e?.target?.value) {
            checkbox.checked = false;
          }
        });
        // set all the subCategories checkbox outside the selected to 'false'
        SubCategoryList.forEach((subC) => {
          if (subC?.category?.id !== e?.target?.value) {
            const checkbox = document.getElementById(`subCategory/${subC?.id}`);
            if (checkbox !== null) {
              checkbox.checked = false;
            }
          }
        });
      } else {
        //if isn't selected set all subCategories to 'false'
        subCatCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }

      // if the checkbox onChange is a subcategory
    } else if (e?.target?.name == "subCategory") {
      // if it's checked
      if (e?.target?.checked) {
        // get subcategory checkbox
        const subCat = SubCategoryList.filter((subC) => {
          return subC?.id === e?.target?.value;
        });
        // if has a category
        if (subCat[0]?.category !== null) {
          const catCheckbox = document.getElementById(`category/${subCat[0]?.category?.id}`);
          // set category checkbox to 'true'
          catCheckbox.checked = true;
          // unchecks categories where the checked subcategory isn't
          catCheckboxes.forEach((checkbox) => {
            if (checkbox?.value !== catCheckbox?.value) {
              checkbox.checked = false;
            }
          });
          // unchecks subcategories from different category
          SubCategoryList.forEach((subC) => {
            if (subC?.category?.id !== subCat[0]?.category?.id) {
              const checkbox = document.getElementById(`subCategory/${subC?.id}`);
              if (checkbox !== null) {
                checkbox.checked = false;
                // checks if this subCategory was on search array
              }
            }
          });
        } else {
          // else if it doesn't have a category
          // set the non selected to 'false'
          subCatCheckboxes.forEach((checkbox) => {
            if (checkbox?.value !== e?.target?.value) {
              checkbox.checked = false;
            }
          });
          // sets all the categories to 'false'
          catCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
        }
      }
      checkCateg();
    }
  };

  const style = "flex justify-between items-center py-1.5 w-full max-w-full px-2";

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
            <div className="flex max-w-full overflow-auto md:justify-center">
              <div className={isLoading ? "hidden" : `visible w-max grid grid-flow-row grid-cols-2 shrink-0 gap-2 gap-x-0.5 justify-between py-1.5 px-2 items-start`}>
                {CategoryList.map((category) => {
                  return (
                    <div className="text-black w-min">
                      <div className="flex items-center justify-start space-x-1">
                        <input type="checkbox" id={`category/${category?.id}`} onChange={checkboxChange} required name="category" value={category?.id} />
                        <label htmlFor={`category/${category?.id}`} id={`category/${category?.id}/label`} className="w-min text-sm font-semibold pl-0.5">
                          {category?.name}
                        </label>
                      </div>

                      <ul className={category?.subCategories.length > 0 ? ` visible flex flex-col items-start pl-3 text-sm` : "hidden"}>
                        {category?.subCategories?.map((subCategory) => (
                          <li className="flex items-center justify-center space-x-1">
                            <input type="checkbox" id={`subCategory/${subCategory?.id}`} onChange={checkboxChange} name="subCategory" value={subCategory?.id} />
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
                            <input type="checkbox" id={`subCategory/${subCategory?.id}`} onChange={checkboxChange} name="subCategory" value={subCategory?.id} />
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
            </div>

            {/* tags */}
            <form className="outline-1 outline-cyan-500 w-full outline-dashed py-1.5 rounded-b-sm ">
              <p className="text-lg text-center cursor-default" title="Etiquetas del producto que ayudarán a su búsqueda. Ej: amd, notebook, portatil, etc.">
                Etiquetas
              </p>
              <div className={style}>
                <label htmlFor="elementTag">Agregar</label>
                <div className="flex ml-1 overflow-hidden border border-black rounded-sm max-w-fit ">
                  <input type="text" id="elementTag" placeholder="Ej: gpu, placa de video, escritorio, etc" className="w-full border-none" defaultValue="" />
                  <Button
                    className="px-3 py-2 rounded-none bg-cyan-700 !overflow-visible"
                    // className="px-3 py-2 border border-l-0 border-black rounded-l-none rounded-r-sm bg-cyan-600 hover:bg-cyan-600 hover:shadow-inner lg:hover:shadow-neutral-800 "
                    title="Agregar"
                    onClick={addTag}
                  >
                    <PlusSmallIcon className="w-6 h-6 text-white" />
                  </Button>
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
            <div className="flex flex-col max-w-[70%] w-[70%] space-y-1">
              <input type="text" name="" id="elementImageURL" className="rounded-sm" placeholder="Ej: https://i.imgur.com/nsvoUWH.jpg" required onKeyUp={checkImgURL} onChange={checkImgURL} />
              {preview && (
                <div className="flex flex-col items-center justify-center w-full py-1">
                  <div className="flex items-center justify-center h-48 overflow-hidden rounded-sm aspect-auto">
                    <img src={preview} alt="imageToUpload" className="object-contain h-full aspect-auto" />
                  </div>
                </div>
              )}
              <input type="file" accept=".png,.jpg,.jpeg" id="elementImageFile" className="hidden w-full text-xs border border-black rounded-sm" name="" required onChange={checkImgFile} />
              {preview ? (
                <p className={`text-xs truncate md:hidden block ${(image?.data?.size / 1024 / 1024).toFixed(2) > 10 ? "text-red-500 font-bold" : ""}`}>
                  Tamaño: {(image?.data?.size / 1024 / 1024).toFixed(2)} MB
                  {(image?.data?.size / 1024 / 1024).toFixed(2) > 10 ? " *" : ""}
                </p>
              ) : null}
              <label htmlFor="elementImageFile" className="flex items-center w-full space-x-3 border border-black rounded-sm">
                <p className="self-center p-2 px-4 text-sm font-semibold text-white bg-blue-900 cursor-pointer select-none">{preview ? "Cambiar imagen" : "Seleccionar imagen"}</p>
                {preview ? (
                  <div className="flex flex-col justify-center w-full max-w-full truncate">
                    <p className="text-xs truncate">{image?.data?.name}</p>
                    <p className={`text-xs truncate hidden md:block ${(image?.data?.size / 1024 / 1024).toFixed(2) > 10 ? "text-red-500 font-bold" : ""}`}>
                      Tamaño: {(image?.data?.size / 1024 / 1024).toFixed(2)} MB
                      {(image?.data?.size / 1024 / 1024).toFixed(2) > 10 ? " *" : ""}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs truncate">Ningún archivo seleccionado.</p>
                )}
              </label>
              <span className="text-xs whitespace-normal">
                Subir archivo o link de imagen, no ambos. Tamaño máximo: 10MB{preview && (image?.data?.size / 1024 / 1024).toFixed(2) > 10 ? <span className="font-bold text-red-500"> *</span> : ""}
              </span>
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
            <Button type="submit" className="bg-cyan-700" size="sm" title="Enviar edición" disabled={preview && (image?.data?.size / 1024 / 1024).toFixed(2) > 10}>
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
