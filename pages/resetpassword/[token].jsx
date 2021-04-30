import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
import HomeIcon from "../../components/home-icon/HomeIcon";

export default function Login() {
  const router = useRouter();
  function useQuery() {
    const router = useRouter();
    const hasQueryParams =
      /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    const ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready) return null;
    return router.query;
  }
  const query = useQuery();

  //state
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [passwordResetFailure, setPasswordResetFailure] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Reset Password");

  useEffect(() => {
    if (!query) {
      return;
    }
    if (query) {
      setToken(query.token);
      console.log(query.token);
      axios.post("/api/getemail", { token: query.token }).then((res) => {
        if (res.data.email) setEmail(res.data.email);
        else {
          setMessage("Invalid or expired link");
          setPasswordResetFailure(true);
        }
      });
    }
  }, [query]);
  function submit() {
    if (password != confirmPassword) {
      setPasswordMatch(false);
      setPasswordResetFailure(false);
      setPasswordResetSuccess(false);
    } else {
      setPasswordMatch(true);
      resetPassword();
    }
  }

  function resetPassword() {
    if (!passwordResetFailure) {
      axios
        .post("/api/resetpassword", {
          email: email,
          token: token,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (!response.data.error) {
            setPasswordResetSuccess(true);
            setPasswordResetFailure(false);
            setMessage(response.data.message);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else {
            setButtonText("Resend Email");
            setPasswordResetSuccess(false);
            setPasswordResetFailure(true);
            setMessage(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setPasswordResetSuccess(false);
          setPasswordResetFailure(true);
        });
    } else {
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
  }

  function keyUpHandler(event) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    }
    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
    if (event.target.id === "confirmpassword") {
      setConfirmPassword(event.target.value);
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
        <div className={styles.form_element}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-input"
            id="email"
            value={email}
            readOnly={!passwordResetFailure}
            onChange={keyUpHandler}
          />
        </div>

        {!passwordResetFailure && (
          <div className={styles.form_element}>
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              onKeyUp={keyUpHandler}
            />
          </div>
        )}

        {!passwordResetFailure && (
          <div className={styles.form_element}>
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-input"
              id="confirmpassword"
              onKeyUp={keyUpHandler}
            />
          </div>
        )}
        {!passwordMatch && !(emailSent || emailError) && (
          <p className={styles.email_sent_error}>The passwords need to match</p>
        )}
        {passwordResetSuccess && !(emailSent || emailError) && (
          <p className={styles.email_sent}>{message}</p>
        )}
        {passwordResetFailure && !(emailSent || emailError) && (
          <p className={styles.email_sent_error}>{message}</p>
        )}
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
        <button className="form-button" onClick={submit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
