import React from 'react';
import './Footer.css'; 
/* import logo from '../../assets/Footer_img/logo.png';
import appImg from  '../../assets/Footer_img/app.jpg';
import payImg from  '../../assets/Footer_img/pay.png'; */

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src={""} alt="" />
        <h4>Contact</h4>
        <p>
          <strong>Address: </strong>123 Madhapur Road, Street 10, Hyderabad
        </p>
        <p>
          <strong>Phone: </strong>(+91) 0123456789
        </p>
        <p>
          <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
        </p>
        <div className="follow">
          <h4>Follow us</h4>
          <div className="icon"></div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play Store</p>
        <div className="row">
          {/* <img src={appImg} alt="" /> */}
        </div>
        <p>Secured Payment Gateways </p>
        {/* <img src={payImg} alt="" /> */}
      </div>

      <div className="copyright">
        <p>2023, Ecommerce Template</p>
      </div>
    </footer>
  );
};

export default Footer;
