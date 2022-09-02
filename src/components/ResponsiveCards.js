import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import '../App.css';
import { makeStyles } from '@mui/styles';
import DefaultImageCard from '../images/insiraImagemAqui.jpg'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 10,
        paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    }
}));


function ResponsiveCards(props) {
    const classes = useStyles();
    
    const defaultProps = [
        {
            image: DefaultImageCard,
            title: 'Título do card',
            subtitle: 'Subtítulo do card',
            description: [
              'Aqui vai toda a descrição do card'
            ],
            buttonText: 'Botão com o tipo outlined',
            buttonVariant: 'outlined',
          }
    ];

    let dados = props?.props? props.props : defaultProps;

    return (
        <>

            <Grid style={{marginTop:'25px'}}>
                <Container data-aos="fade-up" component="main">
                    <Grid container spacing={1} alignItems='flex-end'>
                        {
                            dados.map((tier, key) => (
                                <Grid item key={tier.title} xs={12} sm={12} md={12} lg={4} xl={4} className="card-container">
                                    <div className="image-container">
                                        <img src={tier.image} alt='' />
                                    </div>

                                    <div className='card-content'>

                                        <CardHeader
                                            title={tier.title}
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? theme.palette.grey[200]
                                                        : theme.palette.grey[700],
                                            }}
                                        />

                                        <Typography color="text.secondary">
                                            {tier.subtitle}
                                            <Divider />
                                        </Typography>

                                        <div className='card-body'>
                                            {tier.description}
                                            {/* descricao */}
                                        </div>

                                    </div>
                                    <div className='btn'>
                                        <Button className='btn-button'>
                                            <a> {tier.buttonText} </a>
                                        </Button>
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </Grid>
        </>

    );
}


export default ResponsiveCards;