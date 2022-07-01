import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ModalHistory = ({
  title,
  date,
  description,
  specialty,
  status,
  diagnostico,
  isPatient,
  resolvedAt,
  setModalData,
  patient,
  diagnostic,
  modalData,
  patientId,
  onFetchQueries,
  onFetchPatients,
}) => {
  const { setToken, setUserType } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSendDiagnostic = () => {
    axios
      .put(
        `https://localhost:7139/api/patients/${patientId}/queries/${modalData.id}/`,
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
      .then(() => {
        setModalData({});
        onFetchQueries();
        onFetchPatients();
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

  return (
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
              {title}
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
              {date?.slice(0, 10)}
            </p>
            <p className="fs-6">
              <b>Consulta: </b>
              {description}
            </p>
            <p className="fs-6">
              <b>Departamento: </b>
              {specialty}
            </p>
            <p className="fs-6">
              <b>Estado: </b>
              {status}
            </p>
            {isPatient && diagnostico && (
              <p className="fs-6">
                <b>Diagnostico: </b>
                {diagnostico}
              </p>
            )}
            {!isPatient && (
              <>
                <p className="fs-6">
                  <b>Paciente: </b>
                  {patient}
                </p>
                {status === "Pending" && (
                  <textarea
                    className="form-control txt-area"
                    value={diagnostic}
                    onChange={e =>
                      setModalData({
                        ...modalData,
                        diagnostic: e.target.value,
                      })
                    }
                  />
                )}
                {status === "Resolved" && (
                  <>
                    <p className="fs-6">
                      <b>Diagnostico: </b>
                      {diagnostico}
                    </p>
                    <p className="fs-6">
                      <b>Fecha de diagnostico: </b>
                      {resolvedAt.slice(0, 10)}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>{" "}
            {!isPatient && !diagnostico && (
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
  );
};

export default ModalHistory;
