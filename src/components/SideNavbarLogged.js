import React from 'react';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';
import List from '@mui/material/List';

function SideNavbarLogged(props) {
    return (
        <List sx={{ overflow: 'auto' }}>
            {props?.user_id_perfil === 1 ? (
                <>
                    <ListItemButton>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Administrar Usuários" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configurações da plataforma" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Acompanhamento dos processos" />
                    </ListItemButton>
                    <Divider />
                </>
            ) : (
                <>
                    <ListItemButton>
                        <ListItemIcon>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Acompanhamento dos processos" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alterar Perfil" />
                    </ListItemButton>
                    <ListItemButton>
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
