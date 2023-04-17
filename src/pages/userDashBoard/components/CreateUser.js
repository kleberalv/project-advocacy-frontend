import React, { useState, useEffect } from "react";
import api from '../../../service/api';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
} from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

function UserList() {
    const [users, setUsers] = useState([]);
    const [orderBy, setOrderBy] = useState('nome');
    const [order, setOrder] = useState('asc');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        api.post("/allUsers", null, config)
            .then((response) => {
                setUsers(response.data.users);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response.status === 500) {
                    setShowSnackbar(true);
                    setMessagem(error.response.data.message);
                    localStorage.removeItem('token');
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);
                }
            });
    }, []);

    const handleCreateUser = () => {
        console.log("Criar novo usuário");
    };

    const handleSort = (columnName) => {
        if (orderBy === columnName) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnName);
            setOrder('asc');
        }
    };

    const sortedUsers = users.sort((a, b) => {
        const isAsc = order === 'asc';
        if (orderBy === 'nome') {
            return (a.nome.localeCompare(b.nome)) * (isAsc ? 1 : -1);
        } else if (orderBy === 'cpf') {
            return (a.cpf.localeCompare(b.cpf)) * (isAsc ? 1 : -1);
        } else if (orderBy === 'email') {
            return (a.email.localeCompare(b.email)) * (isAsc ? 1 : -1);
        } else {
            return 0;
        }
    });

    function formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }


    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messagem, setMessagem] = useState('');

    return (
        <div>
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
            <h1>Lista de usuários</h1>
            <TableContainer >
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.id_usuario}>
                                <TableCell>{user.nome}</TableCell>
                                <TableCell>{formatCPF(user.cpf)}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={handleCreateUser}>Novo usuário</button>
        </div>
    );
}

export default UserList;