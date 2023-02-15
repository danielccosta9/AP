import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

// Agendamento
// Caminho Cadastrar Agendamento
const AppFormCadAgendamento = Loadable(lazy(() => import('../Agendamento/Cadastrar/index')));
// Caminho Listar Agendamento
const AppListAgendamento = Loadable(lazy(() => import('../Agendamento/Listar/index')));

// Paciente
// Caminho Cadastrar Pacientes
const AppFormCadPaciente = Loadable(lazy(() => import('../Paciente/Cadastrar/index')));
// Caminho Listar Pacientes
const AppListPaciente = Loadable(lazy(() => import('../Paciente/Listar/index')));

// Hospital
// Caminho Cadastrar Hospital
const AppFormCadHospital = Loadable(lazy(() => import('../Hospital/Cadastrar/index')));
// Caminho Listar Hospital
const AppListHospital = Loadable(lazy(() => import('../Hospital/Listar/index')));

const materialRoutes = [
  // Agendamento
  {
    path: '/agendamento/cadastrar-agendamento',
    element: <AppFormCadAgendamento />,
  },
  {
    path: '/agendamento/listar-agendamento',
    element: <AppListAgendamento />,
  },

  // Paciente
  {
    path: '/paciente/cadastrar-paciente',
    element: <AppFormCadPaciente />
  },
  {
    path: '/paciente/listar-paciente',
    element: <AppListPaciente />
  },

  // Hospital
  {
    path: '/hospital/cadastrar-hospital',
    element: <AppFormCadHospital />
  },
  {
    path: '/hospital/listar-hospital',
    element: <AppListHospital />
  },
];

export default materialRoutes;
