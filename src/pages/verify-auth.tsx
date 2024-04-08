import { Header } from "../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { errorHandler, setFWUserToken } from "../utils/functions";
import { ValidateTokenSchema } from "../utils/schemas";
import { InfoMessage } from "../components/info-message";
import { useState } from "react";

export function VerifyAuth() {
  const location = useLocation();
  const navigate = useNavigate();
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
      setFWUserToken(responseObject);
      isAdmin ? navigate("/admin/dashboard") : navigate("/dashboard");
    } catch (error) {
      console.log({ error }, "validating token");
      const errorMessage = errorHandler(error);
      setLoading(false);
      return Swal.fire({ title: "Error", text: errorMessage, icon: "error" });
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
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("token", value)
                }
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
