import React, { useState } from "react";
import "./LoginAlt.css";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/logo.png";

const LoginAlt = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div className="w-100 d-flex ">
      <div className="bg-dark w-50 height-100 p-5 ">
        <div className="w-100 bg-light p-5 rounded height-full d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="w-75 height-full d-flex flex-column justify-content-center gap-2"
          >
            <h1 className="text-dark fw-bold fs-1">Login</h1>
            <p className="fs-6">
              Bienvenido de nuevo! Por favor inicie sesion para continuar.
            </p>

            <label htmlFor="Email" className="fw-bold fs-6">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={email}
              handleChange={e => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              className="form-control"
            />
            <label htmlFor="Password" className="fw-bold fs-6">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={password}
              handleChange={e => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="form-control"
            />
            <div className="d-flex justify-content-between mt-3 align-items-baseline">
              <input type="checkbox" name="Remember" />
              <label htmlFor="Remember"></label>
              <p className="text-secondary fst-italic">Olvido su contraseña?</p>
            </div>
            <button
              className="w-100 p-3 fw-bold text-light bg-secondary rounded"
              type="submit"
            >
              Iniciar sesion
            </button>
            <button
              className="w-100 p-3 text-dark bg-light rounded fw-bold "
              type="submit"
            >
              <FcGoogle /> Iniciar sesion con Google
            </button>
          </form>
        </div>
      </div>
      <div className="bg-dark w-50 height-100 d-flex justify-content-center align-items-center">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default LoginAlt;
