import React, { useContext } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { BsFillMoonFill } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsFillSunFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setToken, setUserType } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const onLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setToken();
    setUserType();
    navigate("/login");
  };
  return (
    <div
      className={
        theme === "light"
          ? "navlight w-100 border-bottom border-primary border-2"
          : "navdark w-100 border-bottom border-primary border-2"
      }
    >
      <div className="w-100 d-flex container justify-content-between align-items-baseline p-3">
        <div className="container-img">
          <img src={Logo} alt="Logo" className="w-100" />
        </div>
        <nav
          className={
            theme === "dark"
              ? "navbar navbar-expand-lg"
              : "navbar navbar-expand-lg"
          }
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler text-primary "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <HiMenuAlt3 className="fs-1" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <Link
                to="/consulta"
                className={
                  theme === "dark"
                    ? "nav-link fw-bold navb-light navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    : "nav-link fw-bold navb-dark navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                }
              >
                Consulta
              </Link>

              <Link
                to="/historial"
                className={
                  theme === "dark"
                    ? "nav-link fw-bold navb-light nav-item navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    : "nav-link fw-bold navb-dark navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                }
              >
                Historial
              </Link>
              <Link
                to="/cuenta"
                className={
                  theme === "dark"
                    ? "nav-link fw-bold navb-light navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    : "nav-link fw-bold navb-dark navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                }
              >
                Mi perfil
              </Link>

              <Link
                to="/login"
                className={
                  theme === "dark"
                    ? "nav-link fw-bold navb-light navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    : "nav-link fw-bold navb-dark navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                }
                onClick={onLogOut}
              >
                Cerrar sesion
              </Link>
              <button className="btn" onClick={handleTheme}>
                {theme === "dark" ? (
                  <BsFillSunFill className="fw-bold text-primary fs-6 navbar-nav-scroll" />
                ) : (
                  <BsFillMoonFill className="fw-bold text-primary fs-6 navbar-nav-scroll" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
