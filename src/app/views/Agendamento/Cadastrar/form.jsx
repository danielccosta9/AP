import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";

import ComboPaciente from "./ComboPaciente";
import ComboHospital from "./ComboHospital";


import { TextField } from '@mui/material';

const section = {
  width: "300px",
  height: "40px",
  marginBottom: "16px",
};

const button = {
  padding: '10px 20px',
  margin: '10px',
  width: '200px',
  borderRadius: '15px',
};

const AutoComplete = styled(Autocomplete)(() => ({
  width: '300px',
  marginTop: '40px',
  marginBottom: '16px',
}));

const suggestionsCarro = [
  { label: 'NÃO' },
  { label: 'SIM' },
  { label: 'DUCA' },
  { label: 'NEIDE' },
];

const AgendamentoForm = () => {
  const baseURLAgenda = "https://api-node-paciente-postgres.herokuapp.com/agenda";
  const [values, setValues] = useState({});

  console.log(values);

  useEffect(() => {
    Axios.get(baseURLAgenda)
      .then(json => setValues(json.data))
  }, [])
  console.log(values);

  function submit(event) {
    event.preventDefault();
    console.log(values);
    Axios.post(baseURLAgenda, values)
      .then(() => {
        setValues({});
      })
    alert('Agendado com sucesso!');
    window.location.reload(false);
  }


  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();
    setValues(values => ({ ...values, [name]: value }))
  }


  return (
    <div>
      <ValidatorForm onSubmit={(event) => submit(event)}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Nome do Paciente</Span>
                <ComboPaciente
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Nome do Hospital</Span>
                <ComboHospital
                  onChange={handleChange}
                />

              </Grid>
              {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Carro Baixo</Span>
                <ComoboCarro
                  onChange={handleChange}
                />
              </Grid> */}
              <AutoComplete
                options={suggestionsCarro}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Carro Baixo" variant="outlined" required />
                )}
                onChange={(event, value) => setValues(values => ({ ...values, carro: value.label }))}
              />
            </Grid>

            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Data da Consulta</Span>
                <TextField
                  fullWidth
                  name="data"
                  onChange={handleChange}
                  type="date"
                  value={values.data}
                  variant="outlined"
                  style={section}
                  required={true}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Hora de Saída</Span>
                <TextField
                  fullWidth
                  name="saida"
                  onChange={handleChange}
                  type="time"
                  value={values.saida}
                  variant="outlined"
                  style={section}
                  required={true}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span>Hora Marcada</Span>
                <TextField
                  fullWidth
                  name="marcado"
                  onChange={handleChange}
                  type="time"
                  value={values.marcado}
                  variant="outlined"
                  style={section}
                  required={true}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Span
                  name="status"
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                  value={values.status || 'AGENDADO'}
                  valueDefault={values.status = 'AGENDADO'}
                  disabled={true}
                  required={true}>
                </Span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button
              color="primary"
              endIcon={<Icon>save</Icon>}
              size="large"
              type="submit"
              variant="contained"
              style={button}
            >
              Agendar
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default AgendamentoForm;
