import Axios from 'axios';
import { useState, useEffect } from "react";

import {
  Box,
  Card,
  Grid,
  Icon,
  styled,
} from '@mui/material';
import { Small } from 'app/components/Typography';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {

  const [paciente, setPaciente] = useState([]);
  const [agendados, setAgendados] = useState([]);
  const baseURLPaciente = "https://api-paciente.cyclic.app/paciente";
  const baseURLAgendados = "https://api-paciente.cyclic.app/agenda";


  useEffect(() => {
    Axios.get(baseURLPaciente)
      .then(json => setPaciente(json.data))
  }, [])

  useEffect(() => {
    Axios.get(baseURLAgendados)
      .then(json => setAgendados(json.data))
  }, [])


  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const dataAmanha = formatDate(new Date().setDate(new Date().getDate() + 1));
  const dataDepoisAmanha = formatDate(new Date().setDate(new Date().getDate() + 2));

  const amanha = dataAmanha + "T00:00:00.000Z"
  const depoisAmanha = dataDepoisAmanha + "T00:00:00.000Z"

  const quantidadeAmanha = agendados.filter((item) => {
    return item.agenda_data === amanha
  })

  const quantidadeDepoisAmanha = agendados.filter((item) => {
    return item.agenda_data === depoisAmanha
  })


  const cardList = [
    { name: 'Nº de Agendados para Amanhã ', amount: quantidadeAmanha.length + ' - Pacientes', icon: 'folder_shared' },
    { name: 'Nº de Agendados para Depois de Amanhã', amount: quantidadeDepoisAmanha.length + ' - Pacientes', icon: 'folder_shared' },
    { name: 'Nº Restante de Pacientes Agendados', amount: agendados.length + ' - Pacientes', icon: 'folder_shared' },
    { name: 'Nº de Pacientes Cadastrados', amount: paciente.length + ' - Pacientes', icon: 'folder_shared' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
