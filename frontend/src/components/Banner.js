// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src="http://d3b39vpyptsv01.cloudfront.net/photo/1/2/02bd17dbd76d390ae475042f0514b7a5.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src="https://d3b39vpyptsv01.cloudfront.net/photo/1/2/936f67eed99355f721b37b74f845ed04.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src="https://d3b39vpyptsv01.cloudfront.net/photo/1/2/936f67eed99355f721b37b74f845ed04.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

// render(<ControlledCarousel />);
export default Banner;