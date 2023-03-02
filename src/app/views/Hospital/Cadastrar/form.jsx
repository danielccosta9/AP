import * as React from 'react';
import { useState } from "react";
import Axios from "axios";

import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";

const AutoComplete = styled(Autocomplete)(() => ({
  marginBottom: '16px',
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "15px",
}));

const button = {
  padding: '10px 20px',
  margin: '10px',
  marginTop: '50px',
  width: '200px',
  borderRadius: '15px',
};

const suggestionsEstado = [
  { label: 'JOAO PESSOA - PB' },
  { label: 'CAMPINA GRANDE - PB' },
  { label: 'RECIFE - PE' },
  { label: 'NATAL - RN' },
];

const SimpleForm = () => {
  const baseURLHospital = "https://api-paciente.cyclic.app/hospital";
  const [values, setValues] = useState({});

  console.log(values);

  function submit(event) {
    event.preventDefault();
    console.log(values);
    Axios.post(baseURLHospital, values)
      .then(() => {
        setValues({});
      })
    alert('Cadastrado com sucesso!');
    //window.location.reload(false);
  }


  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();
    setValues(values => ({ ...values, [name]: value }))
  }

  return (
    <div>
      <ValidatorForm onSubmit={(event) => submit(event)}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
              type="text"
              name="nome"
              id="standard-basic"
              value={values.nome || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              label="Nome do Hospital"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <AutoComplete
              options={suggestionsEstado}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Local" variant="outlined" required />
              )}
              onChange={(event, value) => setValues(values => ({ ...values, estado: value.label }))}
            />
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit" style={button}>
          <Icon>save</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Salvar</Span>
        </Button>
      </ValidatorForm>
    </div >
  );
};

export default SimpleForm;