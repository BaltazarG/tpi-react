import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import "./DocHome.css";

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

const DocHome = () => {
  const { theme } = useContext(ThemeContext);
  const [modalData, setModalData] = useState({});
  const [clinicHistory, setClinicHistory] = useState([]);
  const [patients, setPatients] = useState(null);
  const { setToken, setUserType } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFetchQueries = () => {
    axios
      .get(
        `https://localhost:7139/api/doctors/${localStorage.getItem(
          "user"
        )}/queries`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      .then(res => setClinicHistory(res.data))
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userType");
          setToken();
          setUserType();
          navigate("/login");
        }
      });
  };

  const onFetchPatients = () => {
    axios
      .get(`https://localhost:7139/api/patients/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      .then(res => {
        setPatients(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userType");
          setToken();
          setUserType();
          navigate("/login");
        }
      });
  };
  const onSendDiagnostic = () => {
    axios
      .put(
        `https://localhost:7139/api/patients/${modalData.patientId}/queries/${modalData.id}/`,
        {
          diagnostic: modalData.diagnostic,
          statusQuery: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then()
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userType");
          setToken();
          setUserType();
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    onFetchQueries();
    onFetchPatients();
  }, [onSendDiagnostic]);

  const onSetModalValues = el => {
    setModalData({
      specialty: specialties[el.doctorId - 6],
      title: el.title,
      description: el.description,
      status: el.statusQuery,
      date: el.createdAt,
      diagnostico: el.diagnostic,
      patient: `${
        patients?.find(patient => patient.id === el.patientId).name
      } ${patients?.find(patient => patient.id === el.patientId).lastName}`,
      patientId: el.patientId,
      id: el.id,
      resolvedAt: el.resolvedAt,
    });
  };

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
              <th scope="col">Paciente</th>

              <th scope="col">Estado</th>
              <th scope="col" className="text-center">
                Fecha de diagnostico
              </th>

              <th scope="col" className="text-center">
                Consulta
              </th>
            </tr>
          </thead>
          <tbody className="w-100">
            {clinicHistory.map((el, index) => (
              <tr key={el.id}>
                <th>{index + 1}</th>

                <td>
                  {`${
                    patients?.find(patient => patient.id === el.patientId).name
                  } ${
                    patients?.find(patient => patient.id === el.patientId)
                      .lastName
                  }`}
                </td>
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
                  {el.resolvedAt ? el.resolvedAt?.slice(0, 10) : "--"}
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
                  {modalData.date?.slice(0, 10)}
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
                <p className="fs-6">
                  <b>Paciente: </b>
                  {modalData.patient}
                </p>

                {modalData.status === "Pending" && (
                  <textarea
                    className="form-control txt-area"
                    value={modalData.diagnostic}
                    onChange={e =>
                      setModalData({ ...modalData, diagnostic: e.target.value })
                    }
                  />
                )}

                {modalData.status === "Resolved" && (
                  <>
                    <p className="fs-6">
                      <b>Diagnostico: </b>
                      {modalData.diagnostico}
                    </p>
                    <p className="fs-6">
                      <b>Fecha de diagnostico: </b>
                      {modalData.resolvedAt.slice(0, 10)}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                {!modalData.diagnostico && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={onSendDiagnostic}
                  >
                    Enviar diagnostico
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocHome;
