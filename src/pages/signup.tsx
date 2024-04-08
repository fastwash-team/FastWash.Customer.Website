import React, { useState } from "react";
import { Header } from "../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpSchema } from "../utils/schemas";
import { InfoMessage } from "../components/info-message";
import { errorHandler } from "../utils/functions";

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { fullName: "", email: "", phoneNumber: "" },
    validationSchema: SignUpSchema,
    onSubmit: () => handleSignup(),
  });

  const handleSignup = async () => {
    setLoading(true);
    try {
      const body = { ...formik.values, userType: 1 };
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/Authentication/signup`,
        body
      );
      return navigate("/login");
    } catch (error) {
      console.log("sign up error", error);
      const errorMessage = errorHandler(error);
      setLoading(false);
      return Swal.fire({ title: "Error", text: errorMessage, icon: "error" });
    }
  };

  const handleLoginRoute = () => {
    navigate("/login");
  };

  return (
    <div className='login'>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4 col-sm-12 form'>
            <h2>Sign up</h2>
            <p>Create your account</p>
            <div className='mt-3'>
              <label>Full Name</label>
              <input
                className='form-control'
                placeholder='Full name'
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("fullName", value)
                }
              />
              {formik?.errors?.fullName && (
                <InfoMessage message={formik.errors.fullName} />
              )}
            </div>
            <div className='mt-3 mb-5'>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <label>Phone number</label>
                  <div className='phone-input-0'>
                    <span>+234</span>
                    <input
                      type='number'
                      value={formik.values.phoneNumber}
                      maxLength={11}
                      onChange={(e) =>
                        formik.setFieldValue("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                  {formik?.errors?.phoneNumber && (
                    <InfoMessage message={formik.errors.phoneNumber} />
                  )}
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Email</label>
                  <input
                    className='form-control'
                    placeholder='email@address.com'
                    name='contactemail'
                    id='contactemail'
                    onChange={({ target: { value } }) =>
                      formik.setFieldValue("email", value)
                    }
                  />
                  {formik?.errors?.email && (
                    <InfoMessage message={formik.errors.email} />
                  )}
                </div>
              </div>
            </div>
            <button disabled={loading} onClick={() => formik.handleSubmit()}>
              {loading ? (
                <div
                  className='spinner-border text-success app-spinner'
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
            <p className='no-account'>
              Already have an account? <a onClick={handleLoginRoute}>Sign in</a>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}
