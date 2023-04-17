import React from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

const tamanhoTelaAcesso = window.screen.width;

function NavbarLogged(props) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <>

            <Button
                onClick={!isHomePage ? props.onLogout : undefined}
                style={{ color: '#B08836' }}
                variant="outlined"
                sx={{ my: 1, mx: tamanhoTelaAcesso >= 600 ? 6.5 : 30 }}
                href={isHomePage && "/home"}
            >
                {isHomePage ? 'Login' : 'Sair'}
            </Button>

        </>
    );
}

export default NavbarLogged;
