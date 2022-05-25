import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PatientHome.css";

const PatientHome = () => {
  return (
    <div className="w-100 d-flex align-items-center flex-column">
      <Navbar />
      <form>
        <div className="formulario">
          <p>
            <label htmlFor="">
              Nombre y Apellido: <input type="text" />{" "}
            </label>
          </p>
          <p>
            <label>
              Fecha de Consulta: <input type="date" />
            </label>
          </p>
          <p>
            <label htmlFor="">Seleccione especialidad:</label>
            <select name="" id="">
              <option value="">Kinesiologia</option>
              <option value="">Pediatria</option>
              <option value="">Urgencias</option>
            </select>
          </p>
          <p>
            <label> Ingrese su consulta </label>
          </p>
          <textarea
            className="inputQuery"
            name="comentarios"
            rows="10"
            cols="40"
            placeholder="Ingrese su consulta aqui..."
          ></textarea>
          <button>Enviar Consulta</button>
        </div>
      </form>
    </div>
  );
};

export default PatientHome;
