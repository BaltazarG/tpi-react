import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import "./History.css"

const History = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <>

  <table className={ theme === "dark"
          ? "table table-light w-100"
          : "table table-dark w-100"}>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Fecha</th>
        <th scope="col">Consulta</th>
        <th scope="col">Diagnostico</th>
      </tr>
    </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

    </>
  )
}

export default History