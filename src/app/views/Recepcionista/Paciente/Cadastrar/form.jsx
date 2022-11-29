import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
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
  width: "80%",
  marginBottom: "16px",
}));

const button = {
  padding: '10px 20px',
  margin: '10px',
  marginTop: '50px',
  width: '200px',
  borderRadius: '15px',
};

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

const InputSus = React.forwardRef(function InputCpf(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000 0000 0000 0000"
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

InputSus.propTypes = {
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
  const baseURL = "http://10.0.2.199:8080/enfermeiros";
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
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              required
              id="nome"
              name="nome"
              label="Nome do Paciente"
              fullWidth
              value={values.nome || ""}
              onChange={handleChange}
              errorMessages={"Nome inválido"}
              validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-ZÀ-ú ]*$"]}
            />
            <TextField
              type="text"
              name="responsavel"
              id="responsavel"
              value={values.responsavel || ""}
              onChange={handleChange}
              errorMessages={"Nome inválido"}
              label="Responsável"
              validators={["required", "minStringLength: 3", "maxStringLength: 100", "matchRegexp:^[a-zA-ZÀ-ú ]+$"]}
              fullWidth
              required
            />
            <TextField
              required
              type="text"
              name="residencia"
              id="standard-basic"
              value={values.residencia || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              label="Residencia"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />
            <TextField
              required
              type="text"
              name="sexo"
              label="Sexo"
              id="standard-basic"
              value={values.sexo || ""}
              onChange={handleChange}
              errorMessages={"Escolha entre as opções: MASCULINO|FEMININO| OUTROS"}
              vvalidators={["required", "minStringLength: 5"]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              sx={{ width: '30ch' }}
              required
              id="cpf"
              name="cpf"
              label="CPF"
              fullWidth
              onChange={handleChange}
              value={values.cpf || ''}
              validators={["required", "minStringLength: 14", "maxStringLength: 14", "matchRegexp:^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"]}
              errorMessages={"CPF inválido"}
              InputProps={{
                inputComponent: InputCpf,
              }}
            />

            <TextField
              sx={{ width: '30ch' }}
              required
              id="sus"
              name="sus"
              label="Número do SUS"
              fullWidth
              onChange={handleChange}
              value={values.sus || ''}
              validators={["required", "minStringLength: 18", "maxStringLength: 18", "matchRegexp:^[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$"]}
              errorMessages={"SUS inválido"}
              InputProps={{
                inputComponent: InputSus,
              }}
            />

            <TextField
              sx={{ width: '30ch' }}
              required
              id="telefone"
              name="telefone"
              label="Telefone"
              fullWidth
              onChange={handleChange}
              value={values.telefone || ''}
              validators={["required", "minStringLength: 15", "maxStringLength: 15"]}
              errorMessages={"Telefone inválido"}
              InputProps={{
                inputComponent: InputPhone,
              }}
            />
            <TextField
              sx={{ width: '30ch' }}
              required
              type='date'
              name="data_nascimento"
              value={values.data_nascimento || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              validators={["required"]}
              id="formatted-text-mask-input"
            />
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