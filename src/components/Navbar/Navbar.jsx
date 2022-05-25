import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { BsFillMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <div
      className={
        theme === "light"
          ? "bg-dark w-100 border-bottom border-primary border-2"
          : "bg-light w-100 border-bottom border-primary border-2"
      }
    >
      <div className="w-100 d-flex container justify-content-between align-items-baseline p-3">
        <div className="container-img">
          <img src={Logo} alt="Logo" className="w-100" />
        </div>
        <nav
          className={
            theme === "dark"
              ? "navbar navbar-expand-lg navbar-light"
              : "navbar navbar-expand-lg navbar-dark"
          }
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav align-items-baseline">
                {/* Todo ver ACTIVE */}
                <Link to="/" className="nav-link fw-bold">
                  Home
                </Link>
                <Link to="/cuenta" className="nav-link fw-bold">
                  Mi perfil
                </Link>
                <button
                  className={
                    theme === "dark" ? "btn text-dark" : "btn text-light"
                  }
                  onClick={handleTheme}
                >
                  <BsFillMoonFill />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
