import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./app.router";
import "./assets/styles/index.css";
import "./assets/fonts/index.css";
import "./assets/styles/mobile.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRoutes />);
