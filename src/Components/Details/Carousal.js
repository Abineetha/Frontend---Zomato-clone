import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import Header from '../Header/Header';

export default function Carousal() {
  return (
    <div>
        {/* <Header/> */}
        <Carousel showThumbs={false}>
            <div>
                <img src={require('../../Assets/briyani3.avif')} alt='no img found' style={{ width: '100%', height: '650px' }}/>
            </div>
            <div>
                <img src={require('../../Assets/burger-food-.jpg')} alt='no img found' style={{ width: '100%', height: '650px' }}/>
            </div>
            <div>
                <img src={require('../../Assets/saffron tikka.avif')} alt='no img found' style={{ width: '100%', height: '650px' }}/>
            </div>
        </Carousel>
    </div>
  )
}
