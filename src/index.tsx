import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./router";
import "./assets/fonts/index.css";
import "./assets/styles/styles.scss";
import "./assets/styles/styles.mobile.scss";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
