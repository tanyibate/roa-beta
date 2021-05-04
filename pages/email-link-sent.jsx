import React, { useState } from "react";
import styles from "../styles/Login.module.scss";
import HomeIcon from "../components/home-icon/HomeIcon";

export default function EmailLinkSent() {
  return (
    <div className="login-container" style={{ padding: "60px 20px" }}>
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

      <h1>Check your email</h1>
      <h3>A sign in link has been sent to your email address.</h3>
    </div>
  );
}
