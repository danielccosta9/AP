import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

import suggestionsCar from './suggestionsCar';

import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";


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

const SimpleForm = () => {
  const baseURLAgenda = "https://api-paciente.cyclic.app/agenda";
  const baseURLHospital = "https://api-paciente.cyclic.app/hospital";
  const baseURLPaciente = "https://api-paciente.cyclic.app/paciente";
  const [values, setValues] = useState({});
  const [hospital, setHospital] = useState([]);
  const [paciente, setPaciente] = useState([]);


  const sugestionHospital = hospital.map((item) => {
    return { label: item.hospital_nome, key: item.hospital_id };
  });
  const sugestionPaciente = paciente.map((item) => {
    return { label: [item.paciente_nome, ' - ', item.paciente_cpf, ' - ', item.paciente_nascimento], key: item.paciente_id };
  });

  useEffect(() => {
    Axios.get(baseURLAgenda)
      .then(json => setValues(json.data))
  }, [])
  useEffect(() => {
    Axios.get(baseURLHospital).then((response) => {
      setHospital(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get(baseURLPaciente).then((response) => {
      setPaciente(response.data);
    });
  }, []);

  function submit(event) {
    event.preventDefault();
    Axios.post(baseURLAgenda, values)
      .then(() => {
        setValues({});
      })
      .catch((error) => {
        console.log(error);
      })
    setTimeout(() => {
      window.confirm(
        "Agendamento cadastrado com sucesso!"
      ); window.location.reload();
    }, 1000);
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
                <AutoComplete
                  name="paciente_id"
                  options={sugestionPaciente}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Paciente" variant="outlined" required />
                  )}
                  onChange={(event, value) => setValues(values => ({ ...values, paciente_id: value.key }))}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <AutoComplete
                  name="hospital_id"
                  options={sugestionHospital}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Hospital" variant="outlined" required />
                  )}
                  onChange={(event, value) => setValues(values => ({ ...values, hospital_id: value.key }))}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <AutoComplete
                  name="carro"
                  options={suggestionsCar}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Carro" variant="outlined" required />
                  )}
                  onChange={(event, value) => setValues(values => ({ ...values, carro: value.label }))}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
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
                <TextField
                  label="Hora de Saída"
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
                <TextField
                  label="Hora Marcada"
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

export default SimpleForm;