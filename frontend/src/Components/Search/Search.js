import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from 'react-router-dom'
import './Search.css'
const Search = () => {
  const [products, setProducts] = useState([]);
    const url="http://localhost:3500"
    const PF="http://localhost:3500/images/"
    const location =useLocation();
    const query= location.pathname.split("/")[2];
    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            
           // console.log("Anjani@19", query);
            if (query) {
              const response = await axios.get(`${url}/product/search/${query}`);
              if (response.status === 200) {
                setProducts(response.data);
                //console.log(response.data);
              } else {
                throw new Error('Failed to fetch products');
              }
            }
          } catch (error) {
            console.error('Error fetching products:', error.message);
          }
        };
    
        fetchProducts();
      }, [query]);

  return (
    <div>
    <div className="related-products">
        <h3 className="related-products-title">Search Result</h3>
        {products.length === 0 ? (
            <p>No results found</p>
        ) : (
            <div className="related-products-grid">
                {products.map((cur) => (
                    <div key={cur._id} className="related-product">
                        <div className="related-product-image">
                            {cur.ProductImages &&
                                <model-viewer className='pimage' src={PF + cur.ProductImages} alt="Card 1 Model" camera-controls auto-rotate ar style={{ width: "100%", height: "80%" }}></model-viewer>
                            }
                        </div>
                        <Link to={`/SingleProduct/${cur._id}`} className="link">
                            <div className="info-container-card_1">
                                <p className="product-name-card_1">{cur.ProductName}</p>
                                <p className="product-price-card_1">
                                    <span className="discounted-price_1">RS {cur.ProductPrice * 0.9.toFixed(2)} </span>
                                    <span className="old-price">RS {cur.ProductPrice}</span>
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
                ))}
            </div>
        )}
    </div>
</div>

  );
};

export default Search;
