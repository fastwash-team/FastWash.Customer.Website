import { useState } from "react";
import { Header } from "../components/header";
import { phone } from "phone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpSchema } from "../utils/schemas";
import { InfoMessage } from "../components/info-message";
import { errorHandler, validateEmail } from "../utils/functions";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { fullName: "", email: "", phoneNumber: "" },
    validationSchema: SignUpSchema,
    onSubmit: () => handleSignup(),
  });

  const handleSignup = async () => {
    if (!validateEmail(formik.values.email))
      return Swal.fire({
        title: "Error",
        text: "Invalid Email. Please, put in a valid email",
        icon: "error",
      });
    const phoneNumber = formik.values.phoneNumber || "";
    const { isValid: numberIsValid, phoneNumber: formattedPhoneNumber } = phone(
      phoneNumber,
      {
        country: "NG",
      },
    );
    if (!numberIsValid) {
      formik.setFieldError("phoneNumber", "Invalid Phone Number");
      return Swal.fire({
        title: "Error",
        text: "Invalid Phone Number. Please, put in a valid phone number",
        icon: "error",
      });
    }
    setLoading(true);
    try {
      const body = { ...formik.values, userType: 1 };
      await axios.post(`${REACT_APP_API_BASE_URL}/api/Authentication/signup`, {
        ...body,
        phoneNumber: formattedPhoneNumber,
      });
      localStorage.clear();
      Swal.fire({
        title: "Successful!",
        text: "You have been registered successfully, please login",
      });
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
    <div className="login">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 col-sm-12 form">
            <h2>Sign up</h2>
            <p>Create your account</p>
            <div className="mt-3">
              <label>Full Name</label>
              <input
                className="form-control"
                placeholder="Full name"
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("fullName", value)
                }
              />
              {formik?.errors?.fullName && (
                <InfoMessage message={formik.errors.fullName} />
              )}
            </div>
            <div className="mt-3 mb-5">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label>Phone number</label>
                  <div className="phone-input-0">
                    <span>+234</span>
                    <input
                      type="number"
                      value={formik.values.phoneNumber}
                      max={10}
                      maxLength={10}
                      onChange={(e) => {
                        if (e.target.value.length <= 10)
                          formik.setFieldValue("phoneNumber", e.target.value);
                      }}
                    />
                  </div>
                  {formik?.errors?.phoneNumber && (
                    <InfoMessage message={"Incorrect Phone Number"} />
                  )}
                </div>
                <div className="col-md-6 col-sm-12">
                  <label>Email</label>
                  <input
                    className="form-control"
                    placeholder="email@address.com"
                    name="contactemail"
                    id="contactemail"
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
                  className="spinner-border text-success app-spinner"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
            <p className="no-account">
              Already have an account? <a onClick={handleLoginRoute}>Sign in</a>
            </p>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}
