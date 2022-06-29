import React, { useContext } from "react";
import "./NavbarDoc.css";
import Logo from "../../assets/logo.png";
import { BsFillMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

import { HiMenuAlt3 } from "react-icons/hi";

import { AuthContext } from "../../context/AuthContext";

const NavbarDoc = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { auth, setToken, setUser, setUserType } = useContext(AuthContext);

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
                to="/login"
                className={
                  theme === "dark"
                    ? "nav-link fw-bold navb-light navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                    : "nav-link fw-bold navb-light navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                }
                onClick={onLogOut}
              >
                Cerrar sesion
              </Link>
              <button className="btn" onClick={handleTheme}>
                <BsFillMoonFill className="fw-bold text-primary navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarDoc;
