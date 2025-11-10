import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Profile from "./Home/Profile/profile.jsx";
import Navbar from "./Home/Nav/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <Navbar />
    
  </React.StrictMode>
);
