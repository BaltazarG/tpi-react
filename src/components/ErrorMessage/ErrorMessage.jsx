import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <div className="message  w-75 rounded pt-3">
      <p className="text-danger text-center fw-bold">
        El campo email es requerido
      </p>
    </div>
  );
};

export default ErrorMessage;
