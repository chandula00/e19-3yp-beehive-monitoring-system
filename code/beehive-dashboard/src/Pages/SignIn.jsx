import React from 'react';
import Banner from "../Assets/Sign up Bee image.png";
import Polygon from "../Assets/Sign up Polygon.png";
import UserIcon from "../Assets/username.png";
import LockIcon from "../Assets/password.png";
import Logo from "../Assets/Logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState,useContext } from "react";
import {AuthContext} from '../Context/AuthContext';
import '../Styles/Pages/SignIn.scss';


function SignIn() {
    const [formData, setFormData] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    
    //Add Some Error handling

    const handleLogin = async (e) => {
        e.preventDefault();
        login(formData.username, formData.password);
    };
    
    //Old Method

    // const signIn = async (e) => {
    //     e.preventDefault();
        
    //     if (!formData.username || !formData.password) {
    //         console.error("Please fill in both username and password.");
    //         return;
    //     }
        
    //     try {
    //         console.log(formData);
    //         const res = await fetch('http://localhost:5001/api/user/login', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(formData),
    //         });
    //         const data = await res.json();
    //         console.log(data);
    //         if (data.success === false) {
    //           console.error(data.message);
    //           return;
    //         }
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    
      

  console.log('SignIn');
  return (
    <div>
        <div className="split left">
            <div className="signin-banner-container">
                <img src={Banner} alt="" className="signin-banner-image" />
            </div>
         </div>
        <div className="split right">
            <div className="centered">
                <img src={Polygon} alt="" className="polygon-image" />
                <div className="signin-form">
                    <form className='login_right' onSubmit={handleLogin}>
                        <Link to="/"><img src={Logo} alt="" className="signin-logo" /></Link>
                        <h3>Login to your account</h3>
                        <div className='inputs'>
                            <div className="input">
                                <img src={UserIcon} alt="" className="user-icon" />
                                <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                onChange={handleChange}
                                />
                            </div>
                            <div className='input'>
                                <img src={LockIcon} alt="" className="lock-icon" />
                                <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className='signin-button'>
                            <button type="submit">SIGN IN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignIn;