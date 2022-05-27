import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Query.css"
const Query = () => {

  const { theme } = useContext(ThemeContext)

  return (
    <>
      <form>
        <div className={ theme === "dark"
          ? "formulario-light label-light"
          : "formulario-dark label-dark"}>
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
    </>
  );
};

export default Query;
