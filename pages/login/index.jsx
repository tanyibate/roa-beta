import React, { useState } from "react";
import axios from "axios";

import "./styles.module.scss";

export default function Login() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function keyUpHandler(event) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    }
    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  }

  function login() {
    const user = { email, password };
    axios
      .post("/api/login", user, {
        timeout: 1000,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  return (
    <div className="login-container">
      <img src="/assets/Logo/ROA_logogreen.png" className="login-logo" />
      <div className="form-input">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onKeyUp={keyUpHandler}
        />
      </div>
      <div className="form-input">
        <input
          type="password"
          id="password"
          placeholder="Password"
          onKeyUp={keyUpHandler}
        />
      </div>

      <button className="login-button" onClick={login}>
        Log In
      </button>
      <p>Or Sign in With</p>
      <div className="signin-with-images-container">
        <img src="/assets/login-page/google-icon.svg" alt="" />
        <img src="/assets/login-page/facebook-icon.svg" alt="" />
      </div>
    </div>
  );
}
