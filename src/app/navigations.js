export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  { label: 'Agendamento', type: 'label' },
  {
    name: 'Agendamento',
    icon: 'event_available',
    children: [
      { name: 'Agendar', iconText: 'A', path: '/agendamento/cadastrar-agendamento' },
      { name: 'Listar Agendamentos', iconText: 'L', path: '/agendamento/listar-agendamento' },
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
  { label: 'Hospital', type: 'label' },
  {
    name: 'Hospital',
    icon: 'local_hospital',
    children: [
      { name: 'Cadastrar', iconText: 'A', path: '/hospital/cadastrar-hospital' },
      { name: 'Listar', iconText: 'B', path: '/hospital/listar-hospital' },
    ],
  },
  { label: 'Components', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  },
  {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/',
  },
];
