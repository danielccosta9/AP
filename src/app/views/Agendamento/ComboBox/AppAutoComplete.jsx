import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import AutocompleteCombo from './AutocompleteCombo';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppAutoComplete = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Agendamento", path: "/agendamento/combo-box" }, { name: "Combo Box" }]} />
      </Box>

      <SimpleCard title="Combo Box">
        <AutocompleteCombo />
      </SimpleCard>

    </Container>
  );
};

export default AppAutoComplete;
