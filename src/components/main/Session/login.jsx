import React from "react";
import accountService from "../../../services/account";
import { AccountContext } from "../../../contexts/AccountProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPass").value;
    let remember = document.getElementById("remember").checked;
    let userInfo = { email, password, remember };
    console.log({ credentials: { ...userInfo } });
    try {
      accountService.login(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const divStyle = "flex flex-col items-between justify-center w-full";
  const inputStyle = "px-2 py-1 rounded-sm h-min";
  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-col items-center justify-center p-5 bg-white rounded w-min">
        <div className="flex flex-col items-center p-4 border w-min">
          <p className="text-2xl font-bold">Iniciar sesión</p>
          <form action="" id="login" onSubmit={handleLogin} className="flex flex-col items-end pt-3 space-y-3">
            <div className="flex flex-col items-start space-y-1 w-min">
              <div className={divStyle}>
                <label htmlFor="" className="text-xs font-bold">
                  Email
                </label>
                <input type="email" name="" required id="userEmail" placeholder="" className={inputStyle} />
              </div>
              <div className={divStyle}>
                <label htmlFor="" className="text-xs font-bold">
                  Contraseña
                </label>
                <input type="password" name="" required id="userPass" placeholder="" className={inputStyle} />
              </div>
            </div>
            <div className="flex items-center justify-center w-full ">
              <button className="p-1 text-white border border-black rounded bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl">Iniciar sesión</button>
            </div>
            <div className="flex items-center self-center space-x-2">
              <label htmlFor="">Recordar</label>
              <input type="checkbox" id="remember" />
            </div>
          </form>
        </div>
        <p>
          <span>¿Todavía no tienes cuenta? </span>
          <Link to={"/session/register"} className="text-blue-600 hover:underline">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
