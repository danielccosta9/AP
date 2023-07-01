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
    LinearProgress,
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
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [agendados, setAgendados] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        setIsLoading(true);
        Axios.get("https://api-paciente.cyclic.app/agenda")
            .then((response) => {
                setAgendados(response.data);
                setIsLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        setIsLoading(true);
        Axios.delete(`https://api-paciente.cyclic.app/agenda/${id}`)
            .then(() => {
                const filtered = agendados.filter((agenda) => agenda.agenda_id !== id);
                setAgendados(filtered);
                setIsLoading(false);
            })
    };



    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const agenda = useMemo(() => {
        setIsLoading(true);
        let agendaFiltrada = agendados.filter((agendado) => {
            return agendado.paciente_nome.toLowerCase().includes(busca.toLowerCase())
        })
        setIsLoading(false);
        return agendaFiltrada;
    }, [agendados, busca])

    return (
        <>
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) || (
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
                                    <TableCell align="left" width={100}>Data</TableCell>
                                    <TableCell align="left" width={350}>Nome do Paciente</TableCell>
                                    <TableCell align="center" width={120}>CPF</TableCell>
                                    <TableCell align="center" width={120}>Telefone</TableCell>
                                    <TableCell align="left" width={80}>Saída</TableCell>
                                    <TableCell align="left" width={80}>Marcado</TableCell>
                                    <TableCell align="center" width={350}>Nome do Hospital</TableCell>
                                    <TableCell align="right" width={80}>Carro</TableCell>
                                    <TableCell align="right" width={80}>Viajou</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agenda
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    // eslint-disable-next-line array-callback-return
                                    .map((agenda) => {
                                        if (agenda.agenda_status === 'AGENDADO') {
                                            return (
                                                <TableRow key={agenda.id} hover>
                                                    <TableCell align="left">
                                                        {
                                                            new Intl.DateTimeFormat('pt-BR', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: '2-digit',
                                                            }).format(new Date(agenda.agenda_data).getTime() + 24 * 60 * 60 * 1000)
                                                        }
                                                    </TableCell>
                                                    <TableCell align="left">{agenda.paciente_nome}</TableCell>
                                                    <TableCell align="center">{agenda.paciente_cpf}</TableCell>
                                                    <TableCell align="center">{agenda.paciente_telefone}</TableCell>
                                                    <TableCell align="left">{agenda.agenda_saida}</TableCell>
                                                    <TableCell align="left">{agenda.agenda_marcado}</TableCell>
                                                    <TableCell align="left">{agenda.hospital_nome}</TableCell>
                                                    <TableCell align="right">{agenda.agenda_carro}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton
                                                            onClick={handleDelete.bind(this, agenda.agenda_id || agenda.auto_id)}
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
                )}
        </>
    );
};

export default PaginationTable;