import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
import HomeIcon from "../../components/home-icon/HomeIcon";
import ReactLoading from "react-loading";

export default function Login() {
  const router = useRouter();
  //state
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notInDB, setnotInDB] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetPassword() {
    setLoading(true);
    axios
      .post("/api/forgotpassword", { email: email })
      .then((res) => {
        setLoading(false);

        if (res.data.notInDB) {
          setnotInDB(true);
          setEmailSent(false);
          setEmailError(false);
        } else {
          setEmailSent(true);
          setEmailError(false);
          setnotInDB(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setEmailSent(false);
        setEmailError(true);
        setnotInDB(false);
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
        {notInDB && (
          <p className={styles.email_sent_error}>
            You are not a part of the ROA Neighborhood, register to join or
            you'll miss out!
          </p>
        )}
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
        <button className="form-button" onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}
