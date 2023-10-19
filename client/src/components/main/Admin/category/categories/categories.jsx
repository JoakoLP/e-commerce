import React from "react";
import categoryService from "../../../../../services/category";
import { useState } from "react";
import { useEffect } from "react";
import CategoryAddModal from "./categoryAddModal";
import CategoryEditModal from "./categoryEditModal";
import { Button } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import CategoryDeleteModal from "./categoryDeleteModal";

const Categories = () => {
  const [CategoryList, setCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState();

  const [delModal, setDelModal] = useState(false);

  const loadCategories = async () => {
    await categoryService.categoryGet(setCategoryList);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  });

  const checkCategories = () => {
    if (isLoading) {
      return <p>Cargando...</p>;
    } else {
      return CategoryList.map((category) => {
        return (
          <>
            <div className="relative flex flex-col items-center justify-between p-2 bg-white border rounded-md shadow-md">
              <div>
                <p className="text-center">
                  <span className="font-medium">ID: </span>
                  {category.id}
                </p>
                <p className="text-center">
                  <span className="font-medium">Nombre: </span>
                  {category.name}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditItem(category);
                  setEdit(!edit);
                  // setUser(user);
                  // setIsOpen(true);
                }}
                title="Editar"
                className="absolute top-1 right-1 rounded bg-gray-200 bg-opacity-0 transition-all lg:hover:bg-opacity-75 duration-100 p-0.5 lg:hover:shadow-inner lg:hover:shadow-neutral-400"
              >
                <PencilIcon className="h-6 aspect-auto" />
              </button>
              <Button
                className="!mx-auto !h-full bg-red-900"
                title="Eliminar categoría"
                onClick={(e) => {
                  e.preventDefault();
                  setDelModal(!delModal);
                  setEditItem(category);
                }}
              >
                Eliminar SubCategoría
              </Button>
            </div>
          </>
        );
      });
    }
  };

  const [addModal, setAddModal] = useState(false);

  return (
    <div className="p-6">
      <Button
        className="!mx-auto flex bg-cyan-700"
        title="Agregar categoría"
        onClick={() => {
          setAddModal(!addModal);
        }}
      >
        Agregar Categoría
      </Button>
      <div className="grid gap-3 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {checkCategories()}
        {/* <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} /> */}
      </div>
      <CategoryAddModal addModal={addModal} setAddModal={setAddModal} />
      <CategoryEditModal edit={edit} setEdit={setEdit} editItem={editItem} setEditItem={setEditItem} />
      <CategoryDeleteModal delModal={delModal} setDelModal={setDelModal} category={editItem} />
    </div>
  );
};

export default Categories;
