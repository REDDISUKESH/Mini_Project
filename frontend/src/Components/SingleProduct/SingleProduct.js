import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import './SingleProduct.css';

const SingleProduct = () => {
    const { user } = useContext(Context);
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const URL = "http://localhost:3500";
    const PF = "http://localhost:3500/images/";
    const navigate = useNavigate();
    const [activeData, setActiveData] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${URL}/product/${id}`);
                setActiveData(res.data);
                //console.log(res.data.ProductCategory);

                if (res.data?.ProductCategory) {
                    const cat = await axios.get(`${URL}/product/category/${res.data.ProductCategory}`);
                    setCategory(cat.data);
                    //console.log(cat.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        getProduct();
        setQty(1);
        window.scrollTo(0, 0);
    }, [id]);
    const incrementQty = () => {
        setQty(qty+1);
    };
    const decrementQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        } else {
            setQty(1); // Ensure quantity doesn't go below 1
        }
    };
    const handleAddToCart= async (e)=>{
        e.preventDefault();
        try{
            const newItem = {
                ProductId: activeData._id,
                ProductCategory:activeData.ProductCategory,
                ProductName: activeData.ProductName,
                ProductImages: activeData. ProductImages,
                ProductPrice: activeData.ProductPrice,
                Quantity: qty,
                ProductBrand: activeData.ProductBrand,
              };
              console.log(newItem)
              const res = await axios.post(`${URL}/cart/product/${user._id}`, newItem);
              console.log(res)
              if (res.status === 201) {
                console.log('Product added to cart successfully.');
                navigate(`/cart/${user._id}`)
                // Optionally, you can perform additional actions after the product is added.
              } else {
                console.error('Error adding product to cart:', res.statusText);
                // Handle the error accordingly.
              }
    
        }catch(err)
        {

        }

    }

    return (
        <div className="product-detail-container">
            {activeData ? (
                <div className="product-detail">
                    
                    <div className="product-info">
                        <div className="image-containermain">
                            {activeData.ProductImages &&
                                            <model-viewer className='pimage' src={PF + activeData.ProductImages} alt="Card 1 Model" camera-controls auto-rotate ar style={{ width: "100%", height: "80%" }}></model-viewer>
                                        }
                        </div>
                        <div className="single-pro-details">
                            <h4>{activeData.ProductName}</h4>
                            <div>
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={solidStar} style={{ color: "#FFD43B" }} />
                                <FontAwesomeIcon icon={regularStar} />
                                <FontAwesomeIcon icon={regularStar} />
                            </div>
                            <h5 id="price">$ {activeData.ProductPrice}</h5>
                            <h6 className="deal-of-day">Deal of the Day: $1000</h6>
                            <div className="item-details">
                                <h4>Product details</h4>
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit esse necessitatibus obcaecati autem modi distinctio est dolorem qui, consequuntur aspernatur enim deserunt magnam unde labore expedita similique porro nobis.{activeData.ProductDesc}</span>
                            </div>
                            <div className="icon-container">
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faTruck} />
                                    <p>Free delivery</p>
                                </div>
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faLock} />
                                    <p>Secure Transaction</p>
                                </div>
                                <div className="icon-box">
                                    <FontAwesomeIcon className="icon" icon={faShield} />
                                    <p>2 years Warranty</p>
                                </div>
                            </div>

                            <div className="extra-info">
                                <p>Available: <b>In stock</b></p>
                                <p>Brand: <b>{activeData.ProductBrand}</b></p>
                            </div>

        
                            <div className="qty-box">
                                <span>Quantity: </span>
                                <button className="qty-btn" onClick={decrementQty}>-</button>
                                <span className="qty"><b>{qty}</b></span>
                                <button className="qty-btn" onClick={incrementQty}>+</button>
                            </div>
                            <button className="cart-btn" onClick={handleAddToCart}>Add To Cart</button>

                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="related-products">
                        <h3 className="related-products-title">Related Products</h3>
                        <div className="related-products-grid">
                            {category && category.map((cur) => (
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
                    </div>
                </div>
            ) : (
                <div className="no-data">No data found</div>
            )}
        </div>
    );
}

export default SingleProduct;
