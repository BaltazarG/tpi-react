import React from "react";
import History from "../../components/History/History";
import Navbar from "../../components/Navbar/Navbar";
import Query from "../../components/Query/Query";
import "./PatientHome.css";

const PatientHome = () => {
  return (
    <div className="w-100 d-flex align-items-center flex-column">
      <Navbar />
      <div className="d-flex">
        <Query />
      <History />
      </div>
      
    </div>
  );
};

export default PatientHome;
