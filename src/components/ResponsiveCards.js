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
import QuemSomos1 from '../images/QuemSomos1.png'
import QuemSomos2 from '../images/QuemSomos2.png'
import QuemSomos3 from '../images/QuemSomos3.png'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 10,
        paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    }
}));

const tiers = [
    {
        image: QuemSomos1,
        title: 'Uma filosofia moderna de gestão juntamente com a tecnologia',
        subtitle: 'Sedimentado em uma atuação profissional, inovadora e dinâmica.',
        description: [
            'A organização do escritório está em consonância com os mais modernos modelos de gestão da advocacia internacional, ',
            'segmentado em bancas de atuação, assim como as grandes firmas, que permite uma excelente atuação.'
        ],
        buttonText: 'Agende uma reunião',
        buttonVariant: 'outlined',
    },
    {
        image: QuemSomos2,
        title: 'Pontualidade e seriedade dos compromissos com seus clientes',
        // subheader: 'Most popular',
        subtitle: 'O atendimento é realizado por até 8 (oito) profissionais capacitados na área de atuação.',
        description: [
            'Sendo assim, além dos serviços prestados no contencioso jurídico, prestamos assessoria na',
            'administração de procedimentos jurídicos abrangendo as áreas preventiva e consultiva.',
            'Agende uma reunião com nossa equipe jurídica.',
        ],
        buttonText: 'Agende uma reunião',
        buttonVariant: 'contained',
    },
    {
        image: QuemSomos3,
        title: 'Agregar valores aos negócios por meio do conjunto de informações',
        subtitle: 'Acompanhamento processual eficiente e diferenciado',
        description: [
            'Nosso objetivo é agregar valores aos negócios dos clientes por meio do conjunto de informações fundamentais que',
            'obtemos por um acompanhamento processual eficiente e diferenciado, de modo a prestar todo o suporte legal necessário.',
        ],
        buttonText: 'Agende uma reunião',
        buttonVariant: 'outlined',
    },
];

function ResponsiveCards() {
    const classes = useStyles();

    return (
        <>
            <Container data-aos="fade-up" component="main">
                <Grid container spacing={1} alignItems='flex-end'>
                    {
                        tiers.map((tier, key) => (
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
                                    <Button variant='outlined'>
                                        <a> {tier.buttonText} </a>
                                    </Button>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </>

    );
}


export default ResponsiveCards;