import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const navigate = useNavigate();
  const [categoryTrack, setCategoryTrack] = useState(false);
  const [sortedTrack, setSortedTrack] = useState(false);
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [productsAvailable, setProductsAvailable] = useState(true);
  const url = window.location.href;
  const cat = location.pathname.split("/")[2];
  const URL = "http://localhost:3500";
  const PF = "http://localhost:3500/images/";
  const [sortBy, setSortBy] = useState('normal');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false); 

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}/product/category/${cat}`);
        if (res.data && res.data.length > 0) {
          setCategory(res.data);
          setProductsAvailable(true);
        } else {
          setCategory([]);
          setProductsAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    getCategory();
  }, [cat]);

  const categoryChange = async (value) => {
    try {
      if (value === 'all') {
        const res = await axios.get(`${URL}/product`);
        if (res.data && res.data.length > 0) {
          setCategory(res.data);
          setProductsAvailable(true);
        } else {
          setCategory([]);
          setProductsAvailable(false);
        }
      } else  {
        const res = await axios.get(`${URL}/product/category/${value}`);
        if (res.data && res.data.length > 0) {
          setCategory(res.data);
          setProductsAvailable(true);
        } else {
          setCategory([]);
          setProductsAvailable(false);
        }
        navigate(`/category/${value}`)
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCategory([]);
        setProductsAvailable(false);
      } else {
        console.error('Error fetching product:', error);
      }
    }
    navigate(`/category/${value}`)
  }; 

  const sortedChange = () => {
    setSortedTrack(prevState => !prevState);
  };

  const showDrop = () => {
    setCategoryTrack(prevState => !prevState);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const handleTypeChange = async (value) => {
    setSelectedType(value);
    try{
      const res = await axios.get(`${URL}/product/category/${cat}/${value}`);
      if (res.data && res.data.length > 0) {
        setCategory(res.data);
        setProductsAvailable(true);
      } else {
        setCategory([]);
        setProductsAvailable(false);
      }
    navigate(`/category/${cat}/${value}`)
    }catch (error) {
      if (error.response && error.response.status === 404) {
        setCategory([]);
        setProductsAvailable(false);
      } else {
        console.error('Error fetching product:', error);
      }
    }
    
    navigate(`/category/${cat}/${value}`);
  };
  const renderSecondDropdown = () => {
    if (categoryTrack && category.length > 0) {
      //const currentCategory = category[0].Category; 
      switch (cat) {
        case 'Appliances':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Beds" id="Beds" onChange={(e) => handleTypeChange(e.target.value)} />
                    <label htmlFor="Beds" className="cursor-pointer">Beds</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Cabinets" id="Cabinets" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Cabinets" className="cursor-pointer">Cabinets</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Sofas" id="Sofas" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Sofas" className="cursor-pointer">Sofas</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Tv-Stand" id="Tv-Stand" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Tv-Stand" className="cursor-pointer">Tv-Stand</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Washing Machines" id="Washing Machines" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Washing Machines" className="cursor-pointer">Washing Machines</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Kitchen" id="Kitchen" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Kitchen" className="cursor-pointer">Kitchen</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="AC" id="AC" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="AC" className="cursor-pointer">AC</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Fridge" id="Fridge" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Fridge" className="cursor-pointer">Fridge</label>
                  </div>
                </div>
              </div>            
          );
        case 'Furniture':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Tables" id="Tables" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Tables" className="cursor-pointer">Tables</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Chairs" id="Chairs" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Chairs" className="cursor-pointer">Chairs</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Shelf" id="Shelf" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Shelf" className="cursor-pointer">Shelf</label>
                  </div>
                </div>
              </div>            
          );
        case 'Fashion':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Men" id="Men" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Men" className="cursor-pointer">Men</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Women" id="Women" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Women" className="cursor-pointer">Women</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Shoes" id="Shoes" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Shoes" className="cursor-pointer">Shoes</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Accessories" id="Accessories" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Accessories" className="cursor-pointer">Accessories</label>
                  </div>
                </div>
              </div>            
          );
        case 'Electronics':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="PODS" id="PODS" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="PODS" className="cursor-pointer">PODS</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Speakers" id="Speakers" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Speakers" className="cursor-pointer">Speakers</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Cameras" id="Cameras" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Cameras" className="cursor-pointer">Cameras</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Printers" id="Printers" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Printers" className="cursor-pointer">Printers</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Mobiles" id="Mobiles" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Mobiles" className="cursor-pointer">Mobiles</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Laptops" id="Laptops" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Laptops" className="cursor-pointer">Laptops</label>
                  </div>
                  <div className="radio-group">
                    <input type="radio" name="productType" value="Watches" id="Watches" onChange={(e) => handleTypeChange(e.target.value)}/>
                    <label htmlFor="Watches" className="cursor-pointer">Watches</label>
                  </div>
                </div>
              </div>            
          );
          case 'Toys':
          return (
            <div className="shop-category-filter">
              <div className="header" onClick={showDrop}>
                <h2 className="uppercase">
                  Product Type
                </h2>
              </div>
              <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Balls" id="Balls" onChange={(e) => handleTypeChange(e.target.value)}/>
                  <label htmlFor="Balls" className="cursor-pointer">
                    Balls
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Board games" id="Board games" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Board games" className="cursor-pointer">
                    Board games
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Video games" id="Video games" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Video games" className="cursor-pointer">
                    Video games
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Action figures" id="Action figures" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Action figures" className="cursor-pointer">
                    Action figures
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Dolls" id="Dolls" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Dolls" className="cursor-pointer">
                    Dolls
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Stuffed animals" id="Stuffed animals" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Stuffed animals" className="cursor-pointer">
                    Stuffed animals
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Remote control toys" id="Remote control toys" onChange={(e) => handleTypeChange(e.target.value)}/> 
                  <label htmlFor="Remote control toys" className="cursor-pointer">
                    Remote control toys
                  </label>
                </div>
                <div className="radio-group">
                  <input type="radio" name="productType" value="Puzzles" id="Puzzles" onChange={(e) => handleTypeChange(e.target.value)}/>
                  <label htmlFor="Puzzles" className="cursor-pointer">
                    Puzzles
                  </label>
                </div>                                                                                                                                                                
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };
  

  const sortedProducts = () => {
    if (sortBy === 'ascending') {
      return [...category].sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    } else if (sortBy === 'descending') {
      return [...category].sort((a, b) => b.ProductName.localeCompare(a.ProductName));
    } else if (sortBy === 'lowToHigh') {
      return [...category].sort((a, b) => a.ProductPrice - b.ProductPrice);
    } else if (sortBy === 'highToLow') {
      return [...category].sort((a, b) => b.ProductPrice - a.ProductPrice);
    } else {
      return category;
    }
  };

  return (
    <div className="shop-container">
       <button className="filter-btn" onClick={toggleFilters}>
        {showFilters ? 'Close Filters' : 'Show Filters'}
      </button>         
      <div className={`filters-tab ${showFilters ? 'show' : 'hide'}`}>                     
          <div className={`shop-category-filter  ${categoryTrack ? 'height-fit' : ''}` }>
            <div className="header" onClick={showDrop}>
              <h2 className="uppercase">
                Category
              </h2>
            </div>
            <div className={`options ${categoryTrack ? 'opacity-100' : ''}`}>
              <div className="radio-group">
                <input type="radio" name="select" value="all" id="all" onChange={() => categoryChange('all')} />
                <label htmlFor="all" className="cursor-pointer">
                  All
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="furniture" id="furniture"  onChange={() => categoryChange('Furniture')} />
                <label htmlFor="furniture" className="cursor-pointer">
                  Furniture
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="appliances" id="appliances" onChange={() => categoryChange('Appliances')} />
                <label htmlFor="appliances" className="cursor-pointer">
                  Appliances
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="electronics" id="electronics" onChange={() => categoryChange('Electronics')} />
                <label htmlFor="electronics" className="cursor-pointer">
                  Electronics
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="fashion" id="fashion" onChange={() => categoryChange('Fashion')} />
                <label htmlFor="fashion" className="cursor-pointer">
                  Fashion
                </label>
              </div>
              <div className="radio-group">
                <input type="radio" name="select" value="toys" id="toys" onChange={() => categoryChange('Toys')} />
                <label htmlFor="Toys" className="cursor-pointer">
                  Toys
                </label>
              </div>
            </div>
          </div>
        
        {renderSecondDropdown()}    
         <div className={`sort-container ${sortedTrack ? 'expanded' : ''}`}>
          <div className="sort-header" onClick={sortedChange}>
            <h2 className="uppercase">sorted-by</h2>
            <i className={`arrow-icon ${sortedTrack ? 'rotate-180' : ''}`}></i>
          </div>
          <div className={`sort-options ${sortedTrack ? 'visible' : ''}`}>
            <div className="sort-option">
              <input type="radio" name="sort" value="normal" id="normal" onChange={() => handleSortChange('normal')} />
              <label htmlFor="normal" className="cursor-pointer">
                Normal
              </label>
            </div>
            <div className="sort-option">
              <input type="radio" name="sort" value="ascending" id="ascending"  onChange={() => handleSortChange('ascending')} />
              <label htmlFor="ascending" className="cursor-pointer">
                Ascending order (A-Z)
              </label>
            </div>
            <div className="sort-option">
              <input type="radio" name="sort" value="descending" id="descending"  onChange={() => handleSortChange('descending')} />
              <label htmlFor="descending" className="cursor-pointer">
                Descending order (Z-A)
              </label>
            </div>
            <div className="sort-option">
              <input type="radio" name="sort" value="highToLow" id="highToLow" onChange={() => handleSortChange('highToLow')} />
              <label htmlFor="highToLow" className="cursor-pointer">
                Price (high to low)
              </label>
            </div>
            <div className="sort-option">
              <input type="radio" name="sort" value="lowToHigh" id="lowToHigh" onChange={() => handleSortChange('lowToHigh')}  />
              <label htmlFor="lowToHigh" className="cursor-pointer">
                Price (low to high)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="related-products-container">
          <h1 className="related-products-title">Related Products</h1>
        <div className="related-products">
          {loading ? (
            <p>Loading...</p>
          ) : !productsAvailable ? (
            <p>No products available for this category.</p>
          ) : (
            <div className="related-products-grid">
              {sortedProducts().map((cur) => (
                <div key ={cur._id}className="product-container-card_1">
                <div className="image-container-card_1">
                  <model-viewer className="product-image-card_1" src={PF + cur.ProductImages} alt="Product Model" 
                  camera-controls auto-rotate ar
                  style={{ width: "100%", height: "80%" }} >
                  </model-viewer>
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
    </div>
   
  );
};

export default Shop;
