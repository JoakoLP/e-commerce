import React from "react";
import { useContext } from "react";
import AdminProduct from "./adminProduct";
import { useEffect } from "react";
import { useState } from "react";
import EditModal from "./editModal";
import { Link, useNavigate } from "react-router-dom";
import productsService from "../../../../services/products";
import { Search, XLg } from "react-bootstrap-icons";
import { AccountContext } from "../../../../contexts/AccountProvider";
import categoryService from "../../../../services/category";

const EditList = () => {
  const [user, setUser] = useContext(AccountContext);

  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState();
  const [searchField, setSearchField] = useState(params.get("srch") || "");
  const [searchCateg, setSearchCateg] = useState(params.get("ctg") || "all");
  const [searchSubCateg, setSearchSubCateg] = useState(params.get("sctg") || []);

  const [products, setProducts] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = async (ctg, sctg) => {
    // const editSearch = document.getElementById("editSearch").value;
    // if (editSearch.length > 0) {
    //   setSearchField(editSearch);
    // }
    await productsService.productSearch(searchField, ctg, sctg, setProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const sctg = searchSubCateg.toString();
    navigate(`?srch=${searchField}&ctg=${searchCateg}&sctg=${sctg}`);
    search(searchCateg, sctg);
  }, [searchCateg, searchField]);

  const checkArray = () => {
    if (isLoading) {
      return <p className="flex items-center justify-center h-[30vh]">Cargando...</p>;
    } else if (products.length < 1) {
      return (
        <div className="flex justify-center py-4">
          <p className="text-center text-black">
            No se encontraron coincidencias{" "}
            {searchField ? (
              <span>
                con <i className="font-bold ">{searchField}</i>
              </span>
            ) : (
              ""
            )}
            {searchCateg != "all" ? (
              <span>
                {" "}
                en <i>{searchCateg.toString()}</i>
              </span>
            ) : null}
            .
          </p>
        </div>
      );
    } else {
      return (
        /* display productos */
        <div className="grid gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.map((product) => (
            <>
              <AdminProduct key={product.id} data={product} edit={edit} setEdit={setEdit} setEditItem={setEditItem} />
            </>
          ))}
          <EditModal edit={edit} setEdit={setEdit} editItem={editItem} setEditItem={setEditItem} />
        </div>
      );
    }
  };

  const searchClear = () => {
    let search = document.getElementById("editSearch")?.value.length;
    // console.log(search);
    if (search === 0) {
      return "invisible";
    } else {
      return "peera-focus/search:visible";
    }
  };

  const styleBtn =
    "m-1 mx-1.5 p-1.5 px-3 text-neutral-200 bg-cyan-700 active:scale-90 active:duration-75 rounded duration-300 active:bg-cyan-900 hover:text-white active:shadow-inner active:shadow-neutral-800 active:scale-105 lg:hover:bg-cyan-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800 active:scale-95";

  return (
    <div className="px-4 py-3">
      <div className="space-x-2 ">
        <label htmlFor="editSearch">Buscar productos:</label>
        <form
          className="inline-flex"
          onSubmit={(e) => {
            e?.preventDefault();
            const editSearch = document.getElementById("editSearch").value;
            setSearchField(editSearch);
            search(searchCateg);
          }}
        >
          <div className="flex px-1 py-0 border border-r-0 rounded-l h-min w-60 border-cyan-500 focus-within:bg-cyan-200 ">
            <input id="editSearch" className="w-full bg-transparent peer/search focus-visible:outline-none" />
            <button type="reset" className={searchClear()}>
              <XLg size={16} className="hover:text-cyan-700" />
            </button>
          </div>
          <button className="flex items-center justify-center w-6 border rounded-r border-cyan-500 aspect-auto hover:bg-cyan-300">
            <Search size={16} className="align-middle" />
          </button>
        </form>
      </div>

      <div></div>

      <div className="max-w-[1640px] m-auto px-1 sm:px-4 py-10">
        <h1 className="m-auto text-2xl font-bold text-center border-b-2 border-cyan-700 whitespace-nowrap w-min text-neutral-200">Resultado de búsqueda</h1>
        {/* Filter Row */}
        <div className="flex flex-col justify-between pt-4 lg:flex-row">
          {/* Fliter Type */}
          <div>
            <p className="font-bold text-white">Filtro por Categoria</p>

            <div className="flex pt-2categBtns flex-nowrap justfiy-between h-min whitespace-nowrap">
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
            </div>
          </div>
        </div>
        {checkArray()}
      </div>
    </div>
  );
};

export default EditList;
