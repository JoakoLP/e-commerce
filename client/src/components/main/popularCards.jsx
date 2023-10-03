import React from "react";

const PopularCards = () => {
  const a = [
    {
      href: "/search?srch=offer&ctg=all",
      src: "https://cdn-icons-png.flaticon.com/512/2956/2956869.png",
      title: "Ofertas",
    },
    {
      href: "/search?srch=&ctg=PC&sctg=",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLhV7CIqiSfFxTjaCwPVJgTq7MuD5qRMveQ&usqp=CAU",
      title: "Computación",
    },
    {
      href: "/search?srch=&ctg=CELLPHONE&sctg=",
      src: "https://media.gq.com.mx/photos/61e466e9e8bd436cce2df9d6/master/pass/4_to_3_Teaser_Camera_Compare_Flagship_Smartphones_2021.jpg",
      title: "Celulares",
    },
    {
      href: "/search?srch=&ctg=GAME&sctg=",
      src: "https://hips.hearstapps.com/hmg-prod/images/gh-index-gamingconsoles-052-print-preview-1659705142.jpg?crop=1.00xw:0.753xh;0,0.0831xh&resize=1200:*",
      title: "Videojuegos",
    },
    {
      href: "/search?srch=&ctg=HEALTH&sctg=",
      src: "https://dev.rodpub.com/images/148/515_main.jpg",
      title: "Salud y Cuidado Personal",
    },
    {
      href: "/search?srch=&ctg=HOME&sctg=",
      src: "https://ae01.alicdn.com/kf/HTB1n3pIaQY2gK0jSZFgq6A5OFXaZ/Maceta-de-cer-mica-blanca-con-Base-de-madera-para-el-hogar-maceta-creativa-de-Cactus.jpg",
      title: "Hogar y Jardín",
    },
  ];
  return (
    <div className="flex flex-col w-full pb-4 m-auto">
      <p className="self-start w-full pt-4 pb-2 pl-10 text-xl font-bold">Podría interesarte...</p>
      <ul className="grid justify-center gap-3 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {a.map((item) => (
          <li className="flex items-center justify-center">
            <a href={item.href}>
              <div className="flex flex-col items-start justify-center px-4 py-3 overflow-hidden bg-white border border-transparent shadow-lg w-44 shrink sm:w-60 md:w-52 2xl:w-60 h-70 shadow-slate-400 ">
                <p className="max-w-[110%] py-2 text-lg font-semibold truncate text-start whitespace-nowrap ">{item.title}</p>
                <div className="flex h-max aspect-square shrink-0">
                  <img src={item.src} alt="" className="object-cover aspect-auto" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCards;
