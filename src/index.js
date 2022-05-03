import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setUser } from "./redux/reducers/authSlice";

axios.defaults.baseURL = "https://banking-webapp.herokuapp.com/api/v1";

const logoutUser = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.clear();
  store.dispatch(setUser({}));
};

// For POST requests
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) logoutUser();
    return Promise.reject(err);
  }
);

if (localStorage.accessToken) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.accessToken;
  const user = jwtDecode(localStorage.accessToken);
  store.dispatch(setUser(user));
} else {
  delete axios.defaults.headers.common["Authorization"];
  store.dispatch(setUser({}));
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
