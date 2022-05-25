import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";

import Account from "./pages/Account/Account";

import Login from "./pages/Login/Login";
import LoginAlt from "./pages/Login/LoginAlt";
import PatientHome from "./pages/PatientHome/PatientHome";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "app d-flex flex-column align-items-center bg-dark"
          : "app d-flex flex-column align-items-center bg-light"
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<PatientHome />} />
          <Route path="/login" element={<LoginAlt />} />
          <Route path="/cuenta" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
