import React from "react";
import categoryService from "../../../../../services/category";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SubCategoryAddModal from "./subCategoryAddModal";
import SubCategoryDeleteModal from "./subCategoryDeleteModal";
import SubCategoryEditModal from "./subCategoryEditModal";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

const SubCategories = () => {
  const [SubCategoryList, setSubCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadSubCategories = async () => {
    await categoryService.subCategoryGet(setSubCategoryList);
    setIsLoading(false);
  };

  const [addModal, setAddModal] = useState(false);

  const [subCateg, setSubCateg] = useState();
  const [delModal, setDelModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    loadSubCategories();
  }, []);

  const checkCategories = () => {
    if (isLoading) {
      return <p>Cargando...</p>;
    } else {
      return SubCategoryList.map((subCategory) => {
        // console.log(user.email);
        return (
          <div className="relative w-full h-full">
            <div className="relative flex flex-col items-center justify-between w-full h-full p-2 bg-white border rounded shadow-md justify-self-center">
              <div className="flex flex-col items-center h-full grow justify-evenly">
                <p>
                  <span className="font-medium">ID: </span>
                  {subCategory.id}
                </p>
                <p>
                  <span className="font-medium">Nombre: </span>
                  {subCategory.name}
                </p>
              </div>
              <Button
                className="!mx-auto !h-full bg-red-900"
                // size="sm"
                title="Eliminar categoría"
                onClick={(e) => {
                  e.preventDefault();
                  setDelModal(!delModal);
                  setSubCateg(subCategory);
                  // setUser(user);
                  // setIsOpen(true);
                }}
                // className="p-0.5 px-1.5 text-white duration-75 border rounded bg-cyan-700 active:duration-75 active:bg-cyan-900 active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:shadow-inner lg:hover:shadow-neutral-800  "
              >
                Eliminar SubCategoría
              </Button>
              <button
                onClick={(e) => {
                  setEditModal(!editModal);
                  setSubCateg(subCategory);
                }}
                title="Editar"
                className="absolute top-1 right-1 rounded bg-gray-200 bg-opacity-0 transition-all lg:hover:bg-opacity-75 duration-100 p-0.5 lg:hover:shadow-inner lg:hover:shadow-neutral-400"
              >
                <PencilIcon className="h-6 aspect-auto" />
              </button>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="p-6">
      <Button
        className="!mx-auto flex bg-cyan-700"
        title="Agregar categoría"
        onClick={() => {
          setAddModal(!addModal);
        }}
      >
        Agregar SubCategoría
      </Button>
      <div className="grid justify-center gap-3 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {checkCategories()}
        {/* <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} /> */}
      </div>
      <SubCategoryDeleteModal delModal={delModal} setDelModal={setDelModal} subCategory={subCateg} setSubCateg={setSubCateg} />
      <SubCategoryAddModal addModal={addModal} setAddModal={setAddModal} />
      <SubCategoryEditModal editModal={editModal} setEditModal={setEditModal} subCategory={subCateg} setSubCateg={setSubCateg} />
    </div>
  );
};

export default SubCategories;
