import React, { useState, useEffect, useCallback } from "react";
import api from '../service/api';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Grid,
    Modal,
    Typography,
    TextField,
    Button,
    InputAdornment
} from '@material-ui/core';
import {
    TableSortLabel,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import LoadingOverlay from './LoadingOverlay';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

function ProcessManagement() {
    const [processos, setProcessos] = useState([]);
    const [orderBy, setOrderBy] = useState('num_processo_sei');
    const [order, setOrder] = useState('asc');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messagem, setMessagem] = useState('');
    const [reload, setReload] = useState(true);
    const [showObservationModal, setShowObservationModal] = useState(false);
    const [selectedObservation, setSelectedObservation] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    const handleSort = (columnName) => {
        if (orderBy === columnName) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnName);
            setOrder('asc');
        }
    };

    const sortedAndFilteredProcess = processos
        .filter((processo) =>
            processo.num_processo_sei.includes(searchTerm) ||
            processo.advogado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            processo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const isAsc = order === 'asc';
            if (orderBy === 'num_processo_sei') {
                return (isAsc ? 1 : -1) * (a.num_processo_sei.localeCompare(b.num_processo_sei));
            } else if (orderBy === 'advogado') {
                return (isAsc ? 1 : -1) * (a.advogado.nome.localeCompare(b.advogado.nome));
            } else if (orderBy === 'cliente') {
                return (isAsc ? 1 : -1) * (a.cliente.nome.localeCompare(b.cliente.nome));
            } else {
                return 0;
            }
        });

    const handleError = useCallback((error) => {
        setIsLoading(false);
        setShowSnackbar(true);
        setMessagem((error?.response?.data?.message || error?.response?.data?.errors) || 'Ocorreu um erro ao realizar a ação');
        if (error?.response?.status === 500) {
            localStorage.removeItem('token');
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }
    }, [navigate]);

    useEffect(() => {
        if (reload) {
            setReload(false);
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/process", config)
                .then((response) => {
                    setProcessos(response.data.process);
                    setIsLoading(false);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    return (
        <div
            style={{
                maxWidth: '85%',
                margin: '0 auto',
                marginTop: '10px'
            }}
        >
            {isLoading && <LoadingOverlay />}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={10000}
                onClose={() => setShowSnackbar(false)}
                message={messagem}
                severity="error"
                style={{ zIndex: 9999 }}
            />
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <h1>Lista de Processos</h1>
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Inserir Processo
                    </Button>
                </Grid>
            </Grid>
            <TableContainer style={{ marginTop: '10px' }} component={Paper} className="custom-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'num_processo_sei'}
                                    direction={orderBy === 'num_processo_sei' ? order : 'asc'}
                                    onClick={() => handleSort('num_processo_sei')}
                                >
                                    Número do Processo SEI
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'advogado'}
                                    direction={orderBy === 'advogado' ? order : 'asc'}
                                    onClick={() => handleSort('advogado')}
                                >
                                    Advogado
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'cliente'}
                                    direction={orderBy === 'cliente' ? order : 'asc'}
                                    onClick={() => handleSort('cliente')}
                                >
                                    Cliente
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                Observação
                            </TableCell>
                            {/* <TableCell>
                                Ações
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAndFilteredProcess.map((processo) => (
                            <TableRow key={processo.id_processo}>
                                <TableCell>{processo.num_processo_sei}</TableCell>
                                <TableCell>{processo.advogado.nome}</TableCell>
                                <TableCell>{processo.cliente.nome}</TableCell>
                                <TableCell>{processo.status.descricao}</TableCell>
                                <TableCell>
                                    <Typography style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => {
                                        setSelectedObservation(processo.observacao);
                                        setShowObservationModal(true);
                                    }}>Leia mais</Typography>
                                </TableCell>
                                {/* <TableCell>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={showObservationModal}
                onClose={() => setShowObservationModal(false)}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        borderRadius: '4px',
                    }}
                >
                    <Typography variant="h6" style={{ marginTop: '5px', marginBottom: '25px' }}>Observação: </Typography>
                    <Typography>{selectedObservation}</Typography>
                    <div style={{ textAlign: 'right', marginTop: '15px' }}>
                        <Button variant="outlined" onClick={() => setShowObservationModal(false)} style={{ marginRight: '10px' }}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ProcessManagement;
