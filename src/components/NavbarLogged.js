import React from 'react';
import Button from '@mui/material/Button';

const tamanhoTelaAcesso = window.screen.width;

function NavbarLogged(props) {
    return (
        <>
            <Button onClick={props.onLogout} style={{ color: '#B08836' }} variant="outlined" sx={{ my: 1, mx: tamanhoTelaAcesso >= 600 ? 6.5 : 30 }}>
                Sair
            </Button>
        </>
    );
}

export default NavbarLogged;
