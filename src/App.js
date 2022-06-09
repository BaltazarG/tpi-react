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
import Error404 from "./pages/Error404/Error404";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PatientHome from "./pages/PatientHome/PatientHome";
import Navbar from "./components/Navbar/Navbar";

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
      {auth ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PatientHome />} />
            <Route path="/cuenta" element={<Account />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
