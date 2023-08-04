import React from "react";

const SubCategoryLoader = ({ isLoading, SubCategoryList, CategoryList, editItem }) => {
  // return(
  //   SubCategoryList?.map((subCategory) => {
  //     return (
  //     <div className={isLoading ? "hidden" : "visible flex items-center pr-2 min-w-min"}>
  //       <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name="subCategory" value={subCategory?.id} />
  //       <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
  //         {subCategory?.name}
  //       </label>
  //     </div>
  //   );
  // });
  // CategoryList?.map((category) => {
  //   if (category.subCategories.length > 0) {
  //     return (
  //       <ul>
  //         <p>{category?.name}</p>
  //         {category?.subCategories.map((subCategory) => {
  //           return (
  //             <li>
  //               <div className={isLoading ? "hidden" : "visible flex items-center pr-2 min-w-min"}>
  //                 <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name="subCategory" value={subCategory?.id} />
  //                 <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
  //                   {subCategory?.name}
  //                 </label>
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     );
  //   }
  // });
  // SubCategoryList?.forEach((subCategory) => {
  //   let subCategInput = document.getElementById(`subCategory/${subCategory?.id}/${editItem?.prod_id}`);
  //   if (!subCategInput) {
  //     return (
  //       <div className={isLoading ? "hidden" : "visible flex items-center pr-2 min-w-min"}>
  //         <input type="checkbox" id={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} name="subCategory" value={subCategory?.id} />
  //         <label htmlFor={`subCategory/${subCategory?.id}/${editItem?.prod_id}`} id={`subCategory/${subCategory?.id}/label`} className="w-min text-sm pl-0.5">
  //           {subCategory?.name}
  //         </label>
  //       </div>
  //     );
  //     )
  //   }
  // });
};

export default SubCategoryLoader;
