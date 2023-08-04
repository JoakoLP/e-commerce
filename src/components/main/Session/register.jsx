import React, { useState } from "react";
import accountService from "../../../services/account";
import { Link } from "react-router-dom";

const Register = () => {
  const [image, setImage] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    console.log(image);
  };
  const handleRegister = (e) => {
    // const formData = new FormData();
    e.preventDefault();
    // console.log(image);
    let username = document.getElementById("userNameReg").value;
    let name = document.getElementById("nameReg").value;
    let email = document.getElementById("userEmailReg").value;
    let password = document.getElementById("userPassReg").value;
    let passwordCheck = document.getElementById("userPassRegCheck").value;
    let avatar = image;

    switch (true) {
      case !username:
        setErrorMsg("El nombre de usuario es obligatorio");
        break;
      case !name:
        setErrorMsg("El nombre es obligatorio");
        break;
      case !email:
        setErrorMsg("El email es obligatorio");
        break;
      case !password:
        setErrorMsg("La contraseña es obligatoria");
        break;
      case !passwordCheck:
        setErrorMsg("Repita la contraseña");
        break;
      case password !== passwordCheck:
        setErrorMsg("Las contraseñas deben coincidir");
        break;
      default:
        setErrorMsg();
        let userInfo = { username, name, email, password, avatar };
        console.log(userInfo);
        accountService.register({ ...userInfo });
        break;
    }
  };

  const divStyle = "flex flex-col items-between justify-center w-full";
  const inputStyle = "px-2 py-1 rounded-sm h-min";
  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <div className="flex flex-col items-center p-4 border rounded w-min">
        <p className="text-2xl font-bold">Registrarse</p>
        <form action="" id="register" onSubmit={handleRegister} encType="multipart/form-data" className="flex flex-col items-center pt-3 space-y-3">
          <div className="flex flex-col items-center space-y-1 w-min">
            <p className={errorMsg ? "visible text-xs text-red-600" : "hidden"}>{errorMsg}</p>
            <div className={divStyle}>
              <label htmlFor="userNameReg" className="text-xs font-bold">
                Usuario
              </label>
              <input type="text" name="" id="userNameReg" placeholder="" className={inputStyle} />
            </div>
            <div className={divStyle}>
              <label htmlFor="nameReg" className="text-xs font-bold">
                Nombre
              </label>
              <input type="text" name="" id="nameReg" placeholder="" className={inputStyle} />
            </div>
            <div className={divStyle}>
              <label htmlFor="userEmailReg" className="text-xs font-bold">
                Email
              </label>
              <input type="email" name="" id="userEmailReg" placeholder="" className={inputStyle} />
            </div>
            <div className={divStyle}>
              <label htmlFor="userPassReg" className="text-xs font-bold">
                Contraseña
              </label>
              <input type="password" name="" id="userPassReg" placeholder="" className={inputStyle} />
            </div>
            <div className={divStyle}>
              <label htmlFor="userPassRegCheck" className="text-xs font-bold">
                Repita la contraseña
              </label>
              <input type="password" name="" id="userPassRegCheck" placeholder="" className={inputStyle} />
            </div>
            <div className={divStyle}>
              <label htmlFor="userImgReg" className="text-xs font-bold">
                Imagen
              </label>
              <input type="file" name="" id="userImgReg" accept="image/png, image/jpeg" className="hidden" placeholder="" onChange={handleImage} />
              <label htmlFor="userImgReg" className="self-center p-1 text-sm text-white rounded cursor-pointer select-none bg-cyan-800">
                Seleccionar imagen
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="p-1 border border-black rounded ">Registrarse</button>
          </div>
        </form>
      </div>
      <p>
        <span>¿Ya tienes una cuenta? </span>
        <Link to={"/session/login"} className="text-blue-600 hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
};

export default Register;
