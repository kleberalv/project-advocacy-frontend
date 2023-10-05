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
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { Edit, Delete } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import LoadingOverlay from './LoadingOverlay';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

function ProcessManagement() {
    const [processos, setProcessos] = useState([]);
    const [orderBy, setOrderBy] = useState('num_processo_sei');
    const [order, setOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messagem, setMessagem] = useState('');
    const [reload, setReload] = useState(true);
    const [showObservationModal, setShowObservationModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedObservation, setSelectedObservation] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [lawyers, setLawyers] = useState([]);
    const [clients, setClients] = useState([]);
    const [statusProcess, setStatusProcess] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [processIdToDelete, setProcessIdToDelete] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const validateForm = () => {
        let errors = {};

        if (!formValues.id_advogado) {
            errors.id_advogado = 'Selecione o advogado encarregado';
        }

        if (!formValues.id_cliente) {
            errors.id_cliente = 'Informe o cliente do processo';
        }

        if (!formValues.id_status) {
            errors.id_status = 'Selecione o status do processo';
        }

        if (!formValues.num_processo_sei) {
            errors.num_processo_sei = 'Informe o número do processo SEI';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleOpenModal = () => {
        setFormValues({
            id_processo: '',
            id_advogado: '',
            id_cliente: '',
            num_processo_sei: '',
            id_status: '',
            observacao: '',
        });

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenConfirmationModal = (ProcessId) => {
        setProcessIdToDelete(ProcessId);
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setProcessIdToDelete(null);
    };

    const handleEditProcess = (processId) => {
        const process = sortedAndFilteredProcess.find((process) => process.id_processo === processId);
        if (process) {
            setFormValues({
                id_processo: process.id_processo,
                id_advogado: process.id_advogado,
                id_cliente: process.id_cliente,
                num_processo_sei: process.num_processo_sei,
                id_status: process.id_status,
                observacao: process.observacao,
            });
            setShowModal(true);
        }
    };

    const HandleChangeForm = (atributo, valor) => {
        setFormValues({
            ...formValues,
            [atributo]: valor
        })
    }

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
        if (error?.response?.status === 500 || error?.response?.status === 401) {
            localStorage.removeItem('token');
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }
    }, [navigate]);

    useEffect(() => {
        try {
            const user = localStorage.getItem('user');
            const userProfile = JSON.parse(user);
            setUserProfile(userProfile.id_perfil);
        } catch (error) {
            setIsLoading(false);
            setShowSnackbar(true);
            setMessagem('Ocorreu um erro ao consultar o perfil de usuário. Por favor, tente novamente mais tarde');
            if (error?.response?.status === 500) {
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }
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

    useEffect(() => {
        if (reload) {
            setReload(false);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/lawyer", config)
                .then((response) => {
                    setLawyers(response.data.lawyer);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    useEffect(() => {
        if (reload) {
            setReload(false);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/client", config)
                .then((response) => {
                    setClients(response.data.client);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    useEffect(() => {
        if (reload) {
            setReload(false);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/status", config)
                .then((response) => {
                    setStatusProcess(response.data.status);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    const handleSaveProcess = () => {
        if (validateForm()) {
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const requestMethod = formValues?.id_processo ? 'put' : 'post';
            const apiUrl = requestMethod === 'put' ? `/process/${formValues.id_processo}` : '/process';
            api[requestMethod](apiUrl, formValues, config)
                .then((response) => {
                    setReload(true);
                    setShowModal(false);
                    setShowSnackbar(true);
                    setMessagem(response?.data?.message);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    };

    const handleDeleteProcess = () => {
        setIsLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            data: { id_processo: processIdToDelete }
        };
        api.delete(`/process/${processIdToDelete}`, config)
            .then((response) => {
                setReload(true);
                setShowModal(false);
                setShowConfirmationModal(false);
                setShowSnackbar(true);
                setMessagem(response?.data?.message);
                setIsLoading(false);
            })
            .catch((error) => {
                handleError(error);
            });
    };

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
                {userProfile !== 3 &&
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
                            Inserir Processo
                        </Button>
                    </Grid>
                }
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
                            {userProfile !== 3 &&
                                <TableCell>
                                    Ações
                                </TableCell>
                            }
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
                                {userProfile !== 3 &&
                                    <TableCell>
                                        <Button onClick={() => handleEditProcess(processo.id_processo)} style={{ color: '#007bff' }}>
                                            <Edit />
                                        </Button>
                                        <Button onClick={() => handleOpenConfirmationModal(processo.id_processo)} style={{ color: '#dc3545' }}>
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={showModal} onClose={handleCloseModal}>
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
                    <Typography variant="h6" component="h2">
                        {!formValues?.id_processo ? 'Criar novo processo' : 'Editar processo'}
                    </Typography>
                    <form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="numero_processo_sei"
                            label="Número Processo SEI"
                            name="numero_processo_sei"
                            autoComplete="numero_processo_sei"
                            autoFocus
                            value={formValues?.num_processo_sei}
                            onChange={(e) => HandleChangeForm('num_processo_sei', e.target.value)}
                            error={!!formErrors.num_processo_sei}
                            helperText={formErrors.num_processo_sei}
                            inputProps={{ maxLength: 40 }}
                        />
                        <FormControl style={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="tipo-perfil-advogado-label">Advogado encarregado</InputLabel>
                            <Select
                                labelId="tipo-perfil-advogado-label"
                                onMouseDown={(e) => e.preventDefault()}
                                id="tipo-perfil-advogado"
                                value={formValues?.id_advogado}
                                onChange={(e) => HandleChangeForm('id_advogado', e.target.value)}
                                error={!!formErrors.id_advogado}
                            >
                                <MenuItem value="">Selecione o advogado encarregado</MenuItem>
                                {lawyers.map((advogado) => (
                                    <MenuItem key={advogado.id_usuario} value={advogado.id_usuario}>
                                        {advogado.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="tipo-perfil-cliente-label">Cliente</InputLabel>
                            <Select
                                labelId="tipo-perfil-cliente-label"
                                onMouseDown={(e) => e.preventDefault()}
                                id="tipo-perfil-cliente"
                                value={formValues?.id_cliente}
                                onChange={(e) => HandleChangeForm('id_cliente', e.target.value)}
                                error={!!formErrors.id_cliente}
                            >
                                <MenuItem value="">Selecione o cliente</MenuItem>
                                {clients.map((clientes) => (
                                    <MenuItem key={clientes.id_usuario} value={clientes.id_usuario}>
                                        {clientes.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="tipo-perfil-status-label">Status</InputLabel>
                            <Select
                                labelId="tipo-perfil-status-label"
                                onMouseDown={(e) => e.preventDefault()}
                                id="tipo-perfil-status"
                                value={formValues?.id_status}
                                onChange={(e) => HandleChangeForm('id_status', e.target.value)}
                                error={!!formErrors.id_status}
                            >
                                <MenuItem value="">Selecione o status do processo</MenuItem>
                                {statusProcess.map((status) => (
                                    <MenuItem key={status.id_status} value={status.id_status}>
                                        {status.status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            id="observacao"
                            label="Observação"
                            name="observacao"
                            autoComplete="observacao"
                            value={formValues?.observacao}
                            onChange={(e) => HandleChangeForm('observacao', e.target.value)}
                            inputProps={{ maxLength: 255 }}
                            multiline minRows={4}
                        />
                        <Button variant="contained" color="primary" onClick={handleSaveProcess}>
                            Salvar
                        </Button>
                    </form>
                </div>
            </Modal>

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
                    <Typography>{selectedObservation ?? 'Não há observações'}</Typography>
                    <div style={{ textAlign: 'right', marginTop: '15px' }}>
                        <Button variant="outlined" onClick={() => setShowObservationModal(false)} style={{ marginRight: '10px' }}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={showConfirmationModal}
                onClose={handleCloseConfirmationModal}
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
                    <Typography variant="h6" component="h2">
                        Confirmar Exclusão
                    </Typography>
                    <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
                        Tem certeza que deseja excluir este processo?
                    </Typography>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={handleCloseConfirmationModal} style={{ marginRight: '10px' }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleDeleteProcess}>
                            Excluir
                        </Button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default ProcessManagement;
