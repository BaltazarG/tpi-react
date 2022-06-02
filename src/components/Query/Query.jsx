import React, { useContext } from "react";
import { useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Query.css"
const initialForm = {
  date: "",
  specialty: "",
  query: ""
}
const Query = ({onChangeQuery}) => {

  const [inputText, setInputText] = useState("")
  const [form, setForm] = useState(initialForm)
  
  const inputHandler = (event) => {
    setInputText(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText === "") {
        console.log("no se puede agregar")     
    }
    else{
      setInputText(inputText)
    }
    setForm(initialForm)
    onChangeQuery(form)
  }

  const { theme } = useContext(ThemeContext)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={ theme === "dark"
          ? "formulario-light label-light"
          : "formulario-dark label-dark"}>
          <p>
            <label>
              Fecha de Consulta: <input type="date"
              onChange={ (e) => setForm({...form, date: e.target.value})}
              value={form.date}
              />
            </label>
          </p>
          <p>
            <label htmlFor="">Seleccione especialidad:</label>
            <select name="" id="" 
            onChange={ (e) => setForm({...form, specialty: e.target.value})}
            value={form.specialty}
            >
              <option value="Kinesiologia">Kinesiologia</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Urgencias">Urgencias</option>
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
            value={form.query}
            onChange={ (e) => setForm({...form, query: e.target.value})}
          ></textarea>
          <button type="submit" >Enviar Consulta</button>
        </div>
      </form>
    </>
  );
};

export default Query;
