import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

import {
  Button,
  Grid,
  Icon,
} from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";

import ComboHospital from "./ComboHospital";
import ComboPaciente from "./ComboPaciente";

import { Box, styled, TextField } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppAutoComplete = () => {
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
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Agendamento", path: "/agendamento/combo-box" }, { name: "Combo Box" }]} />
        </Box>
      </Container>

      <ValidatorForm onSubmit={(event) => submit(event)}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SimpleCard title="Agendamento">
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {/* <ComboHospital /> */}
                  <Span>ID Paciente</Span>
                  <TextField
                    fullWidth
                    name="paciente_id"
                    onChange={handleChange}
                    type="number"
                    value={parseInt(values.paciente_id)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {/* <ComboPaciente /> */}
                  <Span>ID Hospital</Span>
                  <TextField
                    fullWidth
                    name="hospital_id"
                    onChange={handleChange}
                    type="number"
                    value={parseInt(values.hospital_id) || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {/* <ComboPaciente /> */}
                  <Span>Carro Baixo</Span>
                  <TextField
                    fullWidth
                    name="carro"
                    onChange={handleChange}
                    type="text"
                    value={values.carro}
                    variant="outlined"
                  />
                </Grid>
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
            </SimpleCard>
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
            >
              Agendar
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default AppAutoComplete;
