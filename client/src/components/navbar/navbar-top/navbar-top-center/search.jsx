import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchOnEnter } from "./searchOnEnter";
import { Button } from "@material-tailwind/react";
import { BiSearchAlt2 } from "react-icons/bi";
import categoryService from "../../../../services/category";

const NavSearch = () => {
  const [searchField, setSearchField] = useState("");

  const [selectValue, setSelectValue] = useState("all");

  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const loadCategories = async () => {
    console.log(CategoryList);
    await categoryService.categoryGet(setCategoryList);
    setIsLoading(false);
  };

  // temp search data
  const handleChange = (e) => {
    setSearchField(e.target.value);
    // console.log(searchField);
  };

  // temp category data
  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    // console.log(selectValue);
  };

  // send the search & category data
  const handleClick = () => {
    const searchURL = `/search?srch=${searchField}&ctg=${selectValue}`;
    navigate(searchURL);
    const currentURL = location.pathname + location.search;
    if (searchURL && currentURL) {
      console.log(currentURL);
      // window.location.reload(false);

      // navigate(0);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  SearchOnEnter(searchField, handleClick);

  return (
    <div className="flex items-center min-w-[40vw] w-auto  relative rounded shadow-md focus-within:shadow-none">
      <div className="w-full h-10 bg-white border border-white rounded-l focus-within:border-custom-blue focus-within:border-r-0">
        <div className="h-full ">
          <div className="flex items-center h-full ">
            <select
              id="search"
              defaultValue="all"
              onChange={handleSelect}
              // onSelect={handleSelect}
              // class="group p-0.5 text-center font-medium focus:z-10 focus:outline-none bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg focus:ring-2 flex items-center justify-center w-12 h-10 text-black bg-blue-500 rounded-l-none rounded-r"
              // className="bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl h-full !border-transparent overflow-ellipsis rounded-l text-gray-900 text-sm min-w-[80px] max-w-[30%] dark:placeholder-gray-400 dark:text-white !ring-0"
              class="bg-gray-50 h-full !border-transparent overflow-ellipsis rounded-l text-gray-900 text-sm block w-[120px] max-w-[30%] dark:placeholder-gray-400 dark:text-white !ring-0"
            >
              <option value="all">Todos</option>
              {isLoading ? (
                <option disabled>Loading...</option>
              ) : (
                <>
                  {CategoryList.map((category) => {
                    return <option value={category.id}>{category.name}</option>;
                  })}
                </>
              )}
            </select>
            <div className="relative w-full h-full group/srch">
              <input
                type="search"
                className="w-full h-full px-3 pr-2 text-black border-0 placeholder:text-base placeholder:pr-2 focus:ring-transparent focus:shadow-none"
                placeholder="Buscar productos..."
                value={searchField}
                onChange={handleChange}
              />
              {/* <div className="absolute invisible w-full bg-white border-custom-blue border text-black opacity-50 min-h-[30px] group-focus-within/srch:visible"></div> */}
            </div>
          </div>
        </div>
      </div>
      <Button size="xs" className="flex items-center justify-center w-12 h-10 p-0 text-white bg-blue-600 rounded-l-none rounded-r" onClick={handleClick}>
        <BiSearchAlt2 size={25} />
      </Button>
    </div>
  );
};
export default NavSearch;
