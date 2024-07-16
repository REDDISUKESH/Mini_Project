import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';

const Admin = () => {
  const Url = "http://localhost:3500";
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [brand, setProductBrand] = useState('');
  // const [gender, setGender] = useState('');
  const [productType, setProductType] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newProduct = {
        ProductCategory: category,
      ProductName: productName,
      
      Productdesc: description,
      ProductPrice: price,
      ProductType:productType,
      ProductBrand:brand,
    };
  
    /* if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newProduct.ProductImages = filename;
  
      try {
        const res = await axios.post(`${Url}/upload`, data);
        console.log(res.data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }
   */
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newProduct.ProductImages = filename;
      try {
        const res = await axios.post(`${Url}/upload`, data);
        console.log(res.data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }
    try {
      const res = await axios.post(`${Url}/product/newProduct`, JSON.stringify(newProduct), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      navigate(`/SingleProduct/${res.data._id}`);
    } catch (err) {
      console.error("Error posting product:", err);
    }
  };

  return (
    <div className='write'>
      {file && 
      <model-viewer className='writeImg' src={URL.createObjectURL(file)}alt="Card 1 Model" camera-controls auto-rotate ar></model-viewer> }
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <FontAwesomeIcon icon={faPlus} className="writeIcon" />
            
          </label>
          <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" placeholder='Product Name' className='writeInput' autoFocus={true} onChange={e => setProductName(e.target.value)} />
          <input type="text" placeholder='Product Brand' className='writeInput' autoFocus={true} onChange={e => setProductBrand(e.target.value)} />
          <input type="number" placeholder='Price' className='writeInput' onChange={e => setPrice(e.target.value)} />
          <select className='writeInput' value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>            
            <option value="Furniture">Furniture</option>
            <option value="Appliances">Appliances</option>
            <option value="Toys">Toys</option>
          </select>
          {category === 'Fashion' && (
            <select className='writeInput' onChange={e => setProductType(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Shoes/Slippers..">Shoes/Slippers..</option>
            </select>
          )}
          {category === 'Appliances' && (
            <select className='writeInput' onChange={e => setProductType(e.target.value)}>
              <option value="">Select Product Type</option>
              <option value="Beds">Beds</option>
              <option value="Cabinets">Cabinets</option>
              <option value="Sofas">Sofas</option>
              <option value="Washing Machines">Washing Machines</option>
              <option value="AC">AC</option>
              <option value="TV">TV-Stand</option>
              <option value="Fridge">Fridge</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          )}

          {category === 'Furniture' && (
            <select className='writeInput' onChange={e => setProductType(e.target.value)}>
              <option value="">Select Product Type</option>
              <option value="Tables">Tables</option>
              <option value="Chairs">Chairs</option>
              <option value="Shelf">Shelf</option>
            </select>
          )}

          {category === 'Toys' && (
            <select className='writeInput' onChange={e => setProductType(e.target.value)}>
              <option value="">Select Product Type</option>
              <option value="Balls">Balls</option>
              <option value="Board games">Board games</option>
              <option value="Video games">Video games</option>
              <option value="Action figures">Action figures</option>
              <option value="Dolls">Dolls</option>
              <option value="Stuffed animals">Stuffed animals</option>
              <option value="Remote control toys">Remote control toys</option>
              <option value="Puzzles">Puzzles</option>
            </select>
          )}

          {category === 'Electronics' && (
            <select className='writeInput' onChange={e => setProductType(e.target.value)}>
              <option value="">Select Product Type</option>
              <option value="TV">PODS</option>
              <option value="Speakers">Speakers</option>
              <option value="Cameras">Cameras</option>
              <option value="Printers">Printers</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Watches">Watches</option>
            </select>
          )}

        </div>
        <div className="writeFileGroup">
          <textarea className="writeInput writeText" cols="30" rows="10" placeholder='Description' onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <button className="writeSubmit" type="submit">Post</button>
      </form>
    </div>
  );
}

export default Admin;