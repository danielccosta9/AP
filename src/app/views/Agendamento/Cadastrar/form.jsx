import * as React from 'react';
import { useState } from "react";
import Axios from "axios";

import {
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";


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

const SimpleForm = () => {
  const baseURLPaciente = "https://api-paciente.cyclic.app/agendaauto";
  const [values, setValues] = useState({});

  function submit(event) {
    event.preventDefault();
    console.log(values);
    Axios.post(baseURLPaciente, values)
      .then(() => {
        setValues({});
      })
    alert('Cadastrado com sucesso!');
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();
    setValues(values => ({ ...values, [name]: value }))
  }

  console.log(values);

  return (
    <div>
      <ValidatorForm onSubmit={(event) => submit(event)}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              required
              id="nome"
              name="paciente_nome"
              label="Nome do Paciente"
              fullWidth
              value={values.paciente_nome || ""}
              onChange={handleChange}
              errorMessages={"Nome inválido"}
              validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-ZÀ-ú ]*$"]}
            />
            <TextField
              required
              type="text"
              name="paciente_cpf"
              id="standard-basic"
              value={values.paciente_cpf || ""}
              onChange={handleChange}
              label="CPF"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />
            <TextField
              required
              type="text"
              name="paciente_telefone"
              id="standard-basic"
              value={values.paciente_telefone || ""}
              onChange={handleChange}
              label="Telefone"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />

            <TextField
              required
              id="Hospital"
              name="hospital_nome"
              label="Hospital"
              fullWidth
              type='text'
              onChange={handleChange}
              value={values.hospital_nome || ''}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
              required
              id="agenda_data"
              name="agenda_data"
              fullWidth
              type='date'
              onChange={handleChange}
              value={values.agenda_data || ''}
            />

            <TextField
              required
              id="agenda_saida"
              name="agenda_saida"
              label="Saida"
              fullWidth
              onChange={handleChange}
              value={values.agenda_saida || ''}
            />
            <TextField
              required
              label="Marcado"
              name="agenda_marcado"
              value={values.agenda_marcado || ""}
              onChange={handleChange}
              validators={["required"]}
              id="formatted-text-mask-input"
            />
            <TextField
              required
              label="Carro"
              name="agenda_carro"
              value={values.agenda_carro || ""}
              onChange={handleChange}
              validators={["required"]}
              id="formatted-text-mask-input"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Span
              name="agenda_status"
              onChange={handleChange}
              type="text"
              variant="outlined"
              value={values.agenda_status || 'AGENDADO'}
              valueDefault={values.agenda_status = 'AGENDADO'}
              disabled={true}
              required={true}>
            </Span>
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={button}
        >
          <Icon>save</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Salvar</Span>
        </Button>
      </ValidatorForm>
    </div >
  );
};

export default SimpleForm;