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
      <div className="form-input">
        <input type="text" id="password" placeholder="Confirm Password" />
      </div>

      <button className="login-button">Register</button>
    </div>
  );
}
