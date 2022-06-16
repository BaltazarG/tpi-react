import React, { useState } from "react";
import History from "../../components/History/History";
import Navbar from "../../components/Navbar/Navbar";
import Query from "../../components/Query/Query";
import "./PatientHome.css";

const PatientHome = () => {
  const [clinicHistory, setClinicHistory] = useState([]);

  const onAddToHistory = query => {
    setClinicHistory([...clinicHistory, query]);
  };

  return (
    <div className="w-100 d-flex align-items-center flex-column">
      <div className="d-flex">
        <Query onAddToHistory={onAddToHistory} />
        <History
          clinicHistory={clinicHistory}
          setClinicHistory={setClinicHistory}
        />
      </div>
    </div>
  );
};

export default PatientHome;
