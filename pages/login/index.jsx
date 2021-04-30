import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/client";
import styles from "../../styles/Login.module.scss";
import HomeIcon from "../../components/home-icon/HomeIcon";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  //state
  const [email, setEmail] = useState("");
  const [incorrectDetails, setIncorrectDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [loadApp, setLoadApp] = useState(false);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal`,
      redirect: false,
    });
    if (res?.error) setIncorrectDetails(true);
    if (res.url) router.push(res.url);
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
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          onKeyUp={keyUpHandler}
        />
        {incorrectDetails && <p>Incorrect Login Details</p>}
        <button className="form-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
      <p>
        Did you forget your password?{" "}
        <a style={{ color: "#1dd760" }} href="/resetpassword">
          Click here
        </a>
      </p>

      {/*<p>Or Sign in With</p>
      <div className="signin-with-images-container">
        <img src="/assets/login-page/google-icon.svg" alt="" />
        <img src="/assets/login-page/facebook-icon.svg" alt="" />
      </div>*/}

      {loadApp && (
        <div className={styles.app_transition}>
          <img src="/assets/Logo/ROA_logowhite.png" alt="" />
        </div>
      )}
    </div>
  );
}
