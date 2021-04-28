import React, { useState } from "react";
import styles from "../styles/contact.module.scss";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useSession } from "next-auth/client";

export default function contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [media_link, setMediaLink] = useState("");
  const [session, loading] = useSession();
  const [success, setSuccess] = useState(false);

  function keyUpHandler(event) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    }
    if (event.target.id === "name") {
      setName(event.target.value);
    }
    if (event.target.id === "query") {
      setQuery(event.target.value);
    }
    if (event.target.id === "message") {
      setMessage(event.target.value);
    }
  }

  function validate() {
    let validForm = true;
    if (!email) {
      setEmailError(true);
      validForm = false;
    } else {
      setEmailError(false);
    }
    if (!name) {
      setNameError(true);
      validForm = false;
    } else {
      setNameError(false);
    }
    if (!query) {
      setQueryError(true);
      validForm = false;
    } else {
      setQueryError(false);
    }
    if (!message) {
      setMessageError(true);
      validForm = false;
    } else {
      setMessageError(false);
    }
    if (!recaptchaResponse && !session) {
      setRecaptchaError(true);
      validForm = false;
    } else {
      setRecaptchaError(false);
    }
    console.log(validForm);
    if (validForm) {
      axios
        .post("/api/contact", {
          media_link: media_link,
          name: name,
          recaptchaResponse: recaptchaResponse,
          message: message,
          email: email,
          query: query,
        })
        .then((res) => {
          setSuccess(true);
          setEmail("");
          setMessage("");
          setName("");
          setQuery("");
          setEmailError(false);
          setMessageError(false);
          setNameError(false);
          setQueryError(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className={styles.contact_container}>
      <div className={styles.form}>
        <div className={styles.form_element}>
          <h1>Contact Us</h1>
          <p>Please fill the form below so that we can answer your query.</p>
        </div>

        <div className={styles.form_row}>
          <div className={styles.form_element}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={email}
              id="email"
              className="form-input-contact"
              onChange={keyUpHandler}
            />
            {emailError && <p>Please enter your email.</p>}
          </div>
          <div className={styles.form_element}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              id="name"
              className="form-input-contact"
              onChange={keyUpHandler}
            />
            {nameError && <p>Please enter your name.</p>}
          </div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.form_element}>
            <label htmlFor="email" className="form-label">
              Query Type
            </label>
            <select
              name="query"
              id="query"
              className="form-input-contact"
              onChange={keyUpHandler}
              value={query}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="feedback">Feedback</option>
              <option value="bug">Bug</option>
              <option value="missing slice">Missing Slice</option>
            </select>
            {queryError && <p>Please select a query type.</p>}
          </div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.form_element}>
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              className="form-input-contact"
              rows="4"
              onChange={keyUpHandler}
              value={message}
            />
            {messageError && <p>Please provide us with a message.</p>}
          </div>
        </div>
        {!session && (
          <div className={styles.form_element}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(e) => {
                setRecaptchaResponse(e);
              }}
            />
            {recaptchaError && <p>Please verify if you're a human</p>}
          </div>
        )}
        <div className={styles.form_element}>
          <button className="form-button-contact" onClick={validate}>
            Submit
          </button>
        </div>
        {success && (
          <p style={{ color: "#1dd760", textAlign: "center" }}>Thank you!</p>
        )}
      </div>
    </div>
  );
}
