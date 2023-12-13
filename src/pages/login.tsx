import React from "react";
import { Header } from "../components/header";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/verify-auth");
  };

  return (
    <div className='login'>
      <Header />
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4 col-sm-12 form'>
          <h2>Login</h2>
          <p>Log into your account with your email or phone number</p>
          <div className='mt3'>
            <label>Email or Phone</label>
            <input
              className='form-control'
              placeholder='Enter email or phone number'
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          <p className='no-account'>
            Don’t have an account? <a href='/register'>Sign up</a>
          </p>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}
