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

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 345,
        margin: '20px',
        transition: '0.3s',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0px 0px 15px -5px',
        },
    },
    imageContainer: {
        textAlign: 'center',
        margin: '20px 0',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 12,
        textAlign: 'center',
    },
    titleDivider: {
        width: '100%',
        height: 1,
        margin: '10px 0',
        borderBottom: '1px solid black',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'center',
    }
});

function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.imageContainer}>
                    <img src={props.image} alt="" className={classes.image} />
                </div>
                <Typography className={classes.title} variant="h5" component="h2">
                    {props.title}
                </Typography>
                <br />
                <Typography className={classes.pos} color="textSecondary">
                    {props.subtitle}
                </Typography>
                <div className={classes.titleDivider}></div>
                <Typography variant="body2" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button onClick={props.clique} size="small">{props.buttonText}</Button>
            </CardActions>
        </Card>
    );
}


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
            clique:'#'
        }
    ];

    let dados = props?.props ? props.props : defaultProps;

    return (
        <>
            <Grid style={{ marginTop: '25px' }}>
                <Container component="main">
                    <Grid container spacing={1} alignItems='flex-end'>
                        {
                            dados.map((tier, key) => (
                                <SimpleCard
                                    key={key}
                                    image={tier.image}
                                    title={tier.title}
                                    subtitle={tier.subtitle}
                                    description={tier.description}
                                    buttonText={tier.buttonText}
                                    clique={tier.clique}
                                />
                            ))
                        }
                    </Grid>
                </Container>
            </Grid>
        </>

    );
}


export default ResponsiveCards;