import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Developed by: '}
            <Link color="inherit" href="https://www.linkedin.com/in/kleberalv/" target="_blank">
                Kleber Alves Bezerera Junior
            </Link>
            {' - Sênior Developer '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;