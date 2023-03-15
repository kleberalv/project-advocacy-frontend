import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../theme/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

function UserDashboard() {

  const theme = createTheme();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.token) {
      navigate('/login');
    }
  }, [state, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div>
        <h2>Bem-vindo(a), {state?.user?.nome}!</h2>
        <p>Você está logado(a) como {state?.user?.email}.</p>
      </div>
    </ThemeProvider>
  );
}

export default UserDashboard;
