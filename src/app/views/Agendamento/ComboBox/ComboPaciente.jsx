import { Autocomplete, styled, TextField } from '@mui/material';
import React, { Fragment } from 'react';

import { useEffect, useState } from "react";
import Axios from 'axios';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const AutocompleteCombo = () => {
  const [values, setValues] = useState({});
  const baseURLPaciente = "https://api-node-paciente-postgres.herokuapp.com/paciente";


  console.log(values);

  useEffect(() => {
    Axios.get(baseURLPaciente)
      .then(json => setValues(json.data))
  }, [])

  const suggestions = values;

  return (
    <Fragment>
      <AutoComplete
        options={suggestions}
        getOptionLabel={(option) => option.paciente_nome}
        onChange={(event, value) => setValues({ ...values, paciente_id: value })}
        renderInput={(params) => (
          <TextField {...params} label="Paciente" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};

export default AutocompleteCombo;