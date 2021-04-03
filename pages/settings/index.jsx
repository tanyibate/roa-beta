import React, { useState } from "react";

import styles from "./settings.module.scss";

export default function index() {
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

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.form_group_container}>
        <p>Do you want to change your login details?</p>
        <div className={styles.form_group_wrapper}>
          <p>Email</p>
          <div className={styles.form_input}>
            <input
              type="text"
              id="email"
              placeholder="AlfredoPacino@gmail.com"
              onKeyUp={keyUpHandler}
            />
          </div>
          <p>Old Password</p>
          <div className={styles.form_input}>
            <input
              type="password"
              id="password"
              placeholder="Lolololol"
              onKeyUp={keyUpHandler}
            />
          </div>
          <p>New Password</p>
          <div className={styles.form_input}>
            <input
              type="password"
              id="password"
              placeholder="Lolololol"
              onKeyUp={keyUpHandler}
            />
          </div>
        </div>
      </div>

      <div className={styles.form_group_container}>
        <p>Where are you hiding at?</p>
        <div className={styles.form_group_wrapper}>
          <div className={styles.form_input}>
            <input
              type="text"
              id="country"
              placeholder="Country"
              onKeyUp={keyUpHandler}
            />
          </div>
          <div className={styles.form_input}>
            <input
              type="text"
              id="city"
              placeholder="City"
              onKeyUp={keyUpHandler}
            />
          </div>
        </div>
      </div>
      <button className="login-button">Change your details</button>
    </div>
  );
}
