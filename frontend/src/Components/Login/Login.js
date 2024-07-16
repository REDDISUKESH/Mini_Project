/*import React, { useState ,useRef,useContext} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { faLock } from '@fortawesome/free-solid-svg-icons'; 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faMobile } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
 
function Login() { 
    const URL="http://localhost:3500"
    const emailref=useRef()
    const passwordref=useRef()
  const [isActive, setIsActive] = useState(false);
  const [UserName,setUserName]=useState('')
  const [Mobile,setMobile]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const handleButton = () => {
    setIsActive(!isActive);
  } 
  const {dispatch,isFetching}=useContext(Context)
  const navigate = useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
      try{
        const res = await axios.post(`${URL}/auth/Login`, {
          Email: emailref.current.value,
          Password: passwordref.current.value
        });      
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        console.log(res.data)
        navigate('/')
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      console.log(err);

    }
  } 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(`${URL}/auth/Register`, {
          UserName,
          Mobile,
          Email,
          Password,
          ConfirmPassword
        });
        //console.log(res); // Log the response data
        res.data && window.location.replace("/Login")
      } catch (error) {
        console.error('Error registering:', error);
        //setError(true); // Set error state to display error message
      }

  }
  return (
    <>    
    <div className="body">
        <div className={`wrapper ${isActive ?'active': ''}`}>
          <span className='bg-animate'></span>
          <span className='bg-animate2'></span>
          
            <div className='form-box login'>
                <h2 className='animation' style={{"--i":0, "--j":20}}>Login</h2>
                <form action="" onSubmit={handleLogin}>
                    <div className='input-box animation' style={{"--i":1, "--j":21}}>
                        <input type="email" id="email" name="email"  ref={emailref}/>                   
                        <label htmlFor="email">Email</label>
                        <FontAwesomeIcon icon={faUser} className='icon'/>
                    </div>
                    <div className='input-box animation' style={{"--i":2, "--j":22}}>
                        <input type="password" id="password" name="password" ref={passwordref}/>
                        <label htmlFor="password">Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                    </div>
                    <button type='submit' className='btn animation' style={{"--i":3, "--j":23}}>Login</button>
                    <div className='logreg-link animation' style={{"--i":4, "--j":24}}>
                        <p>Don't have an account? <Link to="" className={`register-link `} >Sign Up</Link></p>
                    </div>
                </form>
            </div>
            <div className='info-text login'>
              <h2 className='animation' style={{"--i":0, "--j":20}}>Welcome Back!</h2>
              <p className='animation' style={{"--i":1, "--j":21}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam aperiam expedita quos, nostrum saepe recusandae doloremque in, voluptatem architecto cumque odit vero repellendus consectetur nesciunt porro provident neque temporibus eum.</p>
            </div>

            <div className='form-box register'>
                <h2 className='animation' style={{"--i":17, "--j":0}}>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='input-box animation' style={{"--i":17, "--j":1}}>
                        <input type="text" id="user-name" name="user-name"  onChange={e=>{setUserName(e.target.value)}}/>                   
                        <label htmlFor="user-name">Username</label>
                        <FontAwesomeIcon icon={faUser} className='icon'/>
                    </div>
                    <div className='input-box animation' style={{"--i":18, "--j":2}}>
                        <input type="tel" id="mobile" name="mobile" onChange={e=>{setMobile(e.target.value)}}/>
                        <label htmlFor="mobile">Mobile</label>
                        <FontAwesomeIcon icon={faMobile} className='icon'/>
                    </div>
                    <div className='input-box animation' style={{"--i":19, "--j":3}}>
                        <input type="email" id="email" name="email"  onChange={e=>{setEmail(e.target.value)}}/>                   
                        <label htmlFor="email">Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                    </div>
                    <div className='input-box animation' style={{"--i":20, "--j":4}}>
                        <input type="password" id="password" name="password" onChange={e=>{setPassword(e.target.value)}}/>
                        <label htmlFor="password">Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                    </div>
                    <div className='input-box animation' style={{"--i":21, "--j":5}}>
                        <input type="password" id="confirm-password" name="confirm-password" onChange={e=>{setConfirmPassword(e.target.value)}}/>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                    </div>
                    <button type='submit' className='btn animation' style={{"--i":22, "--j":6}}>Sign Up</button>
                    <div className='logreg-link animation' style={{"--i":23}}>
                        <p>Already have an account? <Link to="#" className='login-link' onClick={handleButton}>Login</Link></p>
                    </div>
                </form>
            </div>
            <div className='info-text register'>
              <h2 className='animation' style={{"--i":17, "--j":0}}>Welcome Back!</h2>
              <p className='animation' style={{"--i":18, "--j":1}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam aperiam expedita quos, nostrum saepe recusandae doloremque in, voluptatem architecto cumque odit vero repellendus consectetur nesciunt porro provident neque temporibus eum.</p>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Login */
import React, { useContext } from 'react'
import { useRef } from 'react'
import {Context} from '../Context/Context'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
  const URL="http://localhost:3500";
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)
  const navigate = useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
      try{
        const res = await axios.post(`${URL}/auth/Login`, {
          Email: userRef.current.value,
          Password: passwordRef.current.value
        });      
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        console.log(res.data)
        navigate('/')
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      console.log(err);

    }
  }

  return (
    <div className='login'>
        <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={handleSubmit}>
            <label >Email</label>
            <input type="text" className='loginInput'  placeholder='Enter Your Email'
              ref={userRef}
            />
            <label >Password</label>
            <input type="password" className='loginInput' placeholder='Enter Your Password'
            ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login


