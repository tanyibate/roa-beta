import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/register.module.scss";
import { useSelector } from "react-redux";
import { getSession, useSession } from "next-auth/client";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  var classNames = require("classnames");

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);

  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const [recaptchaValid, setRecaptchaValid] = useState(true);

  const { referral_code } = router.query;
  const [page, setPage] = useState(1);
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
  }

  const validate = async () => {
    var passwordValidator = require("password-validator");

    // Create a schema
    var schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .symbols(1)
      .has()
      .digits(1) // Must have at least 1 digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
    let emailValid2 = true;
    let usernameValid2 = true;

    let [
      emailValid,
      usernameValid,
      passwordValid,
      confirmPasswordValid,
    ] = Array(4).fill(true);
    if (!email) {
      setEmailEntered(false);
      emailValid2 = false;
    } else {
      setEmailEntered(true);
      try {
        const emailValidData = await axios.post("/api/emailvalid", {
          email: email,
        });
        emailValid2 = emailValidData.data.valid;
      } catch (err) {
        emailValid2 = false;
      }
      if (!emailValid2) {
        emailValid = false;
        setEmailValid(false);
      }
    }
    if (email && emailValid2) {
      setEmailEntered(true);
      setEmailValid(true);
    }
    if (!username) {
      setUsernameEntered(false);
      usernameValid2 = false;
    } else {
      setUsernameEntered(true);
      try {
        const usernameValidData = await axios.post("/api/usernamevalid", {
          username: username,
        });
        usernameValid2 = usernameValidData.data.valid;
      } catch (err) {
        usernameValid2 = false;
      }
      if (!usernameValid2) {
        usernameValid = false;
        setUsernameValid(false);
      }
    }
    if (username && usernameValid) {
      setUsernameValid(true);
      setUsernameEntered(true);
    }

    if (!schema.validate(password)) {
      setPasswordValid(false);
      passwordValid = false;
    } else {
      setPasswordValid(true);
    }
    if (!(password === confirmPassword)) {
      confirmPasswordValid = false;
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordValid(true);
    }

    if (
      emailValid2 &&
      passwordValid &&
      confirmPasswordValid &&
      usernameValid &&
      page === 1
    ) {
      setPage(2);
    }
  };

  async function validate2() {
    let phoneNumberValid2 = true;
    if (!first_name) setFirstNameValid(false);
    else {
      setFirstNameValid(true);
    }
    if (!last_name) setLastNameValid(false);
    else {
      setLastNameValid(true);
    }
    if (!phone_number) {
      phoneNumberValid2 = false;
      setEmailEntered(false);
    } else {
      try {
        const phoneNumberValidData = await axios.post("/api/phonenumbervalid", {
          phone_number: phone_number,
        });
        phoneNumberValid2 = phoneNumberValidData.data.valid;
      } catch (err) {
        phoneNumberValid2 = false;
      }
      if (!phoneNumberValid2) setPhoneNumberValid(false);
    }
    if (phoneNumberValid2 && phone_number) {
      setPhoneNumberValid(true);
      setPhoneNumberEntered(true);
    }
    if (phoneNumberValid2 && first_name && last_name) {
      return true;
    }
    return false;
  }

  function backButtonHandler() {
    if (page === 2) {
      setPage(1);
    }
  }

  function buttonHandler() {
    if (page === 1) {
      validate();
    } else {
      validate2().then((res) => {
        if (res) {
          const user = {
            email,
            password,
            first_name,
            last_name,
            phone_number,
            referral_code,
            username,
            recaptchaResponse,
          };
          axios
            .post("/api/register", user)
            .then((response) => {
              console.log(response);
              setConfirmPassword("");
              setPassword("");
              setEmail("");
              setUsername("");
              setPhoneNumber("");
              setFirstName("");
              setLastName("");
              setRegistrationSuccesful(true);
              setRegistrationError(false);
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            })
            .catch((response) => {
              console.log(response.response);
              setRegistrationError(true);
            });
        }
      });
    }
  }
  let submitButton = page === 1 ? "Next" : "Register";

  const loginDetails = (
    <div>
      <p>Let's get your account set up!</p>
      <div className={styles.form_group_wrapper}>
        <div className={styles.form_element}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={
              "form-input " +
              ((!emailEntered || !emailValid) && "form-input-error")
            }
            id="email"
            value={email}
            onChange={keyUpHandler}
          />
          {!emailEntered && <p>Please enter an email!</p>}
          {!emailValid && <p>Email is already in use</p>}
        </div>
        <div className={styles.form_element}>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={classNames({
              "form-input": true,
              "form-input-error": !usernameValid || !usernameEntered,
            })}
            id="username"
            value={username}
            onChange={keyUpHandler}
          />
          {!usernameEntered && <p>Please enter a username!</p>}
          {!usernameValid && <p>Username is already in use</p>}
        </div>
        <div className={styles.form_element}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={classNames({
              "form-input": true,
              "form-input-error": !passwordValid,
            })}
            id="password"
            value={password}
            onChange={keyUpHandler}
          />
          {!passwordValid && (
            <p>
              Your password is going to have to be tougher than that try a
              password with atleast 8 characters (max 50), 1 special character
              and one number and should not contain anything like 'password'
            </p>
          )}
        </div>
        <div className={styles.form_element}>
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={classNames({
              "form-input": true,
              "form-input-error": !confirmPasswordValid,
            })}
            id="confirmpassword"
            value={confirmPassword}
            onChange={keyUpHandler}
          />
          {!confirmPasswordValid && <p>The two passwords don't match</p>}
        </div>
      </div>
    </div>
  );
  const personalDetails = (
    <div>
      <p>What do we call you?</p>
      <div className={styles.form_group_wrapper}>
        <div className={styles.form_element}>
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={classNames({
              "form-input": true,
              "form-input-error": !first_nameValid,
            })}
            id="firstname"
            value={first_name}
            onChange={keyUpHandler}
            placeholder="Al"
          />
          {!first_nameValid && <p>We need your first name!</p>}
        </div>

        <div className={styles.form_element}>
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={classNames({
              "form-input": true,
              "form-input-error": !last_nameValid,
            })}
            id="lastname"
            value={last_name}
            onChange={keyUpHandler}
            placeholder="Pacino"
          />
          {!last_nameValid && <p>We need your last name!</p>}
        </div>
      </div>
      <p>How do we contact you?</p>
      <div className={styles.form_group_wrapper}>
        <div className={styles.form_element}>
          <label htmlFor="phonenumber" className="form-label">
            Phone number
          </label>
          <input
            type="text"
            className={classNames({
              "form-input": true,
              "form-input-error": !phone_numberEntered || !phone_numberValid,
            })}
            id="phonenumber"
            onChange={keyUpHandler}
            value={phone_number}
            placeholder="+1-541-754-3010"
          />
          {!phone_numberEntered && <p>Please enter an phone number!</p>}
          {!phone_numberValid && <p>Phone number is already in use</p>}
        </div>
      </div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={(e) => {
          setRecaptchaResponse(e);
        }}
      />
      {!recaptchaValid && <p>Please tell us if you're a robot or not</p>}
    </div>
  );

  return (
    <div
      className={styles.register_container}
      style={{
        height: "100%",
        overflow: "scroll",
      }}
    >
      <div className={styles.login_button_container}>
        <p>Already have an account? </p>
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </button>
      </div>
      <div
        style={{
          padding: "60px 0",
          height: "100%",
          maxWidth: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/Logo/ROA_logowhite.png"
          style={{
            height: "100px",
            maxWidth: "100px",
          }}
        />
        {page === 1 && loginDetails}
        {page === 2 && personalDetails}
        {page === 2 && (
          <button
            className="form-button"
            onClick={backButtonHandler}
            style={{ marginBottom: "10px", minHeight: "50px" }}
          >
            Go Back One
          </button>
        )}
        <div style={{ width: "100%", padding: "5px 0" }}>
          <button
            className="form-button"
            onClick={buttonHandler}
            style={{ minHeight: "50px" }}
          >
            {submitButton}
          </button>
        </div>

        {registrationError && (
          <p>Registration error, refresh your page and try again</p>
        )}
        {registrationSuccesful && (
          <div>
            <p style={{ marginBottom: "10px" }}>
              Redirecting to login ... You should receive a welcome email, if
              not please try registering again or visit the{" "}
              <a href="/contact" style={{ color: "#1dd760" }}>
                contact
              </a>{" "}
              page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
