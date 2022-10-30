import React from 'react';

import { useEffect, useState } from "react";
import Axios from 'axios';

const section = {
  width: "300px",
  height: "50px",
  marginBottom: "16px",
};

const ComboPaciente = ({ onChange = () => { } }) => {
  const [values, setValues] = useState([]);
  const baseURLPaciente = "https://api-node-paciente-postgres.herokuapp.com/paciente";

  useEffect(() => {
    Axios.get(baseURLPaciente)
      .then(values => setValues(values.data))
  }, [])

  return (
    <select
      id='paciente'
      name="paciente_id"
      onChange={onChange}
      style={section}
      required={true}
    >
      <option value="">Selecione o paciente...</option>
      {values.map((paciente) => {
        const { paciente_id, paciente_nome } = paciente;
        return (
          <option key={paciente_id} value={paciente_id}> {paciente_nome}</option>
        )
      })}
    </select>
  );
};

export default ComboPaciente;