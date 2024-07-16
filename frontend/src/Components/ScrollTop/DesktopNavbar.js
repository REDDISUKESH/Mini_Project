import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useUser } from "@clerk/clerk-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import './DesktopNavbar.css';
import { Context } from '../Context/Context';


const DesktopNavbar = () => {
  //const { isSignedIn, user, isLoaded } = useUser();
  const { user } = useContext(Context);
  const [activeLink, setActiveLink] = useState("Home"); // State to track active link
  const [isAllowedToPost, setIsAllowedToPost] = useState(false); // State to track if user is allowed to post

  // Function to handle click on navbar links
  const handleClick = (link) => {
    setActiveLink(link);
  };

  // Update active link state based on current page pathname
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActiveLink("Home");
    } else if (pathname === "/admin") {
      setActiveLink("Post");
    } else if (pathname === "/tshirtDesigner") {
      setActiveLink("T-Shirt");
    }
  }, []);

  // Check if user is allowed to post based on email ID
  useEffect(() => {
    if (user && user.email === "abc@gmail.com") {
      setIsAllowedToPost(true);
    } else {
      setIsAllowedToPost(false);
    }
  }, [user]);

  // Check if user is loaded and signed in before accessing user data
  if (!isLoaded) {
    return null; // Or some loading indicator
  }

  return (
    <nav className="navbar-custom">
      <div className="navbar-brand">
        <img
          src="/path/to/your/logo.png"
          alt="Logo"
          height="30"
          className="d-inline-block align-top"
        />
      </div>
      <div className="navbar-links">
        <ul>
          <li className={activeLink === "Home" ? "active" : ""}><a href="/" onClick={() => handleClick("Home")}>HOME</a></li>
          {isAllowedToPost ? (
            <li className={activeLink === "Post" ? "active" : ""}><a href="/admin" onClick={() => handleClick("Post")}>POST</a></li>
          ) : (
            <li className={activeLink === "Services" ? "active" : ""}><a href="/services" onClick={() => handleClick("Services")}>SERVICES</a></li>
          )}
          <li className={activeLink === "T-Shirt" ? "active" : ""}><a href="/tshirtDesigner" onClick={() => handleClick("T-Shirt")}>T-Shirt</a></li>
        </ul>
      </div>
      <div className="navbar-search">
        <input
          type="search"
          placeholder="Search"
        />
        <button>Search</button>
      </div>
      <div className="navbar-cart-signin">
        <div className="navbar-cart">
          {isSignedIn ? (
            <a href={`/cart/${user.id}`}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', cursor: 'pointer', marginRight: '30px'}} />
            </a>
          ) : (
            <a href="/">
              <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', cursor: 'pointer', marginRight: '30px'}} />
            </a>
          )}
        </div>
        <div className="navbar-signin">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton className="sign-in" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
