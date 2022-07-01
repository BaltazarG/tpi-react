import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./DoctorHome.css";
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

const DoctorHome = () => {
  const { theme } = useContext(ThemeContext);
  const [modalData, setModalData] = useState({});
  const [clinicHistory, setClinicHistory] = useState([]);
  const [patients, setPatients] = useState(null);
  const { setToken, setUserType } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFetchQueries = useCallback(() => {
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

      .then(res => {
        setClinicHistory(res.data);
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
  }, [navigate, setToken, setUserType]);

  const onFetchPatients = useCallback(() => {
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
  }, [navigate, setToken, setUserType]);

  useEffect(() => {
    onFetchQueries();
    onFetchPatients();
  }, [onFetchQueries, onFetchPatients]);

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
    <>
      {" "}
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
                      patients?.find(patient => patient.id === el.patientId)
                        .name
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

          <ModalHistory
            title={modalData.title}
            date={modalData.date}
            description={modalData.description}
            specialty={modalData.specialty}
            status={modalData.status}
            diagnostico={modalData.diagnostico}
            isPatient={false}
            patient={modalData.patient}
            modalData={modalData}
            setModalData={setModalData}
            diagnostic={modalData.diagnostic}
            patientId={modalData.patientId}
            onFetchQueries={onFetchQueries}
            onFetchPatients={onFetchPatients}
            resolvedAt={modalData.resolvedAt}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorHome;
