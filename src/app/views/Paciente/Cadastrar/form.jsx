import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
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
import { Span } from "app/components/Typography";


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

const suggestions = [
  { label: 'MASCULINO' },
  { label: 'FEIMININO' },
  { label: 'OUTROS' },
];

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
              required
              type="text"
              name="cormobidade"
              id="standard-basic"
              value={values.cormobidade || ""}
              onChange={handleChange}
              errorMessages={["Este campo é obrigatório"]}
              label="Cormobidade"
              validators={["required", "minStringLength: 3", "maxStringLength: 100"]}
            />

            <AutoComplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Sexo" variant="outlined" required />
              )}
              onChange={(event, value) => setValues(values => ({ ...values, sexo: value.label }))}
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
              name="nascimento"
              value={values.nascimento || ""}
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