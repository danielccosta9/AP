import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

// Administrador
// Cadastrar Enfermeiro ADM
const AppFormCadEfermeira = Loadable(lazy(() => import('../Administrador/Enfermeiro/Cadastrar/index')));
// Listar PacienEnfermeirote ADM
const AppListEfermeira = Loadable(lazy(() => import('../Administrador/Enfermeiro/Listar/index')));
// Cadastrar Medico ADM
const AppFormCadMedico = Loadable(lazy(() => import('../Administrador/Medico/Cadastrar/index')));
// Listar Medico ADM
const AppListMedico = Loadable(lazy(() => import('../Administrador/Medico/Listar/index')));
// Cadastrar Recepcionista ADM
const AppFormCadRecepcionista = Loadable(lazy(() => import('../Administrador/Recepcionista/Cadastrar/index')));
// Listar Recepcionista ADM
const AppListRecepcionista = Loadable(lazy(() => import('../Administrador/Recepcionista/Listar/index')));


// Recepcionista
// Caminho Cadastrar Pacientes
const AppFormCadPaciente = Loadable(lazy(() => import('../Recepcionista/Paciente/Cadastrar/index')));
// Caminho Listar Pacientes
const AppListPaciente = Loadable(lazy(() => import('../Recepcionista/Paciente/Listar/index')));

const materialRoutes = [
  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },

  // Administrador
  {
    path: '/administrador/cadastrar-enfermeiro',
    element: <AppFormCadEfermeira />,
  },
  {
    path: '/administrador/listar-enfermeiro',
    element: <AppListEfermeira />,
  },
  {
    path: '/administrador/cadastrar-medico',
    element: <AppFormCadMedico />,
  },
  {
    path: '/administrador/listar-medico',
    element: <AppListMedico />,
  },
  {
    path: '/administrador/cadastrar-recepcionista',
    element: <AppFormCadRecepcionista />,
  },
  {
    path: '/administrador/listar-recepcionista',
    element: <AppListRecepcionista />,
  },


  // Recepcionista
  {
    path: '/recepcionista/cadastrar-paciente',
    element: <AppFormCadPaciente />
  },
  {
    path: '/recepcionista/listar-paciente',
    element: <AppListPaciente />
  }
];

export default materialRoutes;
