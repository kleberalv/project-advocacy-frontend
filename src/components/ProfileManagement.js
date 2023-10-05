import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import api from '../service/api';
import Snackbar from '@mui/material/Snackbar';
import { Visibility, VisibilityOff, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import men1 from '../images/men1.png';
import men2 from '../images/men2.png';
import woman1 from '../images/woman1.png';
import woman2 from '../images/woman2.png';
import agenero from '../images/agenero.png';
import naobinario from '../images/nonbinary.png';
import defaultUser from '../images/defaultuser.png';


function ProfileManagement() {
    const [reload, setReload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [messagem, setMessagem] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [showSenha, setShowSenha] = useState(false);
    const [originalCpf, setOriginalCpf] = useState('');
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
    const [idSexo, setIdSexo] = useState([]);
    const [formValues, setFormValues] = useState({
        id: '',
        nome: '',
        cpf: '',
        id_sexo: '',
        email: '',
        dat_nasc: '',
        endereco: '',
        senha: '',
        confirmarSenha: ''
    });


    const handleMostrarsenha = () => {
        setShowSenha(!showSenha);
    };
    const handleMostrarConfirmarSenha = () => {
        setShowConfirmarSenha(!showConfirmarSenha);
    };

    const validateForm = () => {
        let errors = {};

        if (!formValues.nome) {
            errors.nome = 'Nome é obrigatório.';
        }

        if (!formValues.cpf) {
            errors.cpf = 'CPF é obrigatório.';
        }

        if (!formValues.id_sexo) {
            errors.id_sexo = 'Selecione o sexo';
        }

        if (!formValues.email) {
            errors.email = 'Email é obrigatório.';
        }

        if (!formValues.dat_nasc) {
            errors.dat_nasc = 'Informe a data de nascimento.';
        }

        if (!formValues.endereco) {
            errors.endereco = 'Informe o endereço.';
        }
        if ((formValues.senha || formValues.confirmarSenha) && formValues.senha !== formValues.confirmarSenha) {
            errors.senha = 'As senhas não coincidem';
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

    const getAvatarImage = (id_sexo) => {
        switch (id_sexo) {
            case 1:
                return men1;
            case 2:
                return woman1;
            case 3:
                return men2;
            case 4:
                return woman2;
            case 5:
                return agenero;
            case 6:
                return naobinario;
            default:
                return defaultUser;
        }
    };

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

    const handleSaveUser = () => {
        if (validateForm()) {
            setIsLoading(true);
            if (!formValues.senha) {
                delete formValues.senha;
            }
            const formValuesToSend = { ...formValues, cpf: originalCpf };
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                id: formValues.id
            };
            api.put(`/updateProfile`, formValuesToSend, config)
                .then((response) => {
                    setReload(true);
                    setShowSnackbar(true);
                    setMessagem(response?.data?.message);
                    setIsLoading(false);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    };

    useEffect(() => {
        if (reload) {
            setReload(false);
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            api.get("/me", config)
                .then((response) => {
                    setFormValues('');
                    const user = response.data.user[0];
                    user.id = user.id_usuario;
                    delete user.id_usuario;
                    setFormValues(user);
                    setOriginalCpf(user.cpf);
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
            api.get("/sexos", config)
                .then((response) => {
                    setIdSexo(response.data.sexos);
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }, [reload, navigate, token, handleError]);

    const HandleChangeForm = (atributo, valor) => {
        setFormValues({
            ...formValues,
            [atributo]: valor
        })
    }

    return (
        <div
            style={{
                maxWidth: '85%',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
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
            <Card style={{ width: '400px', padding: '20px' }}>
                <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Gerenciamento de Perfil</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '20px' }}>
                    <Avatar
                        alt="User"
                        src={getAvatarImage(formValues?.id_sexo)}
                        style={{
                            width: '200px',
                            height: '200px',
                        }}
                    />
                </div>

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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        autoComplete="cpf"
                        disabled
                        value={reFormatCPF(formValues?.cpf)}
                        onChange={(e) => HandleChangeForm('cpf', e.target.value)}
                        error={!!formErrors.cpf}
                        helperText={formErrors.cpf}
                        inputProps={{ maxLength: 14 }}
                    />
                    <FormControl style={{ marginTop: '10px' }} fullWidth variant="outlined">
                        <InputLabel htmlFor="tipo-sexo" required>
                            <span style={{ backgroundColor: 'white' }}>Sexo</span>
                        </InputLabel>
                        <Select
                            labelId="tipo-sexo-label"
                            onMouseDown={(e) => e.preventDefault()}
                            id="tipo-sexo"
                            value={formValues?.id_sexo}
                            onChange={(e) => HandleChangeForm('id_sexo', e.target.value)}
                            error={!!formErrors.id_sexo}
                            variant="outlined"
                        >
                            <MenuItem value="" disabled>
                                Selecione o sexo
                            </MenuItem>
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
                        autoComplete="dat_nasc"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formValues?.dat_nasc}
                        onChange={(e) => HandleChangeForm('dat_nasc', e.target.value)}
                        error={!!formErrors.dat_nasc}
                        helperText={formErrors.dat_nasc}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="endereco"
                        label="Endereço"
                        name="endereco"
                        autoComplete="endereco"
                        value={formValues?.endereco}
                        onChange={(e) => HandleChangeForm('endereco', e.target.value)}
                        error={!!formErrors.endereco}
                        helperText={formErrors.endereco}
                    />
                    <Accordion style={{ marginTop: '10px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p>Alterar Senha</p>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ flexDirection: 'column' }}
                        >
                            <TextField
                                label="Nova senha"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type={showSenha ? 'text' : 'password'}
                                name="senha"
                                value={formValues?.password}
                                onChange={(e) => HandleChangeForm('senha', e.target.value)}
                                error={!!formErrors.senha}
                                helperText={formErrors.senha}
                                autoComplete="senha"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleMostrarsenha} edge="end">
                                                {showSenha ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirmar nova senha"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type={showConfirmarSenha ? 'text' : 'password'}
                                name="confirmarSenha"
                                value={formValues?.confirmarSenha}
                                onChange={(e) => HandleChangeForm('confirmarSenha', e.target.value)}
                                error={!!formErrors.senha}
                                helperText={formErrors.senha}
                                autoComplete="confirmarSenha"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleMostrarConfirmarSenha} edge="end">
                                                {showConfirmarSenha ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Button style={{ marginTop: '15px' }} variant="contained" color="primary" onClick={handleSaveUser}>
                        Salvar
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ProfileManagement;
