import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/client";
import styles from "../../styles/Login.module.scss";
import HomeIcon from "../../components/home-icon/HomeIcon";
import ReactLoading from "react-loading";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  //state
  const [email, setEmail] = useState("");
  const [emailSignIn, setEmailSignIn] = useState(false);

  const [incorrectDetails, setIncorrectDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [loadApp, setLoadApp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailSignIn) {
      setIncorrectDetails(false);
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal`,
        redirect: false,
      });
      setLoading(false);
      if (res?.error) setIncorrectDetails(true);
      if (res.url) router.push(res.url);
    } else emailLogin();
  };
  const googleLogin = async () => {
    signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
      redirect: false,
    });
  };

  const emailLogin = async () => {
    setLoading(true);
    signIn("email", {
      email: email,
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
      redirect: false,
    }).then((res) => {
      setLoading(false);
      router.push("email-link-sent");
    });
  };

  function keyUpHandler(event) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    }
    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  }

  return (
    <div className="login-container">
      <HomeIcon />
      <div className={styles.register_button_container}>
        <p>Dont't have an account? </p>
        <button
          onClick={() => {
            router.push("/register");
          }}
        >
          Register
        </button>
      </div>
      <img
        src="/assets/Logo/ROA_logogreen.png"
        style={{ height: "120px", width: "120px" }}
      />

      <div className="form-container">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          onKeyUp={keyUpHandler}
        />
        <br />
        {!emailSignIn && (
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              onKeyUp={keyUpHandler}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          Passwordless Signin
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setEmailSignIn(e.target.checked);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {incorrectDetails && (
          <p style={{ color: "red" }}>
            Incorrect Login Details, try again or use passwordless sign in
          </p>
        )}
        <button className="form-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
      {loading && (
        <div
          style={{
            padding: "5px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="spin" color="#1dd760" height={50} width={50} />
        </div>
      )}
      <p>
        Did you forget your password?{" "}
        <a style={{ color: "#1dd760" }} href="/resetpassword">
          Click here
        </a>
      </p>
      {false && (
        <div>
          <p>Or Sign in With</p>
          <div className="signin-with-images-container">
            <img
              src="/assets/login-page/google-icon.svg"
              alt=""
              onClick={googleLogin}
            />
            <img src="/assets/login-page/facebook-icon.svg" alt="" />
          </div>
        </div>
      )}

      {loadApp && (
        <div className={styles.app_transition}>
          <img src="/assets/Logo/ROA_logowhite.png" alt="" />
        </div>
      )}
    </div>
  );
}
