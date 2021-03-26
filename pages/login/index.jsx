import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  logIn,
  setAccessToken,
  setRefreshToken,
} from "../../store/actions/index";

import styles from "./styles.module.scss";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  //state
  const [email, setEmail] = useState("");
  const [incorrectDetails, setIncorrectDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [loadApp, setLoadApp] = useState(false);

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
        timeout: 5000,
      })
      .then((response) => {
        console.log(response);
        dispatch(logIn());
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        setLoadApp(true);
        setTimeout(function () {
          router.push("/artists");
        }, 2000);
      })
      .catch((response) => {
        console.log(response);
        setIncorrectDetails(true);
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
      {incorrectDetails && <p>Incorrect Login Details</p>}

      <button className="login-button" onClick={login}>
        Log In
      </button>
      <p>Or Sign in With</p>
      <div className="signin-with-images-container">
        <img src="/assets/login-page/google-icon.svg" alt="" />
        <img src="/assets/login-page/facebook-icon.svg" alt="" />
      </div>
      {loadApp && (
        <div className={styles.app_transition}>
          <img src="/assets/Logo/ROA_logowhite.png" alt="" />
        </div>
      )}
    </div>
  );
}
