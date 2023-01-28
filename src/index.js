import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDEQKAtQQsdHoW_16SM227YzEBNq6ATIKg",
  authDomain: "the-blog-66d02.firebaseapp.com",
  projectId: "the-blog-66d02",
  storageBucket: "the-blog-66d02.appspot.com",
  messagingSenderId: "969574380714",
  appId: "1:969574380714:web:f907140e648929bf060cd3",
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
