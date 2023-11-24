import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./router";
import "./assets/fonts/index.css";
import "./assets/styles/index.scss";
import "./assets/styles/index.mobile.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
