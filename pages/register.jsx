import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");

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

  function buttonHandler() {
    if (page === 1) {
      setPage(2);
    } else {
      const user = { email, password, first_name, last_name, phone_number };
      axios
        .post("/api/users", user, {
          timeout: 1000,
        })
        .then((response) => {
          console.log(response);
          router.push("/artists");
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }
  let submitButton = page === 1 ? "Next" : "Register";

  const loginDetails = (
    <div>
      <div className="form-input">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onKeyUp={keyUpHandler}
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="password"
          placeholder="Password"
          onKeyUp={keyUpHandler}
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="confirmpassword"
          placeholder="Confirm Password"
          onKeyUp={keyUpHandler}
        />
      </div>
    </div>
  );
  const personalDetails = (
    <div>
      <div className="form-input">
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          onKeyUp={keyUpHandler}
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          onKeyUp={keyUpHandler}
        />
      </div>
      <div className="form-input">
        <input
          type="text"
          id="mobilenumber"
          placeholder="Mobile Number"
          onKeyUp={keyUpHandler}
        />
        <input
          type="text"
          id="referralcode"
          placeholder="Referral Code"
          onKeyUp={keyUpHandler}
          readonly
        />
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <img src="/assets/Logo/ROA_logowhite.png" className="login-logo" />
      {page === 1 && loginDetails}
      {page === 2 && personalDetails}

      <button className="login-button" onClick={buttonHandler}>
        {submitButton}
      </button>
    </div>
  );
}
