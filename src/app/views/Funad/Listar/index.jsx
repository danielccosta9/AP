import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./table";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const AppTable = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Paciente FUNAD", path: "/funad/listar-paciente-funad" }, { name: "Listar FUNAD" }]} />
            </Box>

            <SimpleCard title="Lista de Pacientes da FUNAD">
                <PaginationTable />
            </SimpleCard>
        </Container>
    );
};

export default AppTable;
