import React, { useState } from "react";
import categoryService from "../../../services/category";
import { useEffect } from "react";

const CategoryFilter = ({ setSearchCateg }) => {
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    // categoryService.categoryGet(setCategoryList).then(() => {
    //   if (Array.isArray(CategoryList) && CategoryList?.length > 0) {
    //     console.log(CategoryList);
    //     categoryService.subCategoryGet(setSubCategoryList).then(() => {
    //       if (Array.isArray(SubCategoryList && SubCategoryList?.length > 0)) {
    //         setIsLoading(false);
    //       }
    //     });
    //   }
    // });

    await categoryService.subCategoryGet(setSubCategoryList);
    console.log(CategoryList);
    await categoryService.categoryGet(setCategoryList);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const styleBtn =
    "m-1 mx-1.5 p-1.5 px-3 text-neutral-200 bg-purple-700 active:scale-90 active:duration-75 rounded duration-300 active:bg-purple-900 hover:text-white active:shadow-inner active:shadow-neutral-800 active:scale-105 lg:hover:bg-purple-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800 active:scale-95";
  return (
    <div>
      {/* Filter Row */}
      <div className="flex flex-col justify-between pt-4 lg:flex-row">
        {/* Fliter Type */}
        <div>
          <p className="font-bold">Filtro por Categoria</p>
          <p className={isLoading ? "visible" : "hidden"}>Cargando...</p>
          <div className={isLoading ? "hidden" : "visible"}>
            {/* <select name="" id=""></select>
            <ul>
              <li>
                <select name="" id=""></select>
              </li>
            </ul> */}
            {CategoryList.map((category) => {
              return (
                <div className="text-black">
                  <div className="flex items-center space-x-1 justify-start">
                    <input type="checkbox" name={category?.name} value={category?.id} id={category?.id} />
                    <label htmlFor={category?.id} className="font-semibold">
                      {category?.name}
                    </label>
                  </div>
                  {category?.subCategories.length > 0 ? (
                    <ul className="flex flex-col items-start pl-3 text-sm">
                      {category?.subCategories?.map((subCategory) => (
                        <li className="flex items-center space-x-1 justify-center">
                          <input type="checkbox" name={subCategory?.name} value={subCategory?.id} id={subCategory?.id} />
                          <label htmlFor={subCategory?.id}>{subCategory?.name}</label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    {}
                  )}
                </div>
              );

              // return (
              //   <div className="p-3">
              //     <button
              //       name={category?.name}
              //       id={category?.id}
              //       className="px-2 py-1 text-base rounded bg-cyan-300"
              //       onClick={() => {
              //         const list = document.getElementById(`category/${category?.id}/list`);
              //         if (list?.className == "pl-2") {
              //           // list.hidden = false;
              //           // list.style.display = ""
              //           console.log(list);
              //           // list.style.visibility = "visible";
              //           list.className = "hidden pl-2";
              //         } else if (list.className == "hidden pl-2") {
              //           list.className = "pl-2";
              //         }
              //       }}
              //     >
              //       {category?.name}
              //     </button>

              //     {category?.subCategories.length > 0 ? (
              //       <ul id={`category/${category?.id}/list`} className="hidden pl-2" aria-labelledby="dropdownDefaultButton">
              //         {category?.subCategories?.map((subCategory) => (
              //           <li>
              //             <button name={subCategory?.name} id={subCategory?.id} className="text-sm">
              //               {subCategory?.name}
              //             </button>
              //           </li>
              //         ))}
              //       </ul>
              //     ) : (
              //       {}
              //     )}
              //   </div>
              // );
            })}
          </div>

          {/* <div className="flex pt-2categBtns flex-nowrap justfiy-between h-min whitespace-nowrap">
            <button onClick={() => setSearchCateg("all")} className={styleBtn + " font-medium "}>
              Todo
            </button>
            <button onClick={() => setSearchCateg("CPU")} className={styleBtn}>
              Microprocesador
            </button>
            <button onClick={() => setSearchCateg("RAM")} className={styleBtn}>
              RAM
            </button>
            <button onClick={() => setSearchCateg("SSD")} className={styleBtn}>
              Disco Sólido
            </button>
            <button onClick={() => setSearchCateg("HDD")} className={styleBtn}>
              Disco Duro
            </button>
            <button onClick={() => setSearchCateg("Motherboards")} className={styleBtn}>
              Motherboard
            </button>
            <button onClick={() => setSearchCateg("GPU")} className={styleBtn}>
              Grafica
            </button>
            <button onClick={() => setSearchCateg("Notebooks")} className={styleBtn}>
              Notebook
            </button>
            <button onClick={() => setSearchCateg("Desktop")} className={styleBtn}>
              PC de Escritorio
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
