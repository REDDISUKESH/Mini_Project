import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Setting.css';
import { useLocation,useNavigate } from 'react-router-dom';

const Setting = () => {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:3500/images/";
    const Url = "http://localhost:3500";
    const location = useLocation();
    const navigate=useNavigate();
    const id = location.pathname.split("/")[1];
    const [updateMode, setUpdateMode] = useState(false);
    const [userData, setUserData] = useState(null);
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [Mobile, setMobile] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); 

    useEffect(() => {
        if (user) {
            const getuserdata = async () => {
                try {
                    const res = await axios.get(`${Url}/auth/user/${user._id}`);
                    setUserData(res.data);
                    setUserName(res.data.UserName);
                    setEmail(res.data.Email);
                    setMobile(res.data.Mobile);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            getuserdata();
        }
    }, []);

    const handleUpdate = () => {
        setUpdateMode(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${Url}/auth/user/${user._id}`);
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true); 
        dispatch({ type: "UPDATE_START" });
        const updateUser = {
            userId: user._id,
        };

        if (UserName) {
            updateUser.UserName = UserName;
        } else {
            updateUser.UserName = user.UserName;
        }

        if (Mobile) {
            updateUser.Mobile = Mobile;
        } else {
            updateUser.Mobile = user.Mobile;
        }

        if (Email) {
            updateUser.Email = Email;
        } else {
            updateUser.Email = user.Email;
        }

        if (Password) {
            updateUser.Password = Password;
        } else {
            updateUser.Password = user.Password;
        }

        if (ConfirmPassword) {
            updateUser.Confirmpassword = ConfirmPassword;
        } else {
            updateUser.ConfirmPassword = user.ConfirmPassword;
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updateUser.ProfilePicture = filename;
            try {
                await axios.post(`${Url}/upload`, data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const response = await axios.put(`${Url}/auth/user/${user._id}`, updateUser);
            window.location.reload();
            setSuccess(true);
            setIsUpdating(false);
            dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
        } catch (err) {
            console.log('Error updating user:', err);
            setIsUpdating(false);
            dispatch({ type: "UPDATE_SUCCESS" });
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')

    };

    return (
        <div className="setting">
            <div className="settingsWrapper">
                <div className="settingTitle">
                    
                    {!updateMode && <span className="settingUpdateTitle">Update Your Account</span>}
                </div>
                <form className="settingForm" onSubmit={handleSubmit}>
                <label htmlFor="profilePicture">Profile Picture</label>
<div className="settingPP">
    {(updateMode || (userData && userData.ProfilePicture)) && 
        <>
            <img className="settingImg" src={file ? URL.createObjectURL(file) : PF + (userData.ProfilePicture)} alt="ProfilePicture" />
            {updateMode && 
                <label htmlFor="fileInput">
                    <FontAwesomeIcon className="settingPPIcon" icon={faUserCircle} />
                </label>
            }
            {updateMode && 
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
            }
        </>
    }
</div>

                    <label htmlFor="userName">User Name</label>
                    <input type="text" id="userName" placeholder={userData && userData.UserName} value={UserName} onChange={(e) => setUserName(e.target.value)} disabled={!updateMode} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder={userData && userData.Email} value={Email} onChange={(e) => setEmail(e.target.value)} disabled={!updateMode} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter new password" value={Password} onChange={(e) => setPassword(e.target.value)} disabled={!updateMode} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm new password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={!updateMode} />
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" placeholder={userData && userData.Mobile} value={Mobile} onChange={(e) => setMobile(e.target.value)} disabled={!updateMode} />
                    {updateMode && <button className="settingSubmit" type="submit" disabled={isUpdating}>Update</button>}
                    <button className="settingSubmit" onClick={handleLogout}>
                        Logout
                    </button>
                </form>
                {success && <span style={{ color: "green", fontSize: "24px" }}>Profile has been updated</span>}
                {!updateMode &&  <button className="settingedit" onClick={handleUpdate}>Edit Profile</button>}
                <button className="settingDeleteTitle"  onClick={handleDelete}>Delete</button>
    
            </div>
        </div>
    );
};

export default Setting;
