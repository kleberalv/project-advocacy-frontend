import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PrincipalImage from '../../images/Chat.png';

function Navbar() {
    const useStyles = makeStyles((theme) => ({
        media: {
            height: 10,
            paddingTop: '56.25%', // 16:9,
            marginTop: '30'
        }
    }));

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar style={{ backgroundColor: '#2c2c2c' }} sx={{ flexWrap: 'wrap' }}>
                <a style={{ marginTop: '8px' }} href="/">
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
                        href="/"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Advocacia Alves Bezerra
                    </Link>
                </Typography>
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
                        Local
                    </Link>
                    <Link
                        variant="button"
                        // color="text.secondary"
                        style={{ color: '#FFFFFF', textDecoration: 'none' }}
                        href="#id3"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Meus trabalhos
                    </Link>
                </nav>
                <Button href="/login" style={{ color: '#B08836' }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;