import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./router";
import { ToastContainer } from "react-toastify";
import "./assets/fonts/index.css";
import "./assets/styles/styles.scss";
import "./assets/styles/styles.mobile.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <>
    <AppRoutes />
    <ToastContainer />
  </>
  // </React.StrictMode>
);
