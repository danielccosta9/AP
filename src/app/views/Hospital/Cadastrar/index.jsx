import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./form";
import StepperForm from "./instrucao";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Hospital", path: "/hospital/cadastrar-hospital" }, { name: "Cadastrar" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Cadastrar Hospital">
          <SimpleForm />
        </SimpleCard>

        <SimpleCard title="Passo a passo">
          <StepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
