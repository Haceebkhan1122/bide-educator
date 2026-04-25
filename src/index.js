import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContainer from "./App";
import "react-toastify/dist/ReactToastify.css";
import "yet-another-react-lightbox/styles.css";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
      <AppContainer />
      <ToastContainer />
  </>
);
