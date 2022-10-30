import React from 'react';

import { useEffect, useState } from "react";
import Axios from 'axios';

const section = {
  width: "300px",
  height: "50px",
  marginBottom: "16px",
};

const ComboHospital = ({ onChange = () => { } }) => {
  const [values, setValues] = useState([]);
  const baseURLHospital = "https://api-node-paciente-postgres.herokuapp.com/hospital";

  useEffect(() => {
    Axios.get(baseURLHospital)
      .then(values => setValues(values.data))
  }, [])

  return (
    <select
      id='hospital'
      name="hospital_id"
      onChange={onChange}
      style={section}
      required={true}
    >
      <option value="">Selecione o hospital...</option>
      {values.map((hospital) => {
        const { hospital_id, hospital_nome } = hospital;
        return (
          <option key={hospital_id} value={hospital_id}> {hospital_nome}</option>
        )
      })}
    </select>
  );
};

export default ComboHospital;