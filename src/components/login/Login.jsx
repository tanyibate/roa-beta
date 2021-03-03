import React, { useState } from "react";
import logo from "../../assets/Logo/ROA_logowhite.png";
import google from "../../assets/login-page/google-icon.svg";
import facebook from "../../assets/login-page/facebook-icon.svg";

import "./styles.scss";

export default function Login() {
  return (
    <div className="login-container">
      <img src={logo} className="login-logo" />
      <div className="form-input">
        <input type="text" id="username" placeholder="Email" />
      </div>
      <div className="form-input">
        <input type="text" id="password" placeholder="Password" />
      </div>

      <button className="login-button">Log In</button>
      <p>Or Sign in With</p>
      <div className="signin-with-images-container">
        <img src={google} alt="" />
        <img src={facebook} alt="" />
      </div>
    </div>
  );
}
