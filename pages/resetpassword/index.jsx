import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";

export default function Login() {
  const router = useRouter();
  //state
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function resetPassword() {
    axios
      .post("/api/forgotpassword", { email: email })
      .then(() => {
        setEmailSent(true);
        setEmailError(false);
      })
      .catch(() => {
        setEmailSent(false);
        setEmailError(true);
      });
  }

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
          type="text"
          className="form-input"
          id="email"
          onKeyUp={keyUpHandler}
        />
        <br />

        {emailSent && (
          <p className={styles.email_sent}>
            If an account with the email exists you will receive an email to
            reset your password
          </p>
        )}
        {emailError && (
          <p className={styles.email_sent_error}>
            There was an error with sending the email please try again
          </p>
        )}
        <button className="form-button" onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}
