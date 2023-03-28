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

const AutoComplete = styled(Autocomplete)(() => ({
  marginBottom: '16px',
}));

const suggestionsHouse = [
  { label: 'CENTRO' },
  { label: 'ZONA RUAL' },
  { label: 'BAIRRO - BELA VISTA' },
  { label: 'BAIRRO - CASTELO BRANCO' },
  { label: 'BAIRRO - SAO SEBASTIAO' },
  { label: 'BAIRRO - SANTO AMARO' },
  { label: 'BAIRRO - JOSÉ PESSOA DE BRITO' },
  { label: 'BAIRRO - EMÍLIA BORGES ' },
  { label: 'SÍTIO - BONITA' },
  { label: 'SÍTIO - BARRA DA ESPINGARDA' },
  { label: 'SÍTIO - CANAFISTULA' },
  { label: 'SÍTIO - CANAFISTINHA' },
  { label: 'SÍTIO - CACHOEIRA' },
  { label: 'SÍTIO - CIPOAL' },
  { label: 'SÍTIO - CHA DO MASCATE' },
  { label: 'SÍTIO - CUITE MENINO DEUS' },
  { label: 'SÍTIO - JACINTO' },
  { label: 'SÍTIO - LAGOA DAS VELHAS' },
  { label: 'SÍTIO - LAGOA DO FELIX' },
  { label: 'SÍTIO - MATA DE ESTREITO' },
  { label: 'SÍTIO - MASCATE' },
  { label: 'SÍTIO - MARMARAU' },
  { label: 'SÍTIO - MEREREBA' },
  { label: 'SÍTIO - MERCADOR DE BAIXO' },
  { label: 'SÍTIO - MERCADOR DE CIMA' },
  { label: 'SÍTIO - MUNLUNGUZINHO' },
  { label: 'SÍTIO - OLHO D`ÀGUA' },
  { label: 'SÍTIO - GENIPAPO DE TAUMATA' },
  { label: 'SÍTIO - GRAVATA DE PIABAS' },
  { label: 'SÍTIO - GUARIBAS' },
  { label: 'SÍTIO - PACHECO ' },
  { label: 'SÍTIO - PITOMBAS' },
  { label: 'SÍTIO - PIABAS' },
  { label: 'SÍTIO - RIACHO GRNADE' },
  { label: 'SÍTIO - RIACHO DE BAIXO' },
  { label: 'SÍTIO - SANTA LUCIA' },
  { label: 'SÍTIO - SAO VICENTE' },
  { label: 'SÍTIO - VIOLETA' },
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
  const baseURLPaciente = "https://api-paciente.cyclic.app/paciente";
  const [values, setValues] = useState({});

  console.log(values);

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
              options={suggestionsHouse}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Residencia" variant="outlined" required />
              )}
              onChange={(event, value) => setValues(values => ({ ...values, residencia: value.label }))}
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
              label="Data de Nascimento"
              name="nascimento"
              value={values.nascimento || ""}
              InputProps={{
                inputComponent: InputDate,
              }}
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