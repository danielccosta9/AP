import Axios from 'axios';
import { useState, useEffect, useMemo } from "react";

import {
    Box,
    IconButton,
    Icon,
    Input,
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
    const baseURL = "https://api-paciente.cyclic.app/agenda";
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [agendados, setAgendados] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        Axios.get(baseURL)
            .then(json => setAgendados(json.data))
    }, []);

    const handleDelete = (id) => {
        Axios.delete(`${baseURL}/${id}`)
            .then(() => {
                const newAgendados = agendados.filter((agendado) => agendado.id !== id);
                setAgendados(newAgendados);
            })
        alert("Viagem realizada com sucesso!");
        window.location.reload();
    };

    const agenda = agendados;


    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredPaciente = useMemo(() => {
        return agenda.filter((agenda) => {
            return agenda.paciente_nome.toLowerCase().includes(busca.toLowerCase());
        });
    }, [busca, agenda]);

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
                        <TableCell align="left">Data</TableCell>
                        <TableCell align="left">Nome do Paciente</TableCell>
                        <TableCell align="left">CPF</TableCell>
                        <TableCell align="left">Telefone</TableCell>
                        <TableCell align="left">Saída</TableCell>
                        <TableCell align="left">Marcado</TableCell>
                        <TableCell align="center">Nome do Hospital</TableCell>
                        <TableCell align="center">Carro</TableCell>
                        <TableCell align="right">Viajou</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPaciente
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        // eslint-disable-next-line array-callback-return
                        .map((agenda) => {
                            if (agenda.agenda_status === 'AGENDADO') {
                                return (
                                    <TableRow key={agenda.id} hover>
                                        <TableCell align="left">{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(agenda.agenda_data).getTime() + 24 * 60 * 60 * 1000)}</TableCell>
                                        <TableCell align="left">{agenda.paciente_nome}</TableCell>
                                        <TableCell align="left">{agenda.paciente_cpf}</TableCell>
                                        <TableCell align="left">{agenda.paciente_telefone}</TableCell>
                                        <TableCell align="left">{agenda.agenda_saida}</TableCell>
                                        <TableCell align="left">{agenda.agenda_marcado}</TableCell>
                                        <TableCell align="left">{agenda.hospital_nome}</TableCell>
                                        <TableCell align="center">{agenda.agenda_carro}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={handleDelete.bind(this, agenda.agenda_id)}
                                            >
                                                <Icon color="success">done</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                </TableBody>
            </StyledTable>
            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={agenda.length}
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