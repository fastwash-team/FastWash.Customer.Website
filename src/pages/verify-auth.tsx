import React from "react";
import { Header } from "../components/header";
import { useLocation, useNavigate } from "react-router-dom";

export function VerifyAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    state: { isAdmin },
  } = location;

  console.log({ isAdmin });
  return (
    <div className='login'>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4 col-sm-12 form'>
            <h2>Enter Code</h2>
            <p>Enter code that was sent to your email or phone number</p>
            <div className='mt3'>
              <label>Code</label>
              <input
                className='form-control'
                placeholder='Enter 4 digit code'
              />
            </div>
            <button
              onClick={() =>
                isAdmin ? navigate("/admin/dashboard") : navigate("/dashboard")
              }
            >
              Take me in
            </button>
            <p className='no-account'>
              Didn’t get code? <a>Resend</a>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}
