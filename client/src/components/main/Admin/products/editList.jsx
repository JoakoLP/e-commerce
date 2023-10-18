import React from "react";
import AdminProduct from "./adminProduct";
import { useEffect } from "react";
import { useState } from "react";
import EditModal from "./editModal";
import { useNavigate } from "react-router-dom";
import productsService from "../../../../services/products";
import CategoryMobile from "../../Search/categoryMobile";
import CategoryFilter from "../../Search/categoryFilter";
import { Button } from "@material-tailwind/react";
import { BiSearchAlt2 } from "react-icons/bi";

const EditList = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState();
  const [searchField, setSearchField] = useState(params.get("srch") || "");
  const [searchCateg, setSearchCateg] = useState(params.get("ctg") || "all");
  let subc;
  if (params.get("sctg")) {
    subc = params.get("sctg").split(",");
  }

  const [categMobile, setCategMobile] = useState(false);

  const [searchSubCateg, setSearchSubCateg] = useState(subc || []);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = async (ctg, sctg) => {
    await productsService.productSearch(searchField, ctg, sctg, setProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const sctg = searchSubCateg.toString();
    navigate(`?srch=${searchField}&ctg=${searchCateg}&sctg=${sctg}`);
    search(searchCateg, sctg);
  }, [searchCateg, searchSubCateg, searchField]);

  const checkArray = () => {
    if (isLoading) {
      return <p className="flex items-center justify-center h-[30vh]">Cargando...</p>;
    } else if (products?.length < 1) {
      return (
        <div className="flex justify-center py-4">
          <p className="text-center text-black">
            <span>No se encontraron coincidencias </span>
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

  return (
    <div className="px-4 py-3">
      <div className="flex flex-col items-center justify-start w-full space-x-2 md:flex-row md:px-4 md:w-auto ">
        <label htmlFor="editSearch" className="font-semibold">
          Buscar en listado:
        </label>
        <form
          className="inline-flex w-full md:w-auto"
          onSubmit={(e) => {
            e?.preventDefault();
            const editSearch = document.getElementById("editSearch").value;
            setSearchField(editSearch);
          }}
        >
          <div className="flex w-full h-10 py-0 bg-white border border-r-0 rounded-l md:w-60 border-cyan-700">
            <input
              id="editSearch"
              type="search"
              className="w-full pl-2 pr-1 bg-transparent border-0 placeholder:pr-2 focus:ring-transparent focus:shadow-none peer/search focus-visible:outline-none"
              placeholder="Buscar productos..."
            />
          </div>
          <Button className="flex items-center justify-center h-10 p-0 text-white bg-blue-600 rounded-l-none rounded-r w-11" size="xs" type="submit">
            <BiSearchAlt2 size={20} className="align-middle" />
          </Button>
        </form>
      </div>

      <div className="flex flex-col pt-6">
        {window.innerWidth > 728 ? null : (
          <CategoryMobile
            categMobile={categMobile}
            setCategMobile={setCategMobile}
            searchCateg={searchCateg}
            setSearchCateg={setSearchCateg}
            searchSubCateg={searchSubCateg}
            setSearchSubCateg={setSearchSubCateg}
          />
        )}
        <div className="flex">
          {window.innerWidth > 728 ? <CategoryFilter searchCateg={searchCateg} setSearchCateg={setSearchCateg} searchSubCateg={searchSubCateg} setSearchSubCateg={setSearchSubCateg} /> : null}
          <div className="flex flex-col items-start w-full">
            <h1 className="pt-2 ml-2 text-xl font-bold border-b-2 border-blue-700 text-centera whitespace-nowrap w-min">
              {products.length > 0 ? products.length : "Sin"} resultado{products.length != 1 ? "s" : null} de búsqueda
            </h1>
            <div className="px-1 py-4 m-auto w-fit sm:px-4">{checkArray()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditList;
