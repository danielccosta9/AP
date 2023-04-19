import Axios from 'axios';
import { useState, useEffect, useMemo } from "react";

import {
    Box,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Input,
    IconButton,
    Icon,
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
    const baseURLPaciente = "https://api-paciente.cyclic.app/paciente";
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paciente, setPaciente] = useState([]);
    const [busca, setBusca] = useState('');


    useEffect(() => {
        Axios.get(baseURLPaciente)
            .then(json => setPaciente(json.data))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente excluir este paciente?")) {
            Axios.delete(`${baseURLPaciente}/${id}`)
                .then(() => {
                    const filtered = paciente.filter((paciente) => paciente.paciente_id !== id);
                    setPaciente(filtered);
                })
        }
    };

    const quantidadePaciente = paciente;


    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredPaciente = useMemo(() => {
        return paciente.filter((paciente) => {
            return paciente.paciente_nome.toLowerCase().includes(busca.toLowerCase());
        });
    }, [busca, paciente]);

    return (
        <Box width="100%" overflow="auto">
            <form>
                <Input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={busca}
                    sx={{ width: 300, marginBottom: '20px', marginTop: '20px' }}
                    onChange={(e) => setBusca(e.target.value)}
                    icon="search"
                />
            </form>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" width={350}>Nome do Paciente</TableCell>
                        <TableCell align="center" width={120}>CPF</TableCell>
                        <TableCell align="center" width={120}>Nascimento</TableCell>
                        <TableCell align="center" width={120}>Telefone</TableCell>
                        <TableCell align="left" width={200}>Residência</TableCell>
                        <TableCell align="right" width={80}>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPaciente
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((paciente, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="left">{paciente.paciente_nome}</TableCell>
                                <TableCell align="center">{paciente.paciente_cpf}</TableCell>
                                <TableCell align="center">{paciente.paciente_nascimento}</TableCell>
                                <TableCell align="center">{paciente.paciente_telefone}</TableCell>
                                <TableCell align="left">{paciente.paciente_residencia}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={handleDelete.bind(this, paciente.paciente_id)}
                                    >
                                        <Icon color="error">delete</Icon>
                                    </IconButton>
                                </TableCell>
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