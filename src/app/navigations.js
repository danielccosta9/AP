export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  { label: 'Agendamento', type: 'label' },
  {
    name: 'Agendamento',
    icon: 'event_available',
    children: [
      { name: 'Agendar', iconText: 'A', path: '/agendamento/cadastrar-agendamento' },
      { name: 'Lista de Agendados', iconText: 'L', path: '/agendamento/listar-agendamento' },
    ],
  },
  { label: 'Paciente', type: 'label' },
  {
    name: 'Paciente',
    icon: 'accessible',
    children: [
      { name: 'Cadastrar', iconText: 'C', path: '/paciente/cadastrar-paciente' },
      { name: 'Listar', iconText: 'L', path: '/paciente/listar-paciente' },
    ],
  },
  // { label: 'FUNAD', type: 'label' },
  // {
  //   name: 'FUNAD',
  //   icon: 'accessible',
  //   children: [
  //     { name: 'Cadastrar', iconText: 'C', path: '/funad/cadastrar-paciente-funad' },
  //     { name: 'Listar', iconText: 'L', path: '/funad/listar-paciente-funad' },
  //   ],
  // },
  { label: 'Hospital', type: 'label' },
  {
    name: 'Hospital',
    icon: 'local_hospital',
    children: [
      { name: 'Cadastrar', iconText: 'A', path: '/hospital/cadastrar-hospital' },
      { name: 'Listar', iconText: 'B', path: '/hospital/listar-hospital' },
    ],
  },
];
