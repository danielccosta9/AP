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
  const [agendadosAuto, setAgendadosAuto] = useState([]);
  const baseURLPaciente = "https://api-paciente.cyclic.app/paciente";
  const baseURLAgendados = "https://api-paciente.cyclic.app/agenda";
  const baseURLAgendadosAuto = "https://api-paciente.cyclic.app/agendaauto";


  useEffect(() => {
    Axios.get(baseURLPaciente)
      .then(json => setPaciente(json.data))
  }, [])

  useEffect(() => {
    Axios.get(baseURLAgendados)
      .then(json => setAgendados(json.data))
  }, [])

  useEffect(() => {
    Axios.get(baseURLAgendadosAuto)
      .then(json => setAgendadosAuto(json.data))
  }, [])

  const agenda = agendados.concat(agendadosAuto)

  // Formatar a data
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const arrayOfWeek = [
    formatDate(new Date().setDate(new Date().getDate() + 1)) + "T00:00:00.000Z",
    formatDate(new Date().setDate(new Date().getDate() + 2)) + "T00:00:00.000Z",
    formatDate(new Date().setDate(new Date().getDate() + 3)) + "T00:00:00.000Z",
    formatDate(new Date().setDate(new Date().getDate() + 4)) + "T00:00:00.000Z",
    formatDate(new Date().setDate(new Date().getDate() + 5)) + "T00:00:00.000Z",
    formatDate(new Date().setDate(new Date().getDate() + 6)) + "T00:00:00.000Z",
  ]

  // Quantidade de pacientes agendados por dia

  const qtdForDay = [
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[0]
    }),
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[1]
    }),
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[2]
    }),
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[3]
    }),
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[4]
    }),
    agenda.filter((item) => {
      return item.agenda_data === arrayOfWeek[5]
    }),
  ]

  // Por dia - Manhã ou Tarde e Total
  const qtdForDayAndTime = [
    qtdForDay[0].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[0].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[0].filter((item) => {
      return item.agenda_saida
    }).length,

    qtdForDay[1].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[1].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[1].filter((item) => {
      return item.agenda_saida
    }).length,

    qtdForDay[2].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[2].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[2].filter((item) => {
      return item.agenda_saida
    }).length,

    qtdForDay[3].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[3].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[3].filter((item) => {
      return item.agenda_saida
    }).length,

    qtdForDay[4].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[4].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[4].filter((item) => {
      return item.agenda_saida
    }).length,

    qtdForDay[5].filter((item) => {
      return item.agenda_saida < '11:00'
    }).length,
    qtdForDay[5].filter((item) => {
      return item.agenda_saida >= '11:00'
    }).length,
    qtdForDay[5].filter((item) => {
      return item.agenda_saida
    }).length,
  ]

  // Dias da semana inclementando
  const dayOfWeekArray = [
    new Date().getDay() + 1,
    new Date().getDay() + 2,
    new Date().getDay() + 3,
    new Date().getDay() + 4,
    new Date().getDay() + 5,
    new Date().getDay() + 6,
  ]

  // eslint-disable-next-line no-array-constructor
  const diasDaSemanaTexto = new Array(
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  );

  // Retornando os valores em texto
  const dayOfWeekInTextArray = [
    diasDaSemanaTexto[dayOfWeekArray[0] % 7],
    diasDaSemanaTexto[dayOfWeekArray[1] % 7],
    diasDaSemanaTexto[dayOfWeekArray[2] % 7],
    diasDaSemanaTexto[dayOfWeekArray[3] % 7],
    diasDaSemanaTexto[dayOfWeekArray[4] % 7],
    diasDaSemanaTexto[dayOfWeekArray[5] % 7],
  ]

  const cardList = [
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[0]} `,
      amount: `
        ${qtdForDayAndTime[0] === 0 && qtdForDayAndTime[1] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[0]}`
          : `
          ( ${qtdForDayAndTime[0]} - Manhã )
          ( ${qtdForDayAndTime[1]} - Tarde )
          ( ${qtdForDayAndTime[2]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[1]} `,
      amount: `
        ${qtdForDayAndTime[3] === 0 && qtdForDayAndTime[4] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[1]}`
          : `
          ( ${qtdForDayAndTime[3]} - Manhã )
          ( ${qtdForDayAndTime[4]} - Tarde )
          ( ${qtdForDayAndTime[5]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[2]} `,
      amount: `
        ${qtdForDayAndTime[6] === 0 && qtdForDayAndTime[7] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[2]}`
          : `
          ( ${qtdForDayAndTime[6]} - Manhã )
          ( ${qtdForDayAndTime[7]} - Tarde )
          ( ${qtdForDayAndTime[8]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[3]} `,
      amount: `
        ${qtdForDayAndTime[9] === 0 && qtdForDayAndTime[10] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[3]}`
          : `
          ( ${qtdForDayAndTime[9]} - Manhã )
          ( ${qtdForDayAndTime[10]} - Tarde )
          ( ${qtdForDayAndTime[11]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[4]} `,
      amount: `
        ${qtdForDayAndTime[12] === 0 && qtdForDayAndTime[13] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[4]}`
          : `
          ( ${qtdForDayAndTime[12]} - Manhã )
          ( ${qtdForDayAndTime[13]} - Tarde )
          ( ${qtdForDayAndTime[14]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: `Nº de Agendados para ${dayOfWeekInTextArray[5]} `,
      amount: `
        ${qtdForDayAndTime[15] === 0 && qtdForDayAndTime[16] === 0
          ? `Não há agendados para ${dayOfWeekInTextArray[5]}`
          : `
          ( ${qtdForDayAndTime[15]} - Manhã )
          ( ${qtdForDayAndTime[16]} - Tarde )
          ( ${qtdForDayAndTime[17]} - Total )`
        }`,
      icon: 'folder_shared'
    },
    {
      name: 'Nº de Pacientes Agendados',
      amount: agenda.length + ' - Pacientes',
      icon: 'folder_shared'
    },
    {
      name: 'Nº de Pacientes Cadastrados',
      amount: paciente.length + ' - Pacientes',
      icon: 'folder_shared'
    },
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
