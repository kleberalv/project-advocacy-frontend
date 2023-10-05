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
    Button,
    Grid,
    Modal,
    Typography,
    TextField,
    InputAdornment
} from '@material-ui/core';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { TableSortLabel } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import LoadingOverlay from './LoadingOverlay';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@material-ui/icons/Search';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [orderBy, setOrderBy] = useState('nome');
    const [order, setOrder] = useState('asc');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messagem, setMessagem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [reload, setReload] = useState(true);
    const [idPerfil, setIdPerfil] = useState([]);
    const [idSexo, setIdSexo] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const validateForm = () => {
        let errors = {};

        if (!formValues.nome) {
            errors.nome = 'Nome é obrigatório.';
        }

        if (!formValues.cpf) {
            errors.cpf = 'CPF é obrigatório.';
        }

        if (!formValues.email) {
            errors.email = 'Email é obrigatório.';
        }

        if (!formValues.id_perfil) {
            errors.id_perfil = 'Selecione um tipo de perfil.';
        }

        if (!formValues.id_sexo) {
            errors.id_sexo = 'Selecione o sexo';
        }

        if (!formValues.dat_nasc) {
            errors.dat_nasc = 'Informe a data de nascimento.';
        }

        if (!formValues.endereco) {
            errors.endereco = 'Informe o endereço.';
        }

        const cpfPattern = /^(\d{3}\.){2}\d{3}-\d{2}$|^\d{11}$/;
        if (!cpfPattern.test(formValues.cpf)) {
            errors.cpf = 'CPF inválido. O formato deve ser XXX.XXX.XXX-XX.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formValues.email)) {
            errors.email = 'Email inválido.';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    function formatCPF(value) {
        // Remove tudo o que não é dígito
        value = value.replace(/\D/g, '');

        // Adiciona um ponto entre o terceiro e o quarto dígitos
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');

        // Adiciona um ponto entre o sexto e o sétimo dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2');

        // Adiciona um hífen depois do bloco de quatro dígitos
        value = value.replace(/(\d{3})(\d)/, '$1-$2');

        // Limita o tamanho máximo do campo em 14 caracteres
        return value.substr(0, 14);
    }

    const reFormatCPF = (value) => {
        // Remove tudo o que não é dígito

        if (value) {
            value = value.replace(/\D/g, '');

            // Adiciona os pontos e o hífen no CPF
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            return value;
        }

        return '';
    };

    const handleOpenModal = () => {
        setFormValues({
            id: '',
            nome: '',
            cpf: '',
            email: '',
            dat_nasc: '',
            id_perfil: '',
            id_sexo: '',
            endereco: '',
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenConfirmationModal = (userId) => {
        setUserIdToDelete(userId);
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setUserIdToDelete(null);
    };

    const handleEditUser = (userId) => {
        const user = sortedAndFilteredUsers.find((user) => user.id_usuario === userId);

        if (user) {
            setFormValues({
                id: user.id_usuario,
                nome: user.nome,
                cpf: user.cpf,
                email: user.email,
                dat_nasc: user.dat_nasc,
                id_perfil: user.id_perfil,
                id_sexo: user.id_sexo,
                endereco: user.endereco,
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

    const sortedAndFilteredUsers = users
        .filter((user) =>
            user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const isAsc = order === 'asc';
            if (orderBy === 'nome') {
                return a.nome.localeCompare(b.nome) * (isAsc ? 1 : -1);
            } else if (orderBy === 'cpf') {
                return a.cpf.localeCompare(b.cpf) * (isAsc ? 1 : -1);
            } else if (orderBy === 'email') {
                return a.email.localeCompare(b.email) * (isAsc ? 1 : -1);
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
        if (reload) {
            setReload(false);
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/users", config)
                .then((response) => {
                    setUsers(response.data.users);
                    setIsLoading(false);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    useEffect(() => {
        if (reload) {
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/profiles", config)
                .then((response) => {
                    setIdPerfil(response.data.profiles);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    useEffect(() => {
        if (reload) {
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/sexos", config)
                .then((response) => {
                    setIdSexo(response.data.sexos);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    const handleSaveUser = () => {
        if (validateForm()) {
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const requestMethod = formValues?.id ? 'put' : 'post';
            const apiUrl = requestMethod === 'put' ? `/users/${formValues.id}` : '/users';
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

    const handleDeleteUser = () => {
        setIsLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            data: { id_usuario: userIdToDelete }
        };
        api.delete(`/users/${userIdToDelete}`, config)
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
                    <h1>Lista de usuários</h1>
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
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
                        Criar Usuário
                    </Button>
                </Grid>
            </Grid>
            <TableContainer style={{ marginTop: '10px' }} component={Paper} className="custom-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'nome'}
                                    direction={orderBy === 'nome' ? order : 'asc'}
                                    onClick={() => handleSort('nome')}
                                >
                                    Nome
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'cpf'}
                                    direction={orderBy === 'cpf' ? order : 'asc'}
                                    onClick={() => handleSort('cpf')}
                                >
                                    CPF
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleSort('email')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAndFilteredUsers.map((user) => (
                            <TableRow key={user.id_usuario}>
                                <TableCell>{user.nome}</TableCell>
                                <TableCell>{formatCPF(user.cpf)}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>

                                    <Button onClick={() => handleEditUser(user.id_usuario)} style={{ color: '#007bff' }}>
                                        <Edit />
                                    </Button>
                                    <Button onClick={() => handleOpenConfirmationModal(user.id_usuario)} style={{ color: '#dc3545' }}>
                                        <Delete />
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de criação de usuário */}
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
                        {!formValues?.id ? 'Criar novo usuário' : 'Editar Usuário'}
                    </Typography>
                    <form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            value={formValues?.nome}
                            onChange={(e) => HandleChangeForm('nome', e.target.value)}
                            error={!!formErrors.nome}
                            helperText={formErrors.nome}
                            inputProps={{ maxLength: 40 }}
                        />
                        <FormControl style={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="tipo-sexo-label">Sexo</InputLabel>
                            <Select
                                labelId="tipo-sexo-label"
                                onMouseDown={(e) => e.preventDefault()}
                                id="tipo-sexo"
                                value={formValues?.id_sexo}
                                onChange={(e) => HandleChangeForm('id_sexo', e.target.value)}
                                error={!!formErrors.id_sexo}
                            >
                                <MenuItem value="">Selecione o sexo</MenuItem>
                                {idSexo.map((sexo) => (
                                    <MenuItem key={sexo.id_sexo} value={sexo.id_sexo}>
                                        {sexo.nome_sexo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="cpf"
                            label="CPF"
                            name="cpf"
                            autoComplete="cpf"
                            value={reFormatCPF(formValues?.cpf)}
                            onChange={(e) => HandleChangeForm('cpf', formatCPF(e.target.value))}
                            error={!!formErrors.cpf}
                            helperText={formErrors.cpf}
                            inputProps={{ maxLength: 14 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            value={formValues?.email}
                            onChange={(e) => HandleChangeForm('email', e.target.value)}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="dat_nasc"
                            label="Data de Nascimento"
                            name="dat_nasc"
                            type="date"
                            autoComplete="bday"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formValues?.dat_nasc}
                            onChange={(e) => HandleChangeForm('dat_nasc', e.target.value)}
                            error={!!formErrors.dat_nasc}
                            helperText={formErrors.dat_nasc}
                        />

                        <FormControl style={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="tipo-perfil-label">Tipo de Perfil</InputLabel>
                            <Select
                                labelId="tipo-perfil-label"
                                onMouseDown={(e) => e.preventDefault()}
                                id="tipo-perfil"
                                value={formValues?.id_perfil}
                                onChange={(e) => HandleChangeForm('id_perfil', e.target.value)}
                                error={!!formErrors.id_perfil}
                            >
                                <MenuItem value="">Selecione o tipo de perfil</MenuItem>
                                {idPerfil.map((perfil) => (
                                    <MenuItem key={perfil.id_tipo_perfil} value={perfil.id_tipo_perfil}>
                                        {perfil.nome_perfil}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="endereco"
                            label="Endereço"
                            name="endereco"
                            autoComplete="address"
                            value={formValues?.endereco}
                            onChange={(e) => HandleChangeForm('endereco', e.target.value)}
                            error={!!formErrors.endereco}
                            helperText={formErrors.endereco}
                        />

                        <Button variant="contained" color="primary" onClick={handleSaveUser}>
                            Salvar
                        </Button>
                    </form>
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
                        Tem certeza que deseja excluir este usuário?
                    </Typography>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={handleCloseConfirmationModal} style={{ marginRight: '10px' }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleDeleteUser}>
                            Excluir
                        </Button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default UserManagement;