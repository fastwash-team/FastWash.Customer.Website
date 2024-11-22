import { useFormik } from "formik";
import { Header } from "../components/header";
import { LoginSchema } from "../schemas/Login.Schema";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  errorHandler,
  isUserLoggedIn,
  validateEmail,
} from "../utils/functions";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import { InfoMessage } from "../components/info-message";

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) return navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: () => handleLogin(),
    validationSchema: LoginSchema,
  });

  const handleLogin = async () => {
    if (!formik.values.email) return;
    if (!validateEmail(formik.values.email))
      return Swal.fire({
        title: "Error",
        text: "Invalid Email. Please, put in a valid email",
        icon: "error",
      });
    setLoading(true);
    try {
      await axios.post(
        `${REACT_APP_API_BASE_URL}/api/Authentication/login/initiate`,
        { userId: formik.values.email }
      );
      toast.info("A verification code has been sent to your inbox");
      navigate("/verify-auth", {
        state: {
          email: formik.values.email,
        },
      });
    } catch (error) {
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
            <h2>Login</h2>
            <p>Log into your account with your email</p>
            <div className='mt3'>
              <label>Email</label>
              <input
                className='form-control'
                placeholder='Enter email'
                value={formik.values.email}
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("email", value)
                }
              />
              {formik?.errors?.email && (
                <InfoMessage message={formik.errors.email} />
              )}
            </div>
            <br />
            <button disabled={loading} onClick={() => formik.handleSubmit()}>
              {loading ? (
                <div
                  className='spinner-border text-success app-spinner'
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <p className='no-account'>
              Don’t have an account? <a href='/register'>Sign up</a>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}
