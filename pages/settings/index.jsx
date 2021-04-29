import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getSession, useSession } from "next-auth/client";

import styles from "./settings.module.scss";

export default function index() {
  const [user, setUser] = useState({});

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
  const [submitDetailSuccess, setSubmitDetailSuccess] = useState(false);
  const [submitDetailFailure, setSubmitDetailFailure] = useState(false);

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      const user = res.data;
      setUser(user);
      setLastName(user.last_name);
      setFirstName(user.first_name);
      setEmail(user.email);
      setUsername(user.username);
      if (user.country) setCountry(user.country);
      if (user.city) setCity(user.city);
      setPhoneNumber(user.phone_number);
    });
  }, []);

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

  async function validateDetails() {
    setSubmitDetailFailure(false);
    setSubmitDetailSuccess(false);
    let valid = true;
    if (email) {
      setEmailEntered(true);
      if (email != user.email) {
        try {
          const emailValidData = await axios.post("/api/emailvalid", {
            email: email,
          });
          if (!emailValidData.data.valid) {
            setEmailValid(false);
            valid = false;
          } else {
            setEmailValid(true);
          }
        } catch (err) {
          setEmailValid(false);
          valid = false;
        }
      } else setEmailValid(true);
    } else {
      setEmailEntered(false);
      valid = false;
    }
    if (phone_number) {
      setPhoneNumberEntered(true);
      if (phone_number != user.phone_number) {
        try {
          const phoneNumberValidData = await axios.post(
            "/api/phonenumbervalid",
            {
              phone_number: phone_number,
            }
          );
          if (!phoneNumberValidData.data.valid) {
            setPhoneNumberValid(false);
            valid = false;
          } else {
            setPhoneNumberValid(true);
          }
        } catch (err) {
          setPhoneNumberValid(false);
          valid = false;
        }
      } else {
        setPhoneNumberValid(true);
      }
    } else {
      setPhoneNumberEntered(false);
      valid = false;
    }
    if (username) {
      setUsernameEntered(true);
      if (username != user.username) {
        try {
          const usernameValidData = await axios.post("/api/usernamevalid", {
            username: username,
          });
          if (!usernameValidData.data.valid) {
            setUsernameValid(false);
            valid = false;
          } else setUsernameValid(true);
        } catch (err) {
          setUsernameValid(false);
          valid = false;
        }
      } else setUsernameValid(true);
    } else {
      setUsernameEntered(false);
      valid = false;
    }
    if (first_name) {
      setFirstNameValid(true);
    } else {
      setFirstNameValid(false);
      valid = false;
    }

    if (last_name) setLastNameValid(true);
    else {
      setLastNameValid(false);
      valid = false;
    }
    console.log(valid);
    return valid;
  }

  function submitDetails() {
    validateDetails().then((res) => {
      if (res) {
        axios
          .put("/api/updatedetails", {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            city: city,
            country: country,
          })
          .then((res) => {
            if (res.data.updated) {
              setSubmitDetailSuccess(true);
              setSubmitDetailFailure(false);
            } else {
              setSubmitDetailSuccess(false);
              setSubmitDetailFailure(true);
            }
          })
          .catch(() => {
            setSubmitDetailSuccess(false);
            setSubmitDetailFailure(true);
          });
      }
    });
  }

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Settings</h1>

      <Tabs style={{ maxWidth: "522px", width: "100%", padding: "0 2px" }}>
        <TabList>
          <Tab>Personal Details</Tab>
          <Tab>Password</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.form_group_container}>
            <p>How can we contact you?</p>
            <div className={styles.form_group_wrapper}>
              <div className={styles.form_element}>
                <p>Email</p>
                <div className={styles.form_input}>
                  <input
                    type="email"
                    id="email"
                    placeholder="user@roabeta.com"
                    onChange={keyUpHandler}
                    value={email}
                  />
                </div>
                {!emailValid && (
                  <p className={styles.error}>Email is already in use</p>
                )}
                {!emailEntered && (
                  <p className={styles.error}>Please enter a email</p>
                )}
              </div>
              <div className={styles.form_element}>
                <p>Username</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="username"
                    placeholder="roauser123"
                    onChange={keyUpHandler}
                    value={username}
                  />
                </div>
                {!usernameValid && (
                  <p className={styles.error}>Username is already in use</p>
                )}
                {!usernameEntered && (
                  <p className={styles.error}>Please enter a username</p>
                )}
              </div>
              <div className={styles.form_element}>
                <p>Phone number</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="phonenumber"
                    placeholder="072923232232323"
                    onChange={keyUpHandler}
                    value={phone_number}
                  />
                </div>
                {!phone_numberValid && (
                  <p className={styles.error}>Phone number is already in use</p>
                )}
                {!phone_numberEntered && (
                  <p className={styles.error}>Please enter a phone number</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.form_group_container}>
            <p>What do we call you?</p>
            <div className={styles.form_group_wrapper}>
              <div className={styles.form_element}>
                <p>First Name</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="Al"
                    onChange={keyUpHandler}
                    value={first_name}
                  />
                </div>
                {!first_nameValid && (
                  <p className={styles.error}>Please enter a first name</p>
                )}
              </div>
              <div className={styles.form_element}>
                <p>Last Name</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Pacino"
                    onChange={keyUpHandler}
                    value={last_name}
                  />
                </div>
                {!last_nameValid && (
                  <p className={styles.error}>Please enter a last name</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.form_group_container}>
            <p>Where are you hiding at?</p>
            <div className={styles.form_group_wrapper}>
              <div className={styles.form_element}>
                <p>Country</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    onChange={keyUpHandler}
                    value={country}
                  />
                </div>
              </div>
              <div className={styles.form_element}>
                <p>City</p>
                <div className={styles.form_input}>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    onChange={keyUpHandler}
                    value={city}
                  />
                </div>
              </div>
            </div>
          </div>
          {submitDetailSuccess && (
            <p className={styles.update_success}>
              Your details have been sucessfully updated.
            </p>
          )}
          {submitDetailFailure && (
            <p className={styles.update_error}>
              There was an error with updating your details, try again later or
              get in contact with us through our contact page to get your
              details changed.
            </p>
          )}
          <div className={styles.button_container}>
            <button
              className="form-button"
              style={{ minWidth: "100%", margin: "0px" }}
              onClick={submitDetails}
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
                  placeholder="@JrTasdsXv765"
                  onChange={keyUpHandler}
                />
              </div>
              <p>New Password</p>
              <div className={styles.form_input}>
                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="@JrTasdsXv765"
                  onChange={keyUpHandler}
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user.email,
    },
  };
}
