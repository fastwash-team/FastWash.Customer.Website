import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  errorHandler,
  getTokenClaims,
  redirectAfterLogin,
  setFWAdminToken,
  setFWUserToken,
} from "../utils/functions";
import { ValidateTokenSchema } from "../utils/schemas";
import { InfoMessage } from "../components/info-message";
import { useState } from "react";

export function VerifyAuth() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const {
    state: { isAdmin, email },
  } = location;

  const formik = useFormik({
    initialValues: { token: "" },
    onSubmit: () => handleValidateToken(),
    validationSchema: ValidateTokenSchema,
  });

  const resendEmail = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/Authentication/login/initiate`,
        { userId: email }
      );
      Swal.fire({
        title: "User Verification",
        text: "A verification token has been sent to your inbox, provide to login.",
        icon: "info",
      });
      setLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      setLoading(false);
      return Swal.fire({ title: "Error", text: errorMessage, icon: "error" });
    }
  };

  const handleValidateToken = async () => {
    setLoading(true);
    try {
      const {
        data: { responseObject },
      } = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/Authentication/login/complete`,
        { passCode: formik.values.token }
      );
      const claims = getTokenClaims(responseObject.access_token);
      console.log({ claims, isAdmin });
      if (isAdmin && claims?.InternalUser) {
        setFWAdminToken(responseObject);
        redirectAfterLogin("/dashboard"); // admin dashboard
      }
      if (isAdmin && claims?.ExternalUser) {
        setLoading(false);
        return Swal.fire({
          title: "Error",
          text: "This user is not an admin. You cannot enter here!",
          icon: "error",
        });
      }
      if (!isAdmin && claims?.InternalUser) {
        setLoading(false);
        return Swal.fire({
          title: "Error",
          text: "This user does not have a valid account. Please create a wash to register!",
          icon: "error",
        });
      }
      if (!isAdmin && claims?.ExternalUser) {
        setFWUserToken(responseObject);
        redirectAfterLogin("/dashboard");
      }
    } catch (error) {
      console.log({ error }, "validating token");
      let errorMessage = errorHandler(error);
      if (errorMessage.toLowerCase() === "user not found")
        errorMessage = "Invalid Email Address, user not found!";
      setLoading(false);
      return Swal.fire({ title: "Error", text: errorMessage, icon: "error" });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    if (/^[0-9]*$/.test(newValue)) {
      const token = Number(newValue);
      if (String(token).length <= 6) {
        formik.setFieldValue("token", newValue);
      }
    }
  };

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
                placeholder='Enter 6 digit code'
                value={formik.values.token}
                onChange={handleChange}
                // onChange={(e) => {
                //   console.log("sdsss", e);
                //   if (!e) return;
                //   const { value } = e.target;
                //   const token = Number(value);
                //   if (String(token).length <= 6) {
                //     formik.setFieldValue("token", value);
                //   }
                // }}
                type='number'
                max={6}
              />
              {formik?.errors?.token && (
                <InfoMessage message={formik.errors.token} />
              )}
            </div>
            <br />
            <button onClick={() => formik.handleSubmit()} disabled={loading}>
              {loading ? (
                <div
                  className='spinner-border text-success app-spinner'
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
              ) : (
                "Take me in"
              )}
            </button>
            <p className='no-account' onClick={resendEmail}>
              Didn’t get code? <a>Resend</a>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}
