// Hero.js

import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Hero.css';

const Hero = () => {
  const buttonHandle = () => {
    window.scrollTo({
      top: 1200,
      behavior: 'smooth',
    });
  };

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 1,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 1,
    },
  };

  return (
    <div className="hero-carousel-container">
      <Carousel
        responsive={responsive}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        autoPlay={true}
        showDots={true}
      >
        <div
          className="hero-container"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
        >
          <div className="hero-content">
            <p className="uppercase">Original tools</p>
            <h3 className="heading">Original</h3>
            <p className="paragraph">
              Upgrade your home with our amazing assortment of decor.
            </p>
           
            <Link href="/">
              <button class="button-container" onclick="buttonHandle()">
                EXPLORE NOW
              </button>
            </Link>

           
          </div>
        </div>

        <div
          className="hero-container"
          style={{ backgroundImage: "url(https://umino.mageblueskytech.com/media/revslider/s1_d1.jpg)" }}
        >
          <div className="hero-content">
            <p className="uppercase">Top trending</p>
            <h3 className="heading">Life</h3>
            <p className="paragraph">
              Upgrade your home with our amazing assortment of decor.
            </p>
            <Link to="/">
              <button
                className="py-[15px] px-[50px] bg-[#111111] inline-block font-semibold text-white rounded-full button-container"
                onClick={buttonHandle}
              >
                EXPLORE NOW
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
