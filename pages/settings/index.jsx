import React, { useState } from "react";

import styles from "./settings.module.scss";

export default function index() {
    const [email, setEmail] = useState("roa@example.com");
    const [password, setPassword] = useState("password123");

    function keyUpHandler(event) {
        if (event.target.id === "email") {
            setEmail(event.target.value);
        }
        if (event.target.id === "password") {
            setPassword(event.target.value);
        }
    }

    function copy() {
        var copyText = document.getElementById("copyLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var shareButton = document.getElementById("shareButton")
        shareButton.innerHTML = "Copied!";
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.header}>
                <img src="/assets/Logo/ROA_logowhite.png" className={styles.logo} />
                <h1 className={styles.title}>Settings</h1>
                <h3 classname={styles.logout}>Logout</h3>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.field}>
                    <span>Email: <input class={styles.inputField} value={email}></input><button class={styles.button}>Change email</button></span>
                </div>
                
                <div className={styles.field}>
                    <span>Password: <input class={styles.inputField} type="password" value={password}></input><button class={styles.button}>Change password</button></span>
                </div>

                <div className={styles.invite}>
                    <span>Invite Friends: <input class={styles.inputField2} type="text" value="https://roa-beta-tanyibate.vercel.app/login/register" id="copyLink" readonly/>
                    <button onClick={() => copy()} id="shareButton" class={styles.button2}>Copy Link</button></span>
                </div>

                <div className={styles.progress}>
                    <h1>Tier 1</h1>
                    <progress class={styles.progressBar} id="file" value="32" max="100"> 32% </progress>
                    <h2>Invite 2 more friends to unlock another Artist!</h2>
                </div>
            </div>
        </div>

    );
}