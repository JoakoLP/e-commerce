import React from "react";

const PopularCards = () => {
  const a = [
    {
      href: "/search?srch=offer&ctg=all",
      src: "https://cdn-icons-png.flaticon.com/512/2956/2956869.png",
      title: "Ofertas",
    },
    {
      href: "/search?srch=&ctg=computers",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLhV7CIqiSfFxTjaCwPVJgTq7MuD5qRMveQ&usqp=CAU",
      title: "Computación",
    },
    {
      href: "/search?srch=&ctg=smartphones",
      src: "https://media.gq.com.mx/photos/61e466e9e8bd436cce2df9d6/master/pass/4_to_3_Teaser_Camera_Compare_Flagship_Smartphones_2021.jpg",
      title: "Celulares",
    },
    {
      href: "/search?srch=&ctg=videogames",
      src: "https://hips.hearstapps.com/hmg-prod/images/gh-index-gamingconsoles-052-print-preview-1659705142.jpg?crop=1.00xw:0.753xh;0,0.0831xh&resize=1200:*",
      title: "Videojuegos",
    },
    {
      href: "/search?srch=&ctg=PersonalCare",
      src: "https://dev.rodpub.com/images/148/515_main.jpg",
      title: "Salud y Cuidado Personal",
    },
    {
      href: "/search?srch=&ctg=home",
      src: "https://ae01.alicdn.com/kf/HTB1n3pIaQY2gK0jSZFgq6A5OFXaZ/Maceta-de-cer-mica-blanca-con-Base-de-madera-para-el-hogar-maceta-creativa-de-Cactus.jpg",
      title: "Hogar y Jardín",
    },
  ];
  return (
    <div className="flex flex-col w-[85%] m-auto ">
      <p className="self-start py-4 text-xl font-bold">Podría interesarte...</p>
      <ul className="flex justify-center text-center">
        {a.map((item) => (
          <li className="group/pop">
            <a href={item.href}>
              <div className="flex items-center justify-center w-40 h-40 mx-5 my-1 overflow-hidden border border-transparent rounded-full group-hover/pop:border-gray-500">
                <div className="flex h-40 bg-white shrink-0">
                  <img src={item.src} alt="" className="object-scale-down" />
                </div>
              </div>
              <p className="group-hover/pop:underline">{item.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCards;
