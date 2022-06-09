import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./History.css";

const History = ({ form }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="tables">
      <table
        className={
          theme === "dark"
            ? "table table-light w-100"
            : "table table-dark w-100"
        }
      >
        <thead>
          <tr>
            <th scope="col">Consulta</th>
            <th scope="col">Fecha</th>
            <th scope="col">Consulta</th>
            <th scope="col">Diagnostico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>date</td>
            <td>cons</td>
            <td>Respuesta medica</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>datos</td>
            <td>con</td>
            <td>Respuesta medica</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>datos</td>
            <td>consul</td>
            <td>Respuesta medica</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
