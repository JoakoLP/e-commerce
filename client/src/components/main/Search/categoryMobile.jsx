import { Button, Dialog } from "@material-tailwind/react";
import CategoryFilter from "./categoryFilter";
import { XLg } from "react-bootstrap-icons";

const CategoryMobile = ({ categMobile, setCategMobile, searchCateg, setSearchCateg, searchSubCateg, setSearchSubCateg }) => {
  const handleOpen = () => {
    setCategMobile(!categMobile);
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <Button onClick={handleOpen} className="flex justify-center w-1/4 bg-cyan-900" size="sm" variant="filled">
          Categorías
        </Button>
      </div>
      <Dialog size="md" open={categMobile} handler={handleOpen}>
        <section className="relative p-2">
          <Button className="!absolute top-1 right-1 p-1" onClick={handleOpen} size="sm" variant="outlined">
            <XLg size={16} />
          </Button>
          <CategoryFilter searchCateg={searchCateg} setSearchCateg={setSearchCateg} searchSubCateg={searchSubCateg} setSearchSubCateg={setSearchSubCateg} />
        </section>
      </Dialog>
    </>
  );
};

export default CategoryMobile;
