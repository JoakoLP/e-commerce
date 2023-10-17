import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchOnEnter } from "./searchOnEnter";

const MobileSearch = () => {
  const [searchField, setSearchField] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // temp search data
  const handleChange = (e) => {
    setSearchField(e.target.value);
    // console.log(searchField);
  };

  const handleClick = () => {
    const searchURL = `/search?srch=${searchField}&ctg=all`;
    navigate(searchURL);
    const currentURL = location.pathname + location.search;
    if (searchURL && currentURL) {
      console.log(currentURL);
      window.location.reload(false);

      // navigate(0);
    }
  };

  SearchOnEnter(searchField, handleClick);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-center w-full h-full max-h-full overflow-hidden rounded ">
        <input
          type="search"
          className="h-10 px-3 pr-2 text-black border-0 w-max placeholder:text-base placeholder:pr-2 focus:ring-transparent focus:shadow-none"
          placeholder="Buscar productos..."
          value={searchField}
          onChange={handleChange}
        />
        <Button size="xs" className="flex items-center justify-center w-12 h-10 p-0 text-white bg-blue-600 rounded-l-none rounded-r" onClick={handleClick}>
          <BiSearchAlt2 size={25} />
        </Button>
        {/* <div className="absolute invisible w-full bg-white border-custom-blue border text-black opacity-50 min-h-[30px] group-focus-within/srch:visible"></div> */}
      </div>
    </div>
  );
};

export default MobileSearch;
