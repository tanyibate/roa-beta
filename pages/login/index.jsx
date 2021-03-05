import React, { useState } from "react";

import "./styles.module.scss";

export default function Login() {
  return (
    <div className="login-container">
      <img src="/assets/Logo/ROA_logowhite.png" className="login-logo" />
      <div className="form-input">
        <input type="text" id="username" placeholder="Email" />
      </div>
      <div className="form-input">
        <input type="text" id="password" placeholder="Password" />
      </div>

      <button className="login-button">Log In</button>
      <p>Or Sign in With</p>
      <div className="signin-with-images-container">
        <img src="/assets/login-page/google-icon.svg" alt="" />
        <img src="/assets/login-page/facebook-icon.svg" alt="" />
      </div>
    </div>
  );
}
