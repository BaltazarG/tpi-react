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
import Navbar from "./components/Navbar/Navbar";
import DocHome from "./components/DocHome/DocHome";
import NewQuery from "./pages/NewQuery/NewQuery";
import ClinicHistory from "./pages/ClinicHistory/ClinicHistory";

function App() {
  const { theme } = useContext(ThemeContext);
  const { auth, userType } = useContext(AuthContext);
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
          userType === "patient" ? (
            <>
              <Navbar />
              <Routes>
                <Route path="/consulta" element={<NewQuery />} />
                <Route path="/historial" element={<ClinicHistory />} />

                <Route path="/cuenta" element={<Account />} />
                <Route path="*" element={<Navigate to="/consulta" replace />} />
              </Routes>
            </>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/dochome" element={<DocHome />} />
                <Route path="*" element={<Navigate to="/dochome" replace />} />
              </Routes>
            </>
          )
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
      </Router>

      {/* {auth && userType === "patient" ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/consulta" element={<NewQuery />} />
            <Route path="/historial" element={<ClinicHistory />} />

            <Route path="/cuenta" element={<Account />} />
            <Route path="*" element={<Navigate to="/consulta" replace />} />
          </Routes>
        </Router>
      ) : auth && userType === "doctor" ? (
        <Router>
          <Routes>
            <Route path="/dochome" element={<DocHome />} />
            <Route path="*" element={<Navigate to="/dochome" replace />} />
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
      )} */}
    </div>
  );
}

export default App;
