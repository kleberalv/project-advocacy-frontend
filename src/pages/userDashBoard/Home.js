import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../theme/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideNavbarLogged from '../../components/SideNavbarLogged';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ResponsiveCards from '../../components/ResponsiveCards';
import Grid from '@mui/material/Grid';

function UserDashboard() {

  const theme = createTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = state?.token;
  const user = state?.user[0];
  const user_id_perfil = state?.user[0]?.id_perfil;
  // const user_id_perfil = 2;
  const tamanhoTelaAcesso = window.screen.width;

  const tiers = [];

  if (user_id_perfil === 1) {
    tiers.push(
      {
        // image: QuemSomos1,
        subtitle: 'Gerenciamento dos Usuários',
        description: [
          'Siga para o gerenciamento dos usuários. Crie, edite ou inative o usuário desejável.',
        ],
        buttonText: 'Gerenciar Usuários',
        buttonVariant: 'contained',
      },
      {
        // image: QuemSomos2,
        subtitle: 'Configurações da Plataforma',
        description: [
          'Configure o site da forma desejada. Altere as imagens da página principal, textos e etc.',
        ],
        buttonText: 'Configurar Plataforma',
        buttonVariant: 'contained',
      },
      {
        // image: QuemSomos3,
        subtitle: 'Acompanhe os Processos',
        description: [
          'Clique e acompanhe o andamento dos processos cadastrados.',
        ],
        buttonText: 'Andamento Processuais',
        buttonVariant: 'outlined',
      }
    );
  }

  if (user_id_perfil === 2) {
    tiers.push(
      {
        // image: QuemSomos3,
        subtitle: 'Acompanhe os Processos',
        description: [
          'Clique e acompanhe o andamento dos processos cadastrados.',
        ],
        buttonText: 'Andamento Processuais',
        buttonVariant: 'outlined',
      },
      {
        // image: QuemSomos4,
        subtitle: 'Alterar Perfil',
        description: [
          'Altere e mantenha seus dados atualizados na plataforma.',
        ],
        buttonText: 'Alterar Perfil',
        buttonVariant: 'outlined',
      },
      {
        // image: QuemSomos4,
        subtitle: 'Solicitar Reunião',
        description: [
          'Solicite reunião com o advogado para retirar dúvidas',
        ],
        buttonText: 'Agendar Reunião',
        buttonVariant: 'outlined',
      }
    );
  }

  useEffect(() => {
    if (!state?.token) {
      navigate('/login');
    }
  }, [state, navigate]);
  const drawerWidth = 240;

  const [open, setOpen] = useState(false);

  return (
    <>
      {token && (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2c2c2c' }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <ChevronLeftIcon sx={{ color: "#BC953D" }} /> : <MenuIcon sx={{ color: "#BC953D" }} />}
                </IconButton>
                <Navbar />
              </Toolbar>
            </AppBar>

            <Drawer
              variant="temporary"
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', overflowX: 'hidden' },
              }}
            >
              <Toolbar />

              <Box sx={{ overflow: 'auto', marginTop: tamanhoTelaAcesso <= 600 && '64px' }}>
                <SideNavbarLogged user_id_perfil={user_id_perfil} />
              </Box>

            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(true)}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
              <Box sx={{ flexGrow: 1, mt: 8 }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      Bem-vindo(a), {user.nome}!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ minHeight: 'calc(100vh - 300px)' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={12} key={tiers.title}>
                          <ResponsiveCards props={tiers} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box >

        </ThemeProvider >
      )
      }
    </>
  );

}

export default UserDashboard;
