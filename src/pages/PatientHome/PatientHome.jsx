import React, { useState } from "react";
import History from "../../components/History/History";
import Navbar from "../../components/Navbar/Navbar";
import Query from "../../components/Query/Query";
import "./PatientHome.css";

const PatientHome = () => {
  const [form, setForm] = useState(null);

  const onFormCompleted = formLoaded => {
    setForm(formLoaded);
  };

  return (
    <div className="w-100 d-flex align-items-center flex-column">
      <div className="d-flex">
        <Query onChangeQuery={onFormCompleted} />
        <History form={form} />
      </div>
    </div>
  );
};

export default PatientHome;
