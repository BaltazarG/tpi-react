import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./History.css";

const History = ({ form, clinicHistory, setClinicHistory }) => {
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
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Consulta</th>
            <th scope="col">Diagnostico</th>
          </tr>
        </thead>
        <tbody>
          {clinicHistory.map((el, index) => (
            <tr key={el.id}>
              <th scope="row">{index + 1}</th>
              <td>{el.createdAt}</td>
              <td>{el.title}</td>
              <td>Respuesta medica</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
