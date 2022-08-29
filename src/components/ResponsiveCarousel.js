import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../images/Slide1.jpg';
import slide2 from '../images/Slide2.jpg';
import slide3 from '../images/Slide3.jpg';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    slideCss:{
        height:'450px',
        width:'100px'
    },
    carouselCss:{
        marginRight: '20px',
        marginLeft: '20px'
    }
}));

    function Slides(){
        const classes = useStyles();
        return (
            <Carousel autoPlay={true} infiniteLoop={true} animationDuration={10} showArrows={true} showThumbs={false} className={classes.carouselCss}>
                <div>
                    <img src={slide1} className={classes.slideCss} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={slide2} className={classes.slideCss} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={slide3} className={classes.slideCss} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        );
    }

// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

export default function ResponsiveCarousel(){
    return Slides();
}

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>