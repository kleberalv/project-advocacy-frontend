import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../images/Slide1.png';
import slide2 from '../images/Slide2.png';
import slide3 from '../images/Slide3.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    slideCss: {
        height: '450px',
        width: '100px'
    },
    slideCssMobile: {
        height: '300px',
        width: '100px'
    },
    carouselCss: {
        marginTop: '0px',
        marginRight: '0px',
        marginLeft: '0px'
    }
}));

function Slides() {
    const classes = useStyles();
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            animationDuration={10}
            showArrows={true}
            showThumbs={false}
            className={classes.carouselCss}
        >
            <div>
                {window.screen.width >= '600' ?
                    <img src={slide1} className={classes.slideCss} />
                    :
                    <img src={slide1} className={classes.slideCssMobile} />
                }
                <p className="legend">Agende uma reunião e tire suas dúvidas</p>
            </div>
            <div>
                {window.screen.width >= '600' ?
                    <img src={slide2} className={classes.slideCss} />
                    :
                    <img src={slide2} className={classes.slideCssMobile} />
                }
                <p className="legend">Realize seu cadastro para acompanhar seus casos</p>
            </div>
            <div>
                {window.screen.width >= '600' ?
                    <img src={slide3} className={classes.slideCss} />
                    :
                    <img src={slide3} className={classes.slideCssMobile} />
                }
                <p className="legend">Advocacia Alves Bezerra, sempre em acordo com a lei</p>
            </div>
        </Carousel>
    );
}

// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

export default function ResponsiveCarousel() {
    return Slides();
}

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>