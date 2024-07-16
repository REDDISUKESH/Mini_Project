import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Trending.css'
const ProductCard = ({ product, PF }) => {
  // Calculate the discounted price (assuming a 10% discount)
  const discountPrice = product.ProductPrice * 0.9;

  return (
    <div className="product-container-card_1">
      <div className="image-container-card_1">
        <model-viewer className="product-image-card_1" src={PF + product.ProductImages} alt="Product Model" 
        camera-controls auto-rotate ar
        style={{ width: "100%", height: "80%" }} >
        </model-viewer>
      </div>
      <Link to={`/SingleProduct/${product._id}`} className="link">
        <div className="info-container-card_1">
          <p className="product-name-card_1">{product.ProductName}</p>
          <p className="product-price-card_1">
            <span className="discounted-price_1">RS {discountPrice.toFixed(2)} </span>
            <span className="old-price">RS {product.ProductPrice}</span>
            <span className="discount-info">(10% off)</span>
          </p>          
          <div className="ratings-container">
            <b>Rating:</b>
            <span className="product-rating">                            
              <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> 
              <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> 
              <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> 
              <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> 
              <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} />              
            </span>            
          </div>
        </div>
      </Link>
    </div>
  );
};

const Trending = () => {
  const URL = "http://localhost:3500";
  const PF = "http://localhost:3500/images/";

  const [trendingProducts, setTrendingProducts] = useState({
    Electronics: [],
    Fashion: [],
    Furniture: [],
    Appliances:[],
    Toys: [],
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = ["Electronics", "Fashion", "Furniture", "Appliances", "Toys"];
        const promises = categories.map(category => {
          return axios.get(`${URL}/product/category/${category}`)
                     .then(response => {
                        if (!response.data) {
                          throw new Error(`Failed to fetch ${category} products`);
                        }
                        return response.data;
                     });
        });

        const results = await Promise.all(promises);
        setTrendingProducts({
          Electronics: results[0],
          Fashion: results[1],
          Furniture: results[2],
          Appliances: results[3],
          Toys: results[4],
        });
        setLoading(false);
      } catch (error) {
        setErrorMessage('Error fetching products: ' + error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {Object.entries(trendingProducts).map(([category, products]) => (
        <div key={category}>
          <h3 className="top">Top Trending - {category}</h3>
          <p className="sub-top">
            Here's some of our most popular {category.toLowerCase()} products people are in love with.
          </p>
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p>Error: {errorMessage}</p>
          ) : (
            <div className="grid">
              {products.slice(0, 10).map(product => (
                <ProductCard key={product._id} product={product} PF={PF} />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Trending;
