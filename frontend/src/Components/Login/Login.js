import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import './Login.css'
const Login = () => {
  const URL = "http://localhost:3500";
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URL}/auth/Login`, {
        Email: userRef.current.value,
        Password: passwordRef.current.value
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setUser('');
      setPwd('');
      setSuccess(true);
      navigate('/');
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <div className='login-container'>
      <span className='login-title'>Login</span>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-label'>Email:</label>
        <input
          type="text"
          className='login-input'
          placeholder='Enter Your Email'
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label className='login-label'>Password:</label>
        <input
          type="password"
          className='login-input'
          placeholder='Enter Your Password'
          ref={passwordRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button className="login-button" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <p>
        Need an Account?<br />
        <span className="login-link">
          <Link to='/Register'>
            Register
          </Link>
        </span>
      </p>
      {errMsg && <p className="errmsg">{errMsg}</p>}
    </div>
  );
};

export default Login;
