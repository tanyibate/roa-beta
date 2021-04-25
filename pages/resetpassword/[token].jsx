import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";

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
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [passwordResetFailure, setPasswordResetFailure] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!query) {
      return;
    }
    if (query) {
      const tokenWithId = query.token;
      const token = query.token.slice(0, -1);
      setToken(token);
      const id = tokenWithId.charAt(tokenWithId.length - 1);
      axios.post("/api/getemail", { id: id }).then((res) => {
        setEmail(res.data.email);
      });
    }
    console.log("my query exists!!", query);
  }, [query]);

  function resetPassword() {
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
          value={email}
          readOnly
        />
        <br />
        <label htmlFor="password" className="form-label">
          New Password
        </label>
        <input
          type="text"
          className="form-input"
          id="password"
          onKeyUp={keyUpHandler}
        />
        <br />

        {passwordResetSuccess && <p className={styles.email_sent}>{message}</p>}
        {passwordResetFailure && (
          <p className={styles.email_sent_error}>{message}</p>
        )}
        <button className="form-button" onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}
