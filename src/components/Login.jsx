import "./Login.css";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validations = (e) => {
    // const regEmail =
    //   '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';
    // if (regEmail.test(form.email)) {
    //   setEmailError(true);
    // }
  };

  const handleSubmit = (e) => {
    validations();
    e.preventDefault();
  };
  return (
    <div className="bg-primary box-size d-flex justify-content-between align-items-center flex-column p-2 rounded border border-secondary">
      <div className="d-flex justify-content-between w-100 text-dark">
        <FaUserMd />
        <FaUser />
      </div>
      <div className="d-flex flex-column justify-content-center align-center w-75">
        <h2 className="fw-bold text-dark text-center">Login</h2>
        <form
          className="d-flex flex-column justify-content-center align-items-center gap-2 mt-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            onChange={handleForm}
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            onChange={handleForm}
          />
          <h4 className="paragraph fw-bold text-muted fst-italic">
            Olvido su contraseña?
          </h4>
          <button className="btn btn-dark fw-bold paragraph" type="submit">
            Ingresar
          </button>
          <div className="w-100 d-flex justify-content-center flex-column align-items-center">
            <hr className="w-100" />
            <button className="btn btn-dark fw-bold paragraph" type="submit">
              Crear nueva cuenta
            </button>
          </div>
        </form>
      </div>
      {emailError && <ErrorMessage />}

      <div>
        <p className="fst-italic paragraph montserrat">
          © developed by TUP in 2022{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
