import { Header } from "../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  errorHandler,
  isUserLoggedIn,
  validateEmail,
} from "../utils/functions";
import { LoginSchema } from "../utils/schemas";
import { InfoMessage } from "../components/info-message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";

export function Login(props: { isAdmin?: boolean }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAdmin = !!props?.isAdmin || false;

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: () => handleLogin(),
    validationSchema: LoginSchema,
  });

  useEffect(() => {
    if (isUserLoggedIn(isAdmin)) {
      // if (isAdmin) return navigate("/dashboard");
      return navigate("/dashboard");
    }
  }, []);

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
          isAdmin,
          email: formik.values.email,
        },
      });
    } catch (error) {
      console.log("login error", error);
      const errorMessage = errorHandler(error);
      setLoading(false);
      return Swal.fire({ title: "Error", text: errorMessage, icon: "error" });
    }
  };

  const handleRegisterRoute = () => {
    navigate("/register");
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
            <button
              disabled={loading}
              onClick={() => formik.handleSubmit()}
              // onClick={() => toast.info("Hello there", { autoClose: 3000000 })}
              // onClick={() =>
              //   toast(
              //     <div>
              //       <p></p>
              //       <div>
              //         <span>Great seeing you</span>
              //         <br />
              //         <span>When will I see you next</span>
              //       </div>
              //     </div>,
              //     { autoClose: 2300000000 }
              //   )
              // }
            >
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
              Don’t have an account?{" "}
              <a onClick={handleRegisterRoute}>Sign up</a>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}
