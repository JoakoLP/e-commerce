import React, { useEffect, useState } from "react";
import Product from "./Products/Product";
import productsService from "../../services/products";
import { useNavigate } from "react-router-dom";

const SearchSect = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  // console.log(params.get("srch"));
  // console.log(params.get("ctg"));
  const searchField = params.get("srch");
  const [searchCateg, setSearchCateg] = useState(params.get("ctg") || "all");

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const search = async (ctg) => {
    await productsService.productSearch(searchField, ctg, setProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    navigate(`/search?srch=${searchField}&ctg=${searchCateg}`);
    search(searchCateg);
  }, [searchCateg]);

  const checkArray = () => {
    if (isLoading) {
      return <p className="flex items-center justify-center h-[30vh]">Cargando...</p>;
    } else if (products?.length < 1) {
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
          {products?.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      );
    }
  };

  const styleBtn =
    "m-1 mx-1.5 p-1.5 px-3 text-neutral-200 bg-purple-700 active:scale-90 active:duration-75 rounded duration-300 active:bg-purple-900 hover:text-white active:shadow-inner active:shadow-neutral-800 active:scale-105 lg:hover:bg-purple-900 lg:hover:text-white lg:hover:shadow-inner lg:hover:shadow-neutral-800 active:scale-95";

  return (
    <div className="max-w-[1640px] m-auto px-1 sm:px-4 py-10">
      <h1 className="m-auto text-2xl font-bold text-center border-b-2 border-purple-700 whitespace-nowrap w-min text-neutral-200">Resultado de búsqueda</h1>
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
  );
};

export default SearchSect;
