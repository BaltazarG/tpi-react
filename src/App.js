import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import NewQuery from "./pages/NewQuery/NewQuery";
import ClinicHistory from "./pages/ClinicHistory/ClinicHistory";
import NavbarDoc from "./components/NavbarDoc/NavbarDoc";
import DoctorHome from "./pages/DoctorHome/DoctorHome";

function App() {
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  return (
    <div
      className={
        theme === "dark"
          ? "app d-flex flex-column align-items-center bg-dark"
          : "app d-flex flex-column align-items-center bg-light"
      }
    >
      <Router>
        {auth ? (
          localStorage.getItem("userType") === "patient" ? (
            <>
              <Navbar />
              <Routes>
                <Route path="/consulta" element={<NewQuery />} />
                <Route path="/historial" element={<ClinicHistory />} />

                <Route path="/cuenta" element={<Account />} />
                <Route path="*" element={<Navigate replace to="/consulta" />} />
              </Routes>
            </>
          ) : (
            localStorage.getItem("userType") === "doctor" && (
              <>
                <NavbarDoc />
                <Routes>
                  <Route path="/dochome" element={<DoctorHome />} />
                  <Route
                    path="*"
                    element={<Navigate replace to="/dochome" />}
                  />
                </Routes>
              </>
            )
          )
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
