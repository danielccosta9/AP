import { Autocomplete, styled, TextField } from '@mui/material';
import React, { Fragment } from 'react';

import { useEffect, useState } from "react";
import Axios from 'axios';

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}));

const PesquisarPaciente = () => {
    const [values, setValues] = useState([]);
    const baseURLPaciente = "https://api-node-paciente-postgres.herokuapp.com/paciente";

    useEffect(() => {
        Axios.get(baseURLPaciente)
            .then(json => setValues(json.data))
    }, [])

    const suggestions = values;

    return (
        <Fragment>
            <AutoComplete
                options={suggestions}
                getOptionLabel={(option) => option.paciente_nome}
                renderInput={(params) => (
                    <TextField {...params} label="Pesquisar paciente" fullWidth />
                )}
            />
        </Fragment>
    );
};

export default PesquisarPaciente;