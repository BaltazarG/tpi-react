import React, { useState } from "react";
import "./SignUp.css";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const initialForm = {
  fullName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
};

const LoginAlt = () => {
  const [form, setForm] = useState(initialForm);

  const validations = e => {
    // const regEmail =
    //   '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';
    // if (regEmail.test(form.email)) {
    //   setEmailError(true);
    // }
    const regPassword = "/^[a-zA-Z0-9_-]{8,12}$/";

    if (regPassword.test(form.email)) {
      console.log("a");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    validations();
  };

  return (
    <div className="w-100 d-flex ">
      <div className="bg-dark w-50 height-100 p-5 ">
        <div className="w-100 bg-light p-5 rounded height-full d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="w-75 height-full d-flex flex-column justify-content-center gap-2"
          >
            <h1 className="text-dark fw-bold fs-1">Sign Up</h1>
            <p className="fs-6">
              Bienvenido! Por favor registrese para continuar.
            </p>
            <label htmlFor="FullNameo" className="fw-bold fs-6">
              Nombre Completo
            </label>
            <input
              type="text"
              name="FullName"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              placeholder="Ingresa tu nombre completo"
              className="form-control"
            />
            <label htmlFor="Email" className="fw-bold fs-6">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Ingresa tu email"
              className="form-control"
            />
            <label htmlFor="ConfirmEmail" className="fw-bold fs-6">
              Confirme su email
            </label>
            <input
              type="email"
              name="ConfirmEmail"
              value={form.confirmEmail}
              onChange={e => setForm({ ...form, confirmEmail: e.target.value })}
              placeholder="Confirme su email"
              className="form-control"
            />
            <label htmlFor="Password" className="fw-bold fs-6">
              Contraseña
            </label>
            <input
              type="password"
              name="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Ingresa tu contraseña"
              className="form-control"
            />
            <label htmlFor="ConfirmPassword" className="fw-bold fs-6">
              Confirme su contraseña
            </label>
            <input
              type="password"
              name="ConfirmPassword"
              value={form.confirmPassword}
              onChange={e =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="Confirme su contraseña"
              className="form-control"
            />
            <div className="d-flex justify-content-between mt-3 align-items-baseline">
              <input type="checkbox" name="Remember" className="d-none" />
              <label htmlFor="Remember"></label>
              <Link to="login" className="text-secondary">
                Tienes una cuenta? Iniciar sesion
              </Link>
            </div>
            <button
              className="w-100 p-3 fw-bold text-light bg-secondary rounded"
              type="submit"
            >
              Registrarse
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
