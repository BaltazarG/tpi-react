import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useCallback } from "react";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
};

const Account = () => {
  const { setUserType, setToken } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const onUpdateProfile = () => {
    axios
      .put(
        `https://localhost:7139/api/patients/${localStorage.getItem("user")}`,
        {
          name: editForm.name,
          lastName: editForm.lastName,
          email: editForm.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        onFetchProfile();
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

  const onFetchProfile = useCallback(() => {
    setLoader(true);
    axios
      .get(
        `https://localhost:7139/api/patients/${localStorage.getItem("user")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(res => {
        setProfileData(res.data);
        setLoader(false);
        setEditForm({
          name: res.data.name,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      })
      .catch(error => {
        setLoader(true);
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userType");
          setToken();
          setUserType();
          navigate("/login");
        }
      });
  }, [setToken, setUserType, navigate]);

  useEffect(() => {
    onFetchProfile();
  }, [onFetchProfile]);

  const onSubmit = e => {
    e.preventDefault();

    onUpdateProfile();
  };

  return (
    <>
      {loader ? (
        <div className="w-100 d-flex align-items-center justify-content-center height">
          <Loader />
        </div>
      ) : (
        <div
          className={
            theme === "light"
              ? "w-100 text-dark height d-flex flex-column align-items-center container pt-2 justify-content-center"
              : "w-100 text-light height d-flex flex-column align-items-center container pt-2 justify-content-center"
          }
        >
          <h2 className="fw-bold text-primary">Mi perfil</h2>

          <div className="d-flex flex-column text-center">
            <h3>
              Nombre: <span className="fs-4">{profileData?.name}</span>
            </h3>
            <h3>
              Apellido: <span className="fs-4">{profileData?.lastName}</span>
            </h3>
            <h3>
              Email: <span className="fs-4">{profileData?.email}</span>
            </h3>
          </div>

          <button
            type="button"
            className="btn btn-primary py-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Editar Perfil
          </button>

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
                    Editar Perfil
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="modal-body">
                    <div className="d-flex flex-column gap-2">
                      <input
                        type="text"
                        placeholder="Ingresa el nuevo nombre"
                        className="form-control"
                        value={editForm.name}
                        onChange={e =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Ingresa el nuevo apellido"
                        className="form-control"
                        value={editForm?.lastName}
                        onChange={e =>
                          setEditForm({ ...editForm, lastName: e.target.value })
                        }
                      />
                      <input
                        type="email"
                        placeholder="Ingresa el nuevo email"
                        className="form-control"
                        value={editForm?.email}
                        onChange={e =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
