import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './Category.css';

const Category = () => {
  let categoryData = [
    {
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pYyUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        category: "Electronics",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Furniture",
      },
      {
        image:
          "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Appliances",
      },
      {
        image:
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
        category: "Boots",
      },
      {
        image:
          "https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Fashion",
      },
      {
        image:
          "https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Toys",
      },
    ];
    
  

  return (
    <div className="category-container">
      <h3 className="category-title">
        You Might Like
      </h3>
      <p className="category-description">
        Our products are designed for everyone, environmentally friendly.
      </p>

      <div className="swiper-container pagination-container">
        <Swiper
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            250: { slidesPerView: 1 },
            300: { slidesPerView: 2 },
            482: { slidesPerView: 3 },
            655: { slidesPerView: 4 },
            860: { slidesPerView: 5 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {categoryData.map((cur, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="category-item">
                <div className="image-container">
                  <Link to={`/category/${cur.category}`}>
                    <img
                      src={cur.image}
                      alt=""
                      className="category-image"
                    />
                  </Link>
                </div>
                <p className="category-text">{cur.category}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
