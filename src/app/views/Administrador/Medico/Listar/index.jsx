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
                <Breadcrumb routeSegments={[{ name: "Médico", path: "/administrador/listar-medico" }, { name: "Listar" }]} />
            </Box>

            <SimpleCard title="Lista De Médicos Cadastrados">
                <PaginationTable />
            </SimpleCard>
        </Container>
    );
};

export default AppTable;
