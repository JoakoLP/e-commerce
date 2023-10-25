import React, { useState } from "react";
import categoryService from "../../../services/category";
import { useEffect } from "react";

const CategoryFilter = ({ searchCateg, setSearchCateg, searchSubCateg, setSearchSubCateg }) => {
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategRest, setSubCategRest] = useState([]);

  const loadCategories = async () => {
    await categoryService.categoryGet(setCategoryList);
    await categoryService.subCategoryGet(setSubCategoryList);
    // checkSearchArrays();
    // console.log(CategoryList);
    setIsLoading(false);
  };

  const checkboxChange = (e) => {
    const catCheckboxes = document.getElementsByName("category");
    const subCatCheckboxes = document.getElementsByName("subCategory");

    // if the checkbox onChange is a category
    if (e?.target?.name == "category") {
      // if it's checked
      if (e?.target?.checked) {
        setSearchCateg(e?.target?.value);
        setSearchSubCateg([]);
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
          setSearchCateg("all");
          setSearchSubCateg([]);
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
          setSearchCateg(catCheckbox?.value);
          setSearchSubCateg([...searchSubCateg, e?.target?.value]);
          // set category checkbox to 'true'
          catCheckbox.checked = true;
          // unchecks categories where the checked subcategory isn't
          catCheckboxes.forEach((checkbox) => {
            if (checkbox?.value !== catCheckbox?.value) {
              checkbox.checked = false;
            }
          });
          // unchecks subcategories from different category
          let newSubCArray = [...searchSubCateg, e?.target?.value];
          SubCategoryList.forEach((subC) => {
            if (subC?.category?.id !== subCat[0]?.category?.id) {
              const checkbox = document.getElementById(`subCategory/${subC?.id}`);
              if (checkbox !== null) {
                checkbox.checked = false;
                // checks if this subCategory was on search array
                const match = searchSubCateg.filter((subCateg) => {
                  return subCateg === checkbox.value;
                });
                if (match.length > 0) {
                  // if it was on the array, create a new array without it
                  newSubCArray = newSubCArray.filter((subCateg) => {
                    return subCateg !== checkbox.value;
                  });
                }
              }
            }
          });
          if (newSubCArray.length > 0) {
            setSearchSubCateg(newSubCArray);
          }
        } else {
          // else if it doesn't have a category
          setSearchSubCateg([e?.target?.value]);
          // set the non selected to 'false'
          subCatCheckboxes.forEach((checkbox) => {
            if (checkbox?.value !== e?.target?.value) {
              checkbox.checked = false;
            }
          });
          setSearchCateg("all");
          // sets all the categories to 'false'
          catCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
        }
      } else {
        // else if isn't selected
        const match = searchSubCateg.filter((subC) => {
          return subC === e?.target?.value;
        });
        if (match) {
          // create a new array only with it
          const newSubCArray = searchSubCateg.filter((subC) => {
            return subC !== e?.target?.value;
          });
          setSearchSubCateg(newSubCArray);
        }
      }
    }
  };

  const checkSearchArrays = () => {
    const categCheck = document.getElementById(`category/${searchCateg}`);
    if (categCheck) {
      // sets to 'true' to the url categ
      categCheck.checked = true;
    }

    let newSubCArray = searchSubCateg;
    searchSubCateg.forEach((subCat) => {
      const subCategoryItem = SubCategoryList.filter((subc) => {
        return subc?.id == subCat;
      });

      if (SubCategoryList.length > 0) {
        // if subCategory has a category different than url's
        if (subCategoryItem[0]?.category?.id !== searchCateg) {
          newSubCArray = newSubCArray.filter((subCateg) => {
            return subCateg !== subCat;
          });
        }
      }
    });
    newSubCArray.forEach((subCat) => {
      const subCategCheck = document.getElementById(`subCategory/${subCat}`);
      if (subCategCheck) {
        subCategCheck.checked = true;
      }
    });
    // if the newSubCArray is different than searchSubCateg
    if (newSubCArray !== searchSubCateg) {
      setSearchSubCateg(newSubCArray);
    }
  };

  const filterSubCategRest = () => {
    const check = SubCategoryList.filter((subCategory) => {
      return subCategory?.category === null;
    });
    setSubCategRest(check);
    // console.log(subCategRest);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterSubCategRest();
    checkSearchArrays();
  }, [SubCategoryList]);

  const styleBtn =
    "m-1 mx-1.5 p-1.5 px-3 text-neutral-200 bg-purple-700 active:scale-90 active:duration-75 rounded duration-300 active:bg-purple-900 hover:text-white active:shadow-inner active:shadow-neutral-800 active:scale-105 lg:hover:bg-purple-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800 active:scale-95";
  return (
    // {/* Filter Row */}
    <div className="flex flex-col justify-between pl-2 min-w-fit lg:flex-row">
      {/* Fliter Type */}
      <div className="">
        <p className="text-lg font-bold md:text-black text-cyan-700 md:text-base">Filtro por Categoria</p>
        <div className="m-2 md:m-0 max-h-[75vh] md:max-h-full overflow-auto">
          <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
          <div className={isLoading ? "hidden" : "visible grid grid-flow-row-dense grid-cols-1 shrink-0 gap-3 justify-between py-1.5 px-2 items-start"}>
            {CategoryList.map((category) => {
              return (
                <div className="text-black w-max">
                  <div className="flex items-center justify-start space-x-1 w-max">
                    <input type="checkbox" name={"category"} value={category?.id} id={`category/${category?.id}`} onChange={checkboxChange} />
                    <label htmlFor={`category/${category?.id}`} id={`category/${category?.id}/label`} className="font-semibold whitespace-nowrap min-w-max w-max">
                      {category?.name}
                    </label>
                  </div>
                  {category?.subCategories.length > 0 ? (
                    <ul className="flex flex-col items-start pl-3 text-sm">
                      {category?.subCategories?.map((subCategory) => (
                        <li className="flex items-center justify-center space-x-1">
                          <input type="checkbox" name={"subCategory"} value={subCategory?.id} id={`subCategory/${subCategory?.id}`} onChange={checkboxChange} />
                          <label htmlFor={`subCategory/${subCategory?.id}`} id={`subCategory/${subCategory?.id}/label`} className="whitespace-nowrap">
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
            <div className={subCategRest.length > 0 ? "visible text-black w-fit" : "hidden"}>
              <ul className="list-disc list-inside">
                <li className="font-semibold whitespace-nowrap">
                  <span className="ml-[-10px] whitespace-nowrap">Otras subcategorías</span>
                </li>
                <ul className="flex flex-col items-start pl-3 text-sm">
                  {subCategRest?.map((subCategory) => {
                    // console.log(subCategory);
                    return (
                      <li className="flex items-center justify-center space-x-1">
                        <input type="checkbox" id={`subCategory/${subCategory?.id}`} name="subCategory" value={subCategory?.id} onChange={checkboxChange} />
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
      </div>
    </div>
  );
};

export default CategoryFilter;
