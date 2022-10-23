import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import Axios from "axios";

import {
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";


const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const InputCpf = React.forwardRef(function InputCpf(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const InputDate = React.forwardRef(function InputDate(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00/0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const InputPhone = React.forwardRef(function InputPhone(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

InputCpf.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputPhone.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SimpleForm = () => {
  const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";
  const [values, setValues] = useState({});

  console.log(values);

  function submit(event) {
    event.preventDefault();
    console.log(values);
    Axios.post(baseURL, values)
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

  const handleChangeMask = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


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
              label="Nome do Paciente"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />

            <TextField
              type="text"
              name="cormobidade"
              id="standard-basic"
              value={values.cormobidade || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              label="Comorbidades"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />

            <TextField
              type="text"
              name="residencia"
              id="standard-basic"
              value={values.residencia || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              label="Bairro"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />

          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <Box
              sx={{
                '& > :not(style)': {
                  m: 1,
                },
              }}
            >

              <FormControl variant="standard">
                <InputLabel htmlFor="formatted-text-mask-input">
                  CPF
                </InputLabel>
                <Input
                  name="cpf"
                  value={values.cpf}
                  onChange={handleChangeMask}
                  id="formatted-text-mask-input"
                  inputComponent={InputCpf}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                '& > :not(style)': {
                  m: 1,
                },
              }}
            >

              <FormControl variant="standard">
                <InputLabel htmlFor="formatted-text-mask-input">
                  Data de Nascimento
                </InputLabel>
                <Input
                  name="nascimento"
                  value={values.nascimento}
                  onChange={handleChangeMask}
                  id="formatted-text-mask-input"
                  inputComponent={InputDate}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                '& > :not(style)': {
                  m: 1,
                },
              }}
            >
              <FormControl variant="standard">
                <InputLabel htmlFor="formatted-text-mask-input">
                  Telefone
                </InputLabel>
                <Input
                  name="telefone"
                  value={values.telefone}
                  onChange={handleChangeMask}
                  id="formatted-text-mask-input"
                  inputComponent={InputPhone}
                />
              </FormControl>
            </Box>

          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>save</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Salvar</Span>
        </Button>
      </ValidatorForm>
    </div >
  );
};

export default SimpleForm;