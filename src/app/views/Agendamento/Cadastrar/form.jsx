/* eslint-disable no-mixed-operators */
import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  LinearProgress,
  styled,
  TextField
} from "@mui/material";

import { Span } from "../../../components/Typography";
import suggestionsCar from './suggestionsCar';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hospital, setHospital] = useState([]);
  const [paciente, setPaciente] = useState([]);

  const sugestionHospital = hospital.map((item) => {
    return { label: item.hospital_nome, key: item.hospital_id };
  });
  const sugestionPaciente = paciente.map((item) => {
    return { label: [item.paciente_nome, ' - ', item.paciente_cpf, ' - ', item.paciente_nascimento], key: item.paciente_id };
  });


  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api-paciente.cyclic.app/hospital").then((response) => {
      setHospital(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api-paciente.cyclic.app/paciente").then((response) => {
      setPaciente(response.data);
      setIsLoading(false);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      paciente_id: '',
      hospital_id: '',
      carro: '',
      data: '',
      saida: '',
      marcado: '',
      status: '',
    },
    validationSchema: Yup.object({
      paciente_id: Yup
        .string()
        .required('Obrigatório'),
      hospital_id: Yup
        .string()
        .required('Obrigatório'),
      carro: Yup
        .string()
        .required('Obrigatório'),
      data: Yup
        .string()
        .required('Obrigatório'),
      saida: Yup
        .string()
        .required('Obrigatório'),
      marcado: Yup
        .string()
        .required('Obrigatório'),
      status: Yup
        .string()
        .required('Obrigatório'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await Axios.post('https://api-paciente.cyclic.app/agenda', values);
        helpers.setStatus({ success: true })
        helpers.resetForm();
        alert('Agendamento cadastrado com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar agendamento!');
      }
    },
  });

  return (
    <>
      {isLoading && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LinearProgress />
        </Grid>
      ) || (
          <ValidatorForm onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <AutoComplete
                      options={sugestionPaciente}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Paciente"
                          variant="outlined"
                          name="paciente_id"
                          value={formik.values.paciente_id}
                          disabled={isLoading}
                        />
                      )}
                      onChange={(_, value) => {
                        formik.setFieldValue('paciente_id', value?.key || '')
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <AutoComplete
                      options={sugestionHospital}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Hospital"
                          variant="outlined"
                          name="hospital_id"
                          value={formik.values.hospital_id}
                          disabled={isLoading}
                        />
                      )}
                      onChange={(_, value) => {
                        formik.setFieldValue('hospital_id', value?.key || '')
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <AutoComplete
                      options={suggestionsCar}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Carro"
                          variant="outlined"
                          name="carro"
                          value={formik.values.carro}
                        />
                      )}

                      onChange={(event, value) => {
                        formik.setFieldValue('carro', value?.label || '')
                      }}
                      error={formik.touched.carro && Boolean(formik.errors.carro)}
                      helperText={formik.touched.carro && formik.errors.carro}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      name="data"
                      onChange={formik.handleChange}
                      type="date"
                      value={formik.values.data}
                      variant="outlined"
                      style={section}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      label="Hora de Saída"
                      fullWidth
                      name="saida"
                      onChange={formik.handleChange}
                      type="time"
                      value={formik.values.saida}
                      variant="outlined"
                      style={section}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      label="Hora Marcada"
                      fullWidth
                      name="marcado"
                      onChange={formik.handleChange}
                      type="time"
                      value={formik.values.marcado}
                      variant="outlined"
                      style={section}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Span
                      name="status"
                      onChange={formik.handleChange}
                      type="number"
                      variant="outlined"
                      value={formik.values.status || 'AGENDADO'}
                      valueDefault={formik.values.status = 'AGENDADO'}
                      disabled={true}
                    >
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
        )}
    </>
  );
};

export default SimpleForm;
