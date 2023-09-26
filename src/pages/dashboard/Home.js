import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../theme/Navbar';
import { useNavigate } from 'react-router-dom';
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
import UserManagement from '../../components/UserManagement';
import ProcessManagement from '../../components/ProcessManagement';
import { getTiersBasedOnUserProfile } from '../../components/Constants';

function Dashboard() {

  const theme = createTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id_perfil = user?.id_perfil;
  const tamanhoTelaAcesso = window.screen.width;
  const [funcionalidade, setFuncionalidade] = useState('');
  const tiers = getTiersBasedOnUserProfile(user_id_perfil, setFuncionalidade);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (funcionalidade !== '') {
      setOpen(false);
    }
  }, [funcionalidade]);

  const drawerWidth = 240;

  const [open, setOpen] = useState(false);

  return (
    <>
      {token && (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'fixed', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2c2c2c' }}>
              <Toolbar style={{ backgroundColor: '#2c2c2c' }}>
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
                <SideNavbarLogged user_id_perfil={user_id_perfil} setFuncionalidade={setFuncionalidade} />
              </Box>

            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>

              {funcionalidade === '' &&
                <Box sx={{ flexGrow: 1, mt: 8 }}>
                  <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" align="center">
                        Bem-vindo(a), {user?.nome}!
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
              }

              {funcionalidade === 1 &&
                <UserManagement />
              }

              {funcionalidade === 2 &&
                <>
                  {alert('Em desenvolvimento')}
                  {setFuncionalidade('')}
                </>
              }

              {funcionalidade === 3 &&
                <ProcessManagement />
              }

              {funcionalidade === 4 &&
                <>
                  {alert('Em desenvolvimento')}
                  {setFuncionalidade('')}
                </>
              }

              {funcionalidade === 5 &&
                <>
                  {alert('Em desenvolvimento')}
                  {setFuncionalidade('')}
                </>
              }

            </Box>
          </Box>
        </ThemeProvider >
      )
      }
    </>
  );

}

export default Dashboard;
