import React, { useEffect, useState } from "react";
import Product from "../Products/Product";
import CategoryFilter from "./categoryFilter";
import productsService from "../../../services/products";
import { useNavigate } from "react-router-dom";

const SearchSect = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  // console.log(params.get("srch"));
  // console.log(params.get("ctg"));
  const searchField = params.get("srch");
  const [searchCateg, setSearchCateg] = useState(params.get("ctg") || "all");
  const [searchSubCateg, setSearchSubCateg] = useState([]);

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const search = async (ctg, sctg) => {
    await productsService.productSearch(searchField, ctg, sctg, setProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const sctg = searchSubCateg.toString();
    navigate(`/search?srch=${searchField}&ctg=${searchCateg}&sctg=${sctg}`);
    search(searchCateg, sctg);
  }, [searchCateg, searchSubCateg]);

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
        <div className="grid gap-4 min-w-fit sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products?.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col pt-6">
      <div className="flex">
        {CategoryFilter({ setSearchCateg, searchSubCateg, setSearchSubCateg })}
        <div className="flex flex-col items-start w-full">
          <h1 className="pt-2 ml-2 text-xl font-bold border-b-2 border-purple-700 text-centera whitespace-nowrap w-min">Resultado de búsqueda</h1>
          <div className="amax-w-[1640px] w-fit m-auto px-1 sm:px-4 py-4">{checkArray()}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchSect;
