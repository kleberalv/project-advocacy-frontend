import React from 'react';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';
import List from '@mui/material/List';

function SideNavbarLogged(props) {

    const handleItemClick = (value) => {
        props.setFuncionalidade(value);
    };

    return (
        <List sx={{ overflow: 'auto' }}>
            {props?.user_id_perfil === 1 ? (
                <>
                    <ListItemButton onClick={() => handleItemClick(1)}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Administrar Usuários" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleItemClick(2)}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configurações da plataforma" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleItemClick(3)}>
                        <ListItemIcon>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Acompanhamento dos processos" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleItemClick(4)}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alterar perfil" />
                    </ListItemButton>
                    <Divider />
                </>
            ) : (
                <>
                    <ListItemButton onClick={() => handleItemClick(3)}>
                        <ListItemIcon>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Acompanhamento dos processos" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleItemClick(4)}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alterar Perfil" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleItemClick(5)}>
                        <ListItemIcon>
                            <HandshakeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Solicitar Reunião" />
                    </ListItemButton>
                </>
            )}
        </List>
    );
}


export default SideNavbarLogged;
