import "./Login.css";
import { FaUserMd, FaUser } from "react-icons/fa";
const Login = () => {
  return (
    <div className="bg-primary box-size d-flex justify-content-center align-items-center flex-column py-5 rounded ">
      <div className="text-center">
        <div className="d-flex justify-content-between">
          <FaUserMd />
          <FaUser />
        </div>
        <h2 className="fs-2 fw-bold fst-italic">Login</h2>
        <h4 className="paragraph fw-bold text-secondary">
          Por favor, ingrese su usuario y contraseña
        </h4>
      </div>
      <form className="d-flex flex-column justify-content-center align-items-center gap-2 mt-4">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <h4 className="paragraph fw-bold text-secondary fst-italic">
          Olvido su contraseña?
        </h4>
        <button className="btn btn-dark fw-bold paragraph" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
