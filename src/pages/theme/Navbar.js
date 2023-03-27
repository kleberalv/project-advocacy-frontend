import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PrincipalImage from '../../images/Chat.png';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../service/api';
import LoadingOverlay from '../../components/LoadingOverlay';
import Snackbar from '@mui/material/Snackbar';

function Navbar() {
    const useStyles = makeStyles((theme) => ({
        media: {
            height: 10,
            paddingTop: '56.25%', // 16:9,
            marginTop: '30'
        }
    }));

    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messagem, setMessagem] = useState('');

    const realizaLogOut = async () => {
        setIsLoading(true);

        try {
            const response = await api.post('/logout', {
                token: state?.token
            });

            if (response.status === 200) {
                localStorage.removeItem('token');
                setIsLoading(false);
                navigate('/login');
            }
        } catch (error) {
            setShowSnackbar(true);
            setIsLoading(false);
            setMessagem((error?.response?.data?.error || error?.response?.data?.errors) ?? 'Ocorreu um erro ao Sair. Tente novamente mais tarde.');
        }
    };

    return (

        <AppBar
            position="static"
            color="default"
            elevation={0}
        >
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
            <Toolbar style={{ backgroundColor: '#2c2c2c' }} sx={{ flexWrap: 'wrap' }}>
                <a style={{ marginTop: '8px' }} href={!state?.token ? '/' : '/home'}>
                    <img style={{ height: '50px' }} src={PrincipalImage} className="image-container" />
                </a>
                <Typography
                    variant="h6"
                    // color="inherit"
                    style={{ marginLeft: '5px', color: '#BC953D' }}
                    noWrap sx={{ flexGrow: 1 }}
                >
                    <Link
                        variant="h6"
                        // color="text.secondary"
                        style={{ color: '#BC953D', textDecoration: 'none' }}
                        href={!state?.token ? '/' : '/home'}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Advocacia Alves Bezerra
                    </Link>
                </Typography>
                {!state?.token ?
                    <>
                        <nav>
                            <Link
                                variant="button"
                                // color="text.primary"
                                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                                href="#id1"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Quem sou
                            </Link>
                            <Link
                                variant="button"
                                // color="text.secondary"
                                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                                href="#id2"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Como chegar
                            </Link>
                            {/* <Link
                                variant="button"
                                // color="text.secondary"
                                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                                href="#id3"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Meus trabalhos
                            </Link> */}
                        </nav>
                        <Button href="/login" style={{ color: '#B08836' }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>
                    </>
                    :
                    <Button onClick={realizaLogOut} style={{ color: '#B08836' }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Sair
                    </Button>
                }
            </Toolbar>
        </AppBar >
    )
}

export default Navbar;