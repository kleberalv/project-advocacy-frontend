import React, { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PrincipalImage from '../../images/Chat.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../theme/Copyright';
import Navbar from '../theme/Navbar';
import '../../App.css';
import AOS from 'aos';
import api from '../../service/api';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';

const theme = createTheme();

export default function SignInSide() {

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const isLogged = localStorage.getItem('token');
    if (isLogged) {
      navigate('/home');
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        // Remover caracteres especiais do campo CPF
        const cpf = formLogin.cpf.replace(/\.|-/g, '');
        setIsLoading(true);

        const response = await api.post('/login', {
          cpf,
          senha: formLogin.senha
        });

        if (response.data.access_token) {
          const token = response.data.access_token;
          const user = response.data.user[0];
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/home');
        }
        setIsLoading(false);

      } catch (error) {
        setShowSnackbar(true);
        setIsLoading(false);
        setMessagem((error?.response?.data?.error || error?.response?.data?.errors) ?? 'Ocorreu um erro ao realizar o Login. Por favor, tente mais tarde.')
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formLogin.cpf) {
      errors.cpf = "CPF é obrigatório.";
    }
    if (!formLogin.senha) {
      errors.senha = "Senha é obrigatória.";
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

  const HandleChangeFormLogin = async (atributo, valor) => {
    setFormLogin({
      ...formLogin,
      [atributo]: valor
    })
  }

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messagem, setMessagem] = useState('');
  const [formLogin, setFormLogin] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {isLoading &&
        <LoadingOverlay />
      }
      <Snackbar
        open={showSnackbar}
        autoHideDuration={10000}
        onClose={() => setShowSnackbar(false)}
        message={messagem}
        severity="error"
      />
      <Grid data-aos="zoom-in-up" container component="main" sx={{ height: '92vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='BackgroundImageUsers'
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Área de membros
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                autoFocus
                value={formLogin?.cpf}
                onChange={(e) =>
                  HandleChangeFormLogin('cpf', formatCPF(e.target.value))
                }
                error={!!formErrors.cpf}
                helperText={formErrors.cpf}
                inputProps={{ maxLength: 14 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formLogin?.senha}
                onChange={(e) => HandleChangeFormLogin('senha', e.target.value)}
                error={!!formErrors.senha}
                helperText={formErrors.senha}
                inputProps={{ maxLength: 20 }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar-me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link style={{ textDecoration: 'none' }} href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                {/* <Grid item>
                  {'Não possui conta?'}
                  <Link style={{ textDecoration: 'none' }} href="/register" variant="body2">
                    {" Cadastre-se"}
                  </Link>
                </Grid> */}
              </Grid>
              <Grid style={{ marginTop: '50px', marginBottom: '13px' }}>
                <Copyright />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}