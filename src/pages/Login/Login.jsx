import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const initialForm = {
  email: "",
  password: "",
  doctor: false,
};

const LoginAlt = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { auth, setToken, setUser, setUserType, userType } =
    useContext(AuthContext);

  useEffect(() => {
    if (auth && userType === "patient") navigate("/consulta");
    if (auth && userType === "doctor") navigate("/dochome");
  }, [auth]);

  const handleAuth = async () => {
    await axios
      .post("https://localhost:7139/api/authentication/login", {
        email: form.email,
        password: form.password,
        userType: form.doctor ? "doctor" : "patient",
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        setToken(localStorage.getItem("token"));
        localStorage.setItem("user", response.data.id);
        setUser({
          name: response.data.name,
          lastName: response.data.lastName,
          email: response.data.email,
          id: response.data.id,
        });
        form.doctor
          ? localStorage.setItem("userType", "doctor")
          : localStorage.setItem("userType", "patient");
        form.doctor ? setUserType("doctor") : setUserType("patient");
        setError(false);
      })
      .catch(error => setError("Usuario y/o contraseña no valido"));
  };

  const handleDoctor = () => {
    setForm({ ...form, doctor: !form.doctor });
  };
  const handleSubmit = e => {
    e.preventDefault();
    let regExpEmail = /\S+@\S+\.\S+/;

    if (form.email && form.password && regExpEmail.test(form.email)) {
      return handleAuth();
    } else {
      return setError("Usuario y/o contraseña no valido");
    }
  };

  return (
    <div className="w-100 d-flex ">
      <div className="bg-dark w-50 height-100 p-5 responsive-log">
        <div className="w-100 bg-light p-5 rounded height-full d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="w-75 height-full d-flex flex-column justify-content-center gap-2"
            noValidate
          >
            <h1 className="text-dark fw-bold fs-1">Login</h1>
            <p className="fs-6">
              Bienvenido de nuevo! Por favor inicie sesion para continuar.
            </p>
            {error !== null && <p className="errormessage">{error}</p>}
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
            <div className="d-flex justify-content-between mt-3 align-items-baseline">
              <p className="text-secondary">Sos Medico?</p>
              <input
                type="checkbox"
                name="Remember"
                value={form.doctor}
                onChange={handleDoctor}
              />{" "}
            </div>

            {/* <Link to="signup" className="text-secondary">
              No tienes una cuenta? Registrate
            </Link> */}

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
      <div className="bg-dark w-50 height-100 d-flex justify-content-center align-items-center responsive-login gap-2">
        {/* <img src={Logo} alt="logo" /> */}
        <h2 className="logo_text">
          C<span className="logo_text_span">linica </span>
        </h2>

        <h2 className="logo_text flex-end">
          G<span className="logo_text_span">eneral</span>
        </h2>
      </div>
    </div>
  );
};

export default LoginAlt;
