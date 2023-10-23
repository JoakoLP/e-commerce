import React, { useState } from "react";
import accountService from "../../../services/account";
import { Link } from "react-router-dom";
import PasswordSwitch from "./passwordSwitch";

const Register = () => {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    console.log(image);
    const file = e.target.files[0];
    previewImage(file);
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview();
    }
  };

  const handleRegister = (e) => {
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

  const [inputPass, setInputPass] = useState(false);
  const [inputPassCheck, setInputPassCheck] = useState(false);

  let passReg = document.getElementById("userPassReg");
  let passRegCheck = document.getElementById("userPassRegCheck");
  const handlePassword = (e) => {
    if (e?.target?.value?.length > 0) {
      e?.target?.id == "userPassReg" ? setInputPass(true) : setInputPassCheck(true);
    } else {
      e?.target?.id == "userPassReg" ? setInputPass(false) : setInputPassCheck(false);
    }
  };

  const divStyle = "flex flex-col items-between justify-center w-full";
  const inputStyle = "px-2 py-1 rounded-sm h-min";
  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col items-center justify-center p-5 bg-white rounded w-min">
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
                <div className="relative">
                  <PasswordSwitch inputPass={inputPass} pass={passReg} />
                  <input type="password" name="" id="userPassReg" placeholder="" onChange={handlePassword} className={inputStyle + " w-full pr-8"} />
                </div>
              </div>
              <div className={divStyle}>
                <label htmlFor="userPassRegCheck" className="text-xs font-bold">
                  Repita la contraseña
                </label>
                <div className="relative">
                  <PasswordSwitch inputPass={inputPassCheck} pass={passRegCheck} />
                  <input type="password" name="" id="userPassRegCheck" placeholder="" onChange={handlePassword} className={inputStyle + " w-full pr-8"} />
                </div>
              </div>
              <div className={divStyle}>
                <label htmlFor="userImgReg" className="text-xs font-bold">
                  Imagen
                </label>
                {preview && (
                  <div className="flex flex-col items-center justify-center w-full py-1">
                    <div className="flex items-center justify-center w-32 h-32 overflow-hidden rounded-full aspect-square">
                      <img src={preview} alt="imageToUpload" className="object-cover aspect-auto" />
                    </div>
                    <p className="text-xs truncate">{image?.name}</p>
                    <p className={`text-xs ${(image?.size / 1024 / 1024).toFixed(2) > 10 ? "text-red-500 font-bold" : ""}`}>Tamaño: {(image?.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
                <input type="file" name="" id="userImgReg" accept="image/png, image/jpeg" className="hidden" placeholder="" onChange={handleImage} />
                <label htmlFor="userImgReg" className="self-center p-1 text-sm text-white bg-blue-900 rounded cursor-pointer select-none">
                  {image ? "Cambiar imagen" : "Seleccionar imagen"}
                </label>
                <p className="text-xs text-center">Tamaño máximo: 10MB</p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className="px-2.5 py-1.5 text-white bg-blue-600 rounded" disabled={(image?.size / 1024 / 1024).toFixed(2) > 10}>
                Registrarse
              </button>
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
    </div>
  );
};

export default Register;
