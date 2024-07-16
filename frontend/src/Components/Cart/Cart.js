import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Cart.css';
import {Link} from 'react-router-dom'
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState({});
    const location =useLocation();
    const id = location.pathname.split("/")[2];
    const URL = "http://localhost:3500";
    const PF = "http://localhost:3500/images/";

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await axios.get(`${URL}/cart/${id}`); 
                setCartItems(res.data);
                const initialQty = {};
                res.data.forEach(item => {
                    initialQty[item._id] = item.Quantity;
                });
                setQty(initialQty);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        getCartItems();
    }, [id]);

    const updateQty = (itemId, newQty) => {
        setQty(prevQty => ({
            ...prevQty,
            [itemId]: newQty
        }));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += (item.ProductPrice - item.ProductPrice * 0.1) * qty[item._id];
        });
        return totalPrice;
    };
    const handleDelete = async (pid) => {
        try {
            const res = await axios.delete(`${URL}/cart/${pid}/${id}`);
            window.location.reload()
            //console.log(res.data); 
            if (res.data.message === "Product is deleted") {
                const updatedCartItems = cartItems.filter(item => item.ProductId !== pid);
                setCartItems(updatedCartItems);
                
            } else {
                console.log("Error deleting product:", res.data);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    
    return (
        <div className='cart-container'>
            <h2>Shopping Cart</h2>
            <hr />
            <div className='cart-items'>
                {cartItems.map((cur) => (
                    <div key={cur._id} className='cart-item'>
                        <div className='cart-item-img'>
                            {cur.ProductImages &&
                                <model-viewer className='product-image' src={PF + cur.ProductImages} alt="Card 1 Model" camera-controls auto-rotate ar style={{ width: "60%", height: "80%" }}></model-viewer>
                            }                        
                        </div>
                        <div className='cart-item-details'>
                            <h4>{cur.ProductName}</h4>
                            <div className="qty-box">
                                <span><b>Qty: </b></span>
                                <button className="qty-btn" onClick={() => updateQty(cur._id, qty[cur._id] - 1)}>-</button>
                                <span className="qty"><b>{qty[cur._id]}</b></span>
                                <button className="qty-btn" onClick={() => updateQty(cur._id, qty[cur._id] + 1)}>+</button>
                            </div>
                            <button className="button"onClick={() => handleDelete(cur.ProductId)}><span>Delete </span></button>
                            <span> | Save for later |</span>
                            <Link to={`/category/${cur.ProductCategory}`} className='link seemore'><span> See more like this</span></Link>
                            <span> | Share</span>
                        </div>
                        <div>
                            <span className='time-deal'><b>Limited time deal</b></span>
                            <span className='off-perct'><b>10% off</b></span>
                            <p><b>Rs. {(cur.ProductPrice - cur.ProductPrice * 0.1) * qty[cur._id]}</b></p>
                            <p id="org-price">Rs. {cur.ProductPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='sub-total'>
                <h4><b>Sub Total({cartItems.length} Items): Rs. {calculateTotalPrice().toFixed(2)}</b></h4>
            </div>
        </div>
    );
};

export default Cart;
