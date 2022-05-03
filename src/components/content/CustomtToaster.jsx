import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomtToaster = () => {
  return <ToastContainer autoClose={3000} theme="dark" />;
};

export default CustomtToaster;
