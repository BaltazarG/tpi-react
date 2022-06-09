import React, { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/logo.png";

const initialForm = {
  email: "",
  password: "",
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
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Ingresa tu email"
              className="form-control"
            />
            <label htmlFor="Password" className="fw-bold fs-6">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
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
        {/* <img src={Logo} alt="logo" /> */}
        <h2 className="logo_text">
          C<span className="logo_text_span">linica</span>
        </h2>

        <h2 className="logo_text">
          G<span className="logo_text_span">eneral</span>
        </h2>
      </div>
    </div>
  );
};

export default LoginAlt;
