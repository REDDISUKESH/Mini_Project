import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaSearch } from "react-icons/fa";
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate, useParams ,useLocation} from 'react-router-dom'; 
import { FaShoppingCart } from 'react-icons/fa';
import './ScrollTop.css';
import axios from 'axios';
import pic from '../../Components/img/profile.jpeg'
import { Context } from '../Context/Context';

const ScrollTop = () => {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 
  const { query } = useParams(); // Get the search query from the URL
  
  const URL = "http://localhost:3500";
  const PF = "http://localhost:3500/images/";

  useEffect(() => {
    if (user) {
      const getCartItems = async () => {
        try {
          const res = await axios.get(`${URL}/cart/${user._id}`);
          setCartItems(res.data);       
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      getCartItems();
    }
  }, [URL, user]);

  useEffect(() => {
    if (location.pathname !== "/setting/:name") {
      setSearch('');
    }
  }, [location]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    if (search.trim() !== '') { // Check if search input is not empty
      handleSearch(); // If not empty, execute the search
    }
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <p>SHOPPER</p>
      </div>
      
      <ul className='nav-menu'>
        <li><Link to ="/" className='link'>HOME</Link></li>
      </ul>
      <ul className='nav-menu'>
        <li><Link to ="/tshirtDesigner" className='link'>T-shirt</Link></li>
      </ul>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          className="search-bar"
        />
        <button className="button_1" onClick={handleButtonClick} disabled={search.trim() === ''}>
          Search
        </button>
      </div>
      
      <ul className='nav-menu'>
        <li><Link to ="/Admin" className='link'>POST</Link></li>
      </ul>
      <div className="nav-cart">
        {user ? (
          <>
            <Link to="/setting">
              {user.ProfilePicture ? <img className="topImg" src={PF+user.ProfilePicture} /> : <img className='topImg' src={pic} ></img>}
            </Link> 
            <Link to={`/cart/${user._id}`}>
              <FaShoppingCart className="nav-cart-icon" />
            </Link>
            <div className="nav-cart-count">{cartItems.length}</div>
          </>
        ) : (
          <Link to="/Register" className='link'>
            <FontAwesomeIcon icon={faUser} className='nav-login'/>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ScrollTop;
