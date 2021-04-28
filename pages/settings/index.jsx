import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./settings.module.scss";

export default function index() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailEntered, setEmailEntered] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameEntered, setUsernameEntered] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [first_nameValid, setFirstNameValid] = useState(true);
  const [last_nameValid, setLastNameValid] = useState(true);
  const [phone_numberValid, setPhoneNumberValid] = useState(true);
  const [phone_numberEntered, setPhoneNumberEntered] = useState(true);

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
    if (event.target.id === "firstname") {
      if (first_name) setFirstNameValid(true);
      setFirstName(event.target.value);
    }
    if (event.target.id === "lastname") {
      if (last_name) setLastNameValid(true);
      setLastName(event.target.value);
    }
    if (event.target.id === "phonenumber") {
      setPhoneNumber(event.target.value);
    }

    if (event.target.id === "username") {
      setUsername(event.target.value);
    }
    if (event.target.id === "city") {
      setCity(event.target.value);
    }
    if (event.target.id === "country") {
      setCountry(event.target.value);
    }
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
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Settings</h1>

      <Tabs>
        <TabList>
          <Tab>Personal Details</Tab>
          <Tab>Password</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.form_group_container}>
            <p>How can we contact you?</p>
            <div className={styles.form_group_wrapper}>
              <div className={styles.form_input}>
                <input
                  type="email"
                  id="email"
                  placeholder="user@roabeta.com"
                  onKeyUp={keyUpHandler}
                />
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="username"
                  placeholder="roauser123"
                  onKeyUp={keyUpHandler}
                />
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="phone_number"
                  placeholder="072923232232323"
                  onKeyUp={keyUpHandler}
                />
              </div>
            </div>
          </div>
          <div className={styles.form_group_container}>
            <p>What do we call you?</p>
            <div className={styles.form_group_wrapper}>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Al"
                  onKeyUp={keyUpHandler}
                />
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Pacino"
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
          <div className={styles.button_container}>
            <button
              className="form-button"
              style={{ minWidth: "100%", margin: "0px" }}
            >
              Change your details
            </button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={styles.form_group_container}>
            <p>Do you want to change your login details?</p>
            <div className={styles.form_group_wrapper}>
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
                  id="confirmpassword"
                  placeholder="@JrTasdsXv765"
                  onKeyUp={keyUpHandler}
                />
              </div>
            </div>
          </div>
          <div className={styles.button_container}>
            <button
              className="form-button"
              style={{ minWidth: "100%", margin: "0px" }}
            >
              Change password
            </button>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
