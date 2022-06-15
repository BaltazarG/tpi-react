import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const MedicosHome = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-100 m-1 d-flex align-items-center flex-column">
      <table
        className={
          theme === "dark"
            ? "table table-light w-100"
            : "table table-dark w-100"
        }
      >
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Consulta</th>
            <th scope="col">Contestado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Cristina</td>
            <td>Cuesta respirar</td>
            <td>
              <textarea
                className="inputQuery"
                name="comentarios"
                rows="10"
                cols="40"
                placeholder="Responder la consulta del paciente aqui..."
              ></textarea>
              <button>Responder</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Toretto</td>
            <td>Dolor de Pierna</td>
            <td>
              <textarea
                className="inputQuery"
                name="comentarios"
                rows="10"
                cols="40"
                placeholder="Responder la consulta del paciente aqui..."
              ></textarea>
              <button>Responder</button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Jose</td>
            <td>Dolor de Cabeza</td>
            <td>
              <textarea
                className="inputQuery"
                name="comentarios"
                rows="10"
                cols="40"
                placeholder="Responder la consulta del paciente aqui..."
              ></textarea>
              <button>Responder</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicosHome;
