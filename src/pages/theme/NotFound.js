import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../theme/Copyright';
import Navbar from '../theme/Navbar';
import '../../App.css';

const theme = createTheme();

export default function SignInSide() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Grid container component="main" sx={{ height: '92vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    className='BackgroundImageUsers'
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            marginTop: 20,
                            marginLeft: 4,
                            marginRight: 4,
                            marginBottom: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h1" color="inherit" className="font-medium mb-16">
                            404
                        </Typography>
                        <Box component="form" style={{ textAlign: 'center' }} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Typography variant="h5" color="textSecondary" className="mb-16">
                                A página solicitada não foi encontrada.
                            </Typography>
                            <Typography variant="h5" color="textSecondary" className="mb-16">
                                {':('}
                            </Typography>
                            <Grid style={{ marginTop: '140px' }}>
                                <Copyright />
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}