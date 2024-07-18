import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FaUser, FaEnvelope, FaLock, FaMobileAlt } from 'react-icons/fa';
import './Register.css'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const MOBILE_REGEX = /^[0-9]{10}$/;
const URL = "http://localhost:3500/auth/Register";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [mobile, setMobile] = useState('');
    const [validMobile, setValidMobile] = useState(false);
    const [mobileFocus, setMobileFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidMobile(MOBILE_REGEX.test(mobile));
    }, [mobile]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, email, mobile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = MOBILE_REGEX.test(mobile);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const newUser = {
                UserName: user,
                Mobile: mobile,
                Email: email,
                Password: pwd,
                ConfirmPassword: matchPwd,
            };
            const response = await axios.post(URL,
                JSON.stringify(newUser),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            setMobile('');
            setEmail('');
            window.location.replace("/login");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="register-page">
            {success ? (
                <section className='register-success'>
                    <h1>Success!</h1>
                    <Link className='register-link' to='/login'>
                        Login
                    </Link>
                </section>
            ) : (
                <section className='register-container'>
                    <p ref={errRef} className={errMsg ? "error-message" : "hidden"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form className='register-form' onSubmit={handleSubmit}>
                        <label htmlFor="username" className='register-label'>
                            <FaUser className='register-icon' />
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid-icon" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : "invalid-icon"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className='register-input'
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "register-instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email" className='register-label'>
                            <FaEnvelope className='register-icon' />
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid-icon" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden" : "invalid-icon"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className='register-input'
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "register-instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid email address.
                        </p>

                        <label htmlFor="mobile" className='register-label'>
                            <FaMobileAlt className='register-icon' />
                            Mobile:
                            <FontAwesomeIcon icon={faCheck} className={validMobile ? "valid-icon" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validMobile || !mobile ? "hidden" : "invalid-icon"} />
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            autoComplete="off"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            required
                            aria-invalid={validMobile ? "false" : "true"}
                            aria-describedby="mobilenote"
                            onFocus={() => setMobileFocus(true)}
                            onBlur={() => setMobileFocus(false)}
                            className='register-input'
                        />
                        <p id="mobilenote" className={mobileFocus && mobile && !validMobile ? "register-instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid mobile number.
                        </p>

                        <label htmlFor="password" className='register-label'>
                            <FaLock className='register-icon' />
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid-icon" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "invalid-icon"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className='register-input'
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "register-instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number, and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd" className='register-label'>
                            <FaLock className='register-icon' />
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid-icon" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "invalid-icon"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className='register-input'
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "register-instructions" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className='register-submit' disabled={!validName || !validPwd || !validMatch || !validEmail || !validMobile}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <Link className='register-link' to='/login'>
                            Login
                        </Link>
                    </p>
                </section>
            )}
        </div>
    );
}

export default Register;
