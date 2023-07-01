import * as React from 'react';
import Axios from "axios";
import * as Yup from 'yup';

import suggestionsHouse from "./suggestionsHouse";
import { InputCpf, InputDate, InputPhone } from "../../InputForms"

import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";
import { useFormik } from 'formik';


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

const AutoComplete = styled(Autocomplete)(() => ({
  marginBottom: '16px',
}));



const SimpleForm = () => {

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      nascimento: '',
      telefone: '',
      cormobidade: '',
      residencia: '',
    },
    validationSchema: Yup.object({
      nome: Yup
        .string()
        .required('Obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .matches(/^[a-zA-ZÀ-ú ]*$/, 'Somente letras'),
      cpf: Yup
        .string()
        .required('Obrigatório')
        .min(14, 'Mínimo de 14 caracteres')
        .matches(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/, 'CPF inválido'),
      nascimento: Yup
        .string()
        .required('Obrigatório'),
      telefone: Yup
        .string()
        .required('Obrigatório')
        .min(15, 'Mínimo de 15 caracteres'),
      cormobidade: Yup
        .string()
        .required('Obrigatório'),
      residencia: Yup
        .string()
        .required('Obrigatório'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await Axios.post('https://api-paciente.cyclic.app/paciente', values)
        helpers.setStatus({ success: true })
        helpers.resetForm()
        alert('Paciente cadastrado com sucesso!')
      } catch (error) {
        helpers.setStatus({ success: false })
        alert('Erro ao cadastrar paciente!')
      }
    },
  })

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();
    formik.setFieldValue(name, value);
  }


  return (
    <div>
      <ValidatorForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="nome"
              label="Nome do Paciente"
              variant="outlined"
              value={formik.values.nome}
              onChange={formik.handleChange && handleChange}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CPF"
              variant="outlined"
              name="cpf"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              error={formik.touched.cpf && Boolean(formik.errors.cpf)}
              helperText={formik.touched.cpf && formik.errors.cpf}
              InputProps={{
                inputComponent: InputCpf,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data de Nascimento"
              variant="outlined"
              name="nascimento"
              value={formik.values.nascimento}
              onChange={formik.handleChange}
              error={formik.touched.nascimento && Boolean(formik.errors.nascimento)}
              helperText={formik.touched.nascimento && formik.errors.nascimento}
              InputProps={{
                inputComponent: InputDate,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefone"
              variant="outlined"
              name="telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
              InputProps={{
                inputComponent: InputPhone,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Comorbidade"
              variant="outlined"
              name="cormobidade"
              value={formik.values.cormobidade}
              onChange={formik.handleChange && handleChange}
              error={formik.touched.cormobidade && Boolean(formik.errors.cormobidade)}
              helperText={formik.touched.cormobidade && formik.errors.cormobidade}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AutoComplete
              options={suggestionsHouse}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Residência"
                  variant="outlined"
                  name="residencia"
                  value={formik.values.residencia}
                />
              )}

              onChange={(event, value) => {
                formik.setFieldValue('residencia', value?.label || '')
              }}
              error={formik.touched.residencia && Boolean(formik.errors.residencia)}
              helperText={formik.touched.residencia && formik.errors.residencia}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={button}
              endIcon={<Icon>send</Icon>}
            >
              <Span>Enviar</Span>
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div >
  );
};

export default SimpleForm;
