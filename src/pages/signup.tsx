import React from "react";
import { Header } from "../components/header";

export function Signup() {
  return (
    <div className='login'>
      <Header />
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4 col-sm-12 form'>
          <h2>Sign up</h2>
          <p>Create your account with your email or phone number</p>
          <div className='mt3'>
            <label>Email or Phone</label>
            <input
              className='form-control'
              placeholder='Enter email or phone number'
            />
          </div>
          <button>Create Account</button>
          <p className='no-account'>
            Already have an account? <a href='/login'>Sign in</a>
          </p>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}