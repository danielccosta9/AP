import { Autocomplete, styled, TextField } from '@mui/material';
import React, { Fragment } from 'react';

import { useEffect, useState } from "react";
import Axios from 'axios';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const AutocompleteCombo = () => {
  const [value, setValue] = useState(null);
  const baseURL = "https://api-node-paciente-postgres.herokuapp.com/hospital";

  console.log(value);

  useEffect(() => {
    Axios.get(baseURL)
      .then(json => setValue(json.data))
  }, [])

  const suggestions = value;

  return (
    <Fragment>
      <AutoComplete
        options={suggestions}
        getOptionLabel={(option) => option.hospital_nome}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};

export default AutocompleteCombo;