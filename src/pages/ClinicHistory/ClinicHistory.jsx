import axios from "axios";
import "./ClinicHistory.css";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ModalHistory from "../../components/ModalHistory/ModalHistory";

const specialties = [
  "Kinesiologia",
  "Pediatría",
  "Traumatología",
  "Cardiología",
  "Dermatología",
  "Oftalmología",
  "Ginecología",
  "Oncología",
];

const ClinicHistory = () => {
  const [clinicHistory, setClinicHistory] = useState([]);
  const { setToken, setUserType } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [modalData, setModalData] = useState({});

  const onSetModalValues = el => {
    setModalData({
      specialty: specialties[el.doctorId - 6],
      title: el.title,
      description: el.description,
      status: el.statusQuery,
      date: el.createdAt.slice(0, 10),
      diagnostico: el.diagnostic,
    });
  };

  const onFetchClinicHistory = useCallback(() => {
    setLoader(true);
    axios
      .get(
        `https://localhost:7139/api/patients/${localStorage.getItem(
          "user"
        )}/queries`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      .then(res => {
        setClinicHistory(res.data);
        setLoader(false);
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          setLoader(false);
          localStorage.removeItem("user");
          localStorage.removeItem("userType");
          setToken();
          setUserType();
          navigate("/login");
        }
      });
  }, [navigate, setToken, setUserType]);

  useEffect(() => {
    onFetchClinicHistory();
  }, [onFetchClinicHistory]);
  return (
    <div className="w-100 d-flex align-items-center flex-column justify-content-center">
      {loader ? (
        <div className="w-100 d-flex align-items-center justify-content-center height-100-nav">
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex w-100">
            <table
              className={
                theme === "light"
                  ? "table  w-100 text-dark"
                  : "table  w-100 text-light"
              }
            >
              <thead>
                <tr className=" w-100 gap-2">
                  <th scope="col">#</th>
                  <th scope="col">Fecha</th>

                  <th scope="col">Asunto</th>
                  <th scope="col">Estado</th>
                  <th scope="col" className="text-center">
                    Consulta
                  </th>
                </tr>
              </thead>
              <tbody className="w-100">
                {clinicHistory.map((el, index) => (
                  <tr key={el.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{el.createdAt.slice(0, 10)}</td>
                    <td>{el.title}</td>
                    <td
                      className={
                        el.statusQuery === "Pending"
                          ? "status-pending"
                          : "status-resolved"
                      }
                    >
                      {el.statusQuery}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => onSetModalValues(el)}
                        className="btn btn-primary px-4 py-0 m-0 hov "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ModalHistory
              title={modalData.title}
              date={modalData.date}
              description={modalData.description}
              specialty={modalData.specialty}
              status={modalData.status}
              diagnostico={modalData.diagnostico}
              isPatient={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClinicHistory;
