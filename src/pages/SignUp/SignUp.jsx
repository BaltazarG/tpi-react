import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(null);

  const onSetErrors = async () => {
    let regExpEmail = /\S+@\S+\.\S+/;
    let regExpPassword =
      /^(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,14}$/;
    let err = null;
    if (!form.name || form.name.length < 3) {
      err = await { ...err, name: true };
    }
    if (!form.lastName || form.lastName.length < 3) {
      err = await { ...err, lastName: true };
    }
    if (!regExpEmail.test(form.email)) {
      err = await { ...err, email: true };
    }
    if (form.confirmEmail !== form.email || !form.confirmEmail) {
      err = await { ...err, confirmEmail: true };
    }
    if (regExpPassword.test(form.password)) {
      err = await { ...err, password: true };
    }
    if (form.confirmPassword !== form.password) {
      err = await { ...err, confirmPassword: true };
    }

    setErrors(err);
  };

  const onRegister = () => {
    axios
      .post(`https://localhost:7139/api/patients`, {
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      .then(res => {
        setErrors(null);
      })
      .catch(err => console.log(err));
  };
  const handleSubmit = e => {
    e.preventDefault();
    let regExpEmail = /\S+@\S+\.\S+/;
    let regExpPassword =
      /^(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,14}$/;

    if (
      form.email &&
      form.password &&
      regExpEmail.test(form.email) &&
      regExpPassword.test(form.password) &&
      form.password === form.confirmPassword &&
      form.confirmEmail === form.email
    ) {
      return onRegister();
    } else {
      return onSetErrors();
    }
  };

  return (
    <div className="w-100 d-flex height-signup">
      <div className="bg-dark w-50  p-5 responsive-log height-signup">
        <div className="w-100 bg-light p-5 rounded height-signup d-flex justify-content-center align-items-center ">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-75 height-full d-flex flex-column justify-content-center gap-2"
          >
            <h1 className="text-dark fw-bold fs-1">Sign Up</h1>
            <p className="fs-6">
              Bienvenido! Por favor registrese para continuar.
            </p>
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="name" className="fw-bold fs-6">
                Nombre
              </label>
              {errors?.name && (
                <p className="error-message">Debe ingresar un nombre</p>
              )}
            </div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Ingresa tu nombre"
              className={
                errors?.name ? "form-control border-danger" : "form-control"
              }
            />
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="lastName" className="fw-bold fs-6">
                Apellido
              </label>
              {errors?.lastName && (
                <p className="error-message">Debe ingresar un apellido</p>
              )}
            </div>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
              placeholder="Ingresa tu apellido"
              className={
                errors?.lastName ? "form-control border-danger" : "form-control"
              }
            />
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="Email" className="fw-bold fs-6">
                Email
              </label>
              {errors?.email && (
                <p className="error-message">Debe ingresar un email valido</p>
              )}
            </div>
            <input
              type="email"
              name="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Ingresa tu email"
              className={
                errors?.email ? "form-control border-danger" : "form-control"
              }
            />
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="ConfirmEmail" className="fw-bold fs-6">
                Confirmar email
              </label>
              {errors?.confirmEmail && (
                <p className="error-message">Los emails no coinciden</p>
              )}
            </div>
            <input
              type="email"
              name="ConfirmEmail"
              value={form.confirmEmail}
              onChange={e => setForm({ ...form, confirmEmail: e.target.value })}
              placeholder="Confirme su email"
              className={
                errors?.confirmEmail
                  ? "form-control border-danger"
                  : "form-control"
              }
            />
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="Password" className="fw-bold fs-6">
                Contraseña
              </label>
              {errors?.password && (
                <p className="error-message">
                  Debe tener minimo 8 caracteres y una letra minuscula
                </p>
              )}
            </div>
            <input
              type="password"
              name="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Ingresa tu contraseña"
              className={
                errors?.password ? "form-control border-danger" : "form-control"
              }
            />
            <div className="d-flex align-items-baseline justify-content-between">
              <label htmlFor="ConfirmPassword" className="fw-bold fs-6">
                Confirmar contraseña
              </label>
              {errors?.confirmPassword && (
                <p className="error-message">Las contraseñas no coinciden</p>
              )}
            </div>
            <input
              type="password"
              name="ConfirmPassword"
              value={form.confirmPassword}
              onChange={e =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="Confirme su contraseña"
              className={
                errors?.confirmPassword
                  ? "form-control border-danger"
                  : "form-control"
              }
            />
            <div className="d-flex justify-content-between mt-3 align-items-baseline">
              <input type="checkbox" name="Remember" className="d-none" />
              <label htmlFor="Remember"></label>
              <Link to="../login" className="text-secondary">
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
      <div className="bg-dark w-50 height-100 d-flex justify-content-center align-items-center responsive-login gap-2">
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

export default SignUp;
