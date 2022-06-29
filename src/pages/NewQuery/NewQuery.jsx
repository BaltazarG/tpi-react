import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import "./NewQuery.css";

const initialForm = {
  title: "",
  specialty: 1,
  description: "",
};

const NewQuery = () => {
  const [form, setForm] = useState(initialForm);
  const { setToken, setUserType } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    onSendForm();
  };

  const onSendForm = async () => {
    axios
      .post(
        `https://localhost:7139/api/patients/${localStorage.getItem(
          "user"
        )}/queries`,
        {
          title: form.title,
          description: form.description,
          doctorId: Number(form.specialty),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(response => {
        console.log(response);
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
    <div className="w-100 d-flex align-items-center flex-column justify-content-center height">
      <div className="d-flex w-100 align-items-center justify-content-center flex-column">
        <h2 className="text-primary">Realice una consulta</h2>
        <form onSubmit={handleSubmit}>
          <div className="formulario-dark label-dark border border-primary border-2 rounded d-flex w-100  align-items-center justify-content-between p-4">
            <div className="d-flex w-100 justify-content-between">
              <label htmlFor="specialty">Seleccione una especialidad: </label>
              <select
                name="specialty"
                onChange={e => setForm({ ...form, specialty: e.target.value })}
                value={form?.specialty}
                className="form-select-sm"
              >
                <option value="6">Kinesiología</option>
                <option value="7">Pediatría</option>
                <option value="8">Traumatología</option>
                <option value="9">Cardiología</option>
                <option value="10">Dermatología</option>
                <option value="11">Oftalmología</option>
                <option value="12">Ginecología </option>
                <option value="13">Oncología</option>
              </select>
            </div>
            <div className="d-flex flex-column w-100 gap-3">
              <label htmlFor="title">Ingrese un asunto</label>
              <input
                value={form?.title}
                type="text"
                name="title"
                className="form-control"
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Ingresa un asunto..."
              />
            </div>
            <div className="d-flex flex-column w-100 gap-3">
              <label className="fs-6 "> Ingrese su consulta </label>

              <textarea
                className="w-100 form-control txt-area"
                name="comentarios"
                rows="10"
                cols="40"
                placeholder="Ingrese su consulta aqui..."
                value={form?.description}
                onChange={e =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="w-100 d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-outline-primary text-primary border-primary border-2"
              >
                Enviar Consulta
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuery;
