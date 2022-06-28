import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import "./ClinicHistory.css";

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
  const { user, token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [modalData, setModalData] = useState({});

  const onSetModalValues = el => {
    setModalData({
      specialty: specialties[el.doctorId - 1],
      title: el.title,
      description: el.description,
      status: el.statusQuery,
      date: el.createdAt,
      diagnostico: "",
    });
  };

  useEffect(() => {
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

      .then(res => setClinicHistory(res.data));
  }, []);
  return (
    <div className="w-100 d-flex align-items-center flex-column justify-content-center">
      <div className="d-flex w-100">
        <table
          className={
            theme === "light"
              ? "table  w-100 text-dark"
              : "table  w-100 text-light"
          }
        >
          <thead>
            <tr className=" w-100 gap-2 ">
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
                <td>{el.createdAt}</td>
                <td>{el.title}</td>
                <td>{el.statusQuery}</td>
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

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modalData.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="fs-6">
                  <b>Fecha de creacion: </b>
                  {modalData.date}
                </p>
                <p className="fs-6">
                  <b>Consulta: </b>
                  {modalData.description}
                </p>
                <p className="fs-6">
                  <b>Departamento: </b>
                  {modalData.specialty}
                </p>
                <p className="fs-6">
                  <b>Estado: </b>
                  {modalData.status}
                </p>
                {modalData.diagnostico && (
                  <p className="fs-6">
                    <b>Diagnostico: </b>
                    {modalData.diagnostico}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicHistory;
