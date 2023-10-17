import React from "react";
import categoryService from "../../../../../services/category";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryAddModal from "./categoryAddModal";
import CategoryEditModal from "./categoryEditModal";

const Categories = () => {
  const [CategoryList, setCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState();

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
        // console.log(user.email);
        return (
          <>
            <div className="flex flex-col items-center justify-between p-2 bg-white border rounded-md shadow-md">
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
              {/* <p>subCategories: {category?.subCategories?.length > 0 ? "tiene" : "no tiene"}</p> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditItem(category);
                  setEdit(!edit);
                  // setUser(user);
                  // setIsOpen(true);
                }}
                className="p-0.5 px-1.5 text-white duration-75 border rounded bg-cyan-700 active:duration-75 active:bg-cyan-900 active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:shadow-inner lg:hover:shadow-neutral-800 "
              >
                Info
              </button>
            </div>
          </>
        );
      });
    }
  };

  const [addModal, setAddModal] = useState(false);

  return (
    <div className="pb-6">
      <div className="grid gap-3 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {checkCategories()}
        {/* <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} /> */}
      </div>
      <button
        onClick={() => {
          setAddModal(!addModal);
        }}
        className="border w-min bg-cyan-700 text-white rounded p-1.5 px-2.5 justify-center flex whitespace-nowrap mx-auto lg:mx-8 active:duration-75 active:bg-cyan-900 active:shadow-inner active:shadow-neutral-800 lg:hover:bg-cyan-900 lg:hover:shadow-inner lg:hover:shadow-neutral-800"
      >
        Agregar Categoría
      </button>
      <CategoryAddModal addModal={addModal} setAddModal={setAddModal} />
      <CategoryEditModal edit={edit} setEdit={setEdit} editItem={editItem} setEditItem={setEditItem} />
    </div>
  );
};

export default Categories;
