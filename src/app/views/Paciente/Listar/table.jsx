import Axios from 'axios';
import { useState, useEffect } from "react";

import {
    Box,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

const PaginationTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paciente, setPaciente] = useState([]);
    const baseURL = "https://api-node-paciente-postgres.herokuapp.com/paciente";

    useEffect(() => {
        Axios.get(baseURL)
            .then(json => setPaciente(json.data))
    }, [])

    const quantidadePaciente = paciente;


    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nº</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Nascimento</TableCell>
                        <TableCell align="center">Telefone</TableCell>
                        <TableCell align="right">Residência</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paciente
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((subscriber, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="left">{subscriber.paciente_id}</TableCell>
                                <TableCell align="left">{subscriber.paciente_nome}</TableCell>
                                <TableCell align="center">{subscriber.paciente_cpf}</TableCell>
                                <TableCell align="center">{subscriber.paciente_nascimento}</TableCell>
                                <TableCell align="center">{subscriber.paciente_telefone}</TableCell>
                                <TableCell align="right">{subscriber.paciente_residencia}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={quantidadePaciente.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
        </Box>
    );
};

export default PaginationTable;
