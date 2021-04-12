import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/register.module.scss";
import { useSelector } from "react-redux";
import { getSession, useSession } from "next-auth/client";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailEntered, setEmailEntered] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [first_nameValid, setFirstNameValid] = useState(true);
  const [last_nameValid, setLastNameValid] = useState(true);
  const [phone_numberValid, setPhoneNumberValid] = useState(true);
  const [phone_numberEntered, setPhoneNumberEntered] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const referralCodeRedux = useSelector((state) => state.referralCode);

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
      setFirstName(event.target.value);
    }
    if (event.target.id === "lastname") {
      setLastName(event.target.value);
    }
    if (event.target.id === "mobilenumber") {
      setPhoneNumber(event.target.value);
    }
    if (event.target.id === "referralcode") {
      setPhoneNumber(event.target.value);
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
    let emailValid2;
    try {
      const emailValidData = await axios.post("/api/emailvalid", {
        email: email,
      });
      console.log(emailValidData.data.valid);
      emailValid2 = emailValidData.data.valid;
    } catch (err) {
      emailValid2 = false;
    }

    let [emailValid, passwordValid, confirmPasswordValid] = Array(3).fill(true);

    if (!first_name) setFirstNameValid(false);
    if (!last_name) setLastNameValid(false);
    if (!emailValid2) {
      emailValid = false;
      setEmailValid(false);
    }
    if (!schema.validate(password)) {
      setPasswordValid(false);
      passwordValid = false;
    }
    if (!(password === confirmPassword)) {
      confirmPasswordValid = false;
      setConfirmPasswordValid(false);
    }

    if (emailValid && passwordValid && confirmPasswordValid && page === 1) {
      setPage(2);
    }
  };

  async function validate2() {
    let phoneNumberValid2;

    try {
      const phoneNumberValidData = await axios.post("/api/phonenumbervalid", {
        phone_number: phone_number,
      });
      phoneNumberValid2 = phoneNumberValidData.data.valid;
    } catch (err) {
      phoneNumberValid2 = false;
    }
    if (!first_name) setFirstNameValid(false);
    if (!last_name) setLastNameValid(false);
    if (!phoneNumberValid2) setPhoneNumberValid(false);
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
            referral_code: referralCodeRedux,
          };
          axios
            .post("/api/register", user, {
              timeout: 1000,
            })
            .then((response) => {
              console.log(response);
              router.push("/login");
            })
            .catch((response) => {
              console.log(response.response);
            });
        }
      });
    }
  }
  let submitButton = page === 1 ? "Next" : "Register";

  const loginDetails = (
    <div>
      <div className={styles.form_group_container}>
        <p>Let's get your account set up!</p>
        <div className={styles.form_group_wrapper}>
          <div className={styles.form_element}>
            <div className={styles.form_input}>
              <input
                type="text"
                id="email"
                placeholder="Email"
                onKeyUp={keyUpHandler}
              />
            </div>
            {!emailValid && <p>Email is already in use</p>}
          </div>

          <div className={styles.form_element}>
            <div className={styles.form_input}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onKeyUp={keyUpHandler}
              />
            </div>
            {!passwordValid && (
              <p>
                Your password is going to have to be tougher than that try a
                password with atleast 8 characters (max 50), 1 special character
                and one number and should not contain anything like 'password'
              </p>
            )}
          </div>
          <div className={styles.form_element}>
            <div className={styles.form_input}>
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                onKeyUp={keyUpHandler}
              />
            </div>
            {!confirmPasswordValid && <p>The two passwords don't match</p>}
          </div>
        </div>
      </div>
    </div>
  );
  const personalDetails = (
    <div>
      <div className={styles.form_group_container}>
        <p>What do we call you?</p>
        <div className={styles.form_group_wrapper}>
          <div className={styles.form_element}>
            <div className={styles.form_input}>
              <input
                type="text"
                id="firstname"
                placeholder="Alfredo"
                onKeyUp={keyUpHandler}
              />
            </div>
            {!first_nameValid && <p>We need your first name!</p>}
          </div>

          <div className={styles.form_element}>
            <div className={styles.form_input}>
              <input
                type="text"
                id="lastname"
                placeholder="Pacino"
                onKeyUp={keyUpHandler}
              />
              {!last_nameValid && <p>We need your last name!</p>}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.form_group_container}>
        <p>How do we contact you?</p>
        <div className={styles.form_group_wrapper}>
          <div className={styles.form_input}>
            <input
              type="text"
              id="mobilenumber"
              placeholder="Mobile Number"
              onKeyUp={keyUpHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-container">
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
      <img src="/assets/Logo/ROA_logowhite.png" className="login-logo" />
      {page === 1 && loginDetails}
      {page === 2 && personalDetails}
      {page === 2 && (
        <button className="login-button" onClick={backButtonHandler}>
          Go Back One
        </button>
      )}
      <button className="login-button" onClick={buttonHandler}>
        {submitButton}
      </button>
    </div>
  );
}
